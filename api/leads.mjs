// api/leads.mjs
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  // Use SERVICE_ROLE key for server-side operations
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation function
function validateLead(data) {
  const errors = [];
  if (!data.name || data.name.trim().length === 0) errors.push('name is required');
  if (!data.email || !data.email.includes('@')) errors.push('valid email is required');
  if (!data.source || data.source.trim().length === 0) errors.push('source is required');
  return errors;
}

// Utility: error response with logging
function fail(res, code, error) {
  console.error('lead-error', error);
  return res.status(code).json({ 
    ok: false, 
    error: typeof error === 'string' ? error : (error?.message || 'Unknown error')
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');

    // Normalize field names (support both Spanish and English)
    const normalized = {
      name: body.name || body.nombre || body.fullName || '',
      email: body.email || '',
      phone: body.phone || body.telefono || body.tel || '',
      message: body.message || body.mensaje || '',
      source: body.source || body.origen || body.vehicleType || 'web',
    };

    // Validate required fields
    const validationErrors = validateLead(normalized);
    if (validationErrors.length > 0) {
      return fail(res, 400, `Validation failed: ${validationErrors.join(', ')}`);
    }

    const data = {
      name: normalized.name.trim(),
      email: normalized.email.trim(),
      phone: normalized.phone.trim(),
      message: normalized.message.trim(),
      source: normalized.source.trim()
    };

    console.log('Processing lead:', { ...data, email: '***' });

    // 1) Insert into Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return fail(res, 500, `Database error: ${dbError.message}`);
    }

    console.log('Lead saved to database successfully');

    // 2) Send email with Resend (don't fail if email fails)
    try {
      await resend.emails.send({
        from: 'MyAutoImport <noreply@myautoimport.es>',
        to: ['info.myautoimport@gmail.com'],
        subject: `Nuevo lead (${data.source})`,
        text: `Nombre: ${data.name}
Email: ${data.email}
Tel: ${data.phone}
Origen: ${data.source}

Mensaje:
${data.message}`.trim(),
      });
      console.log('Email sent successfully');
    } catch (mailError) {
      console.error('Email send error (non-fatal):', mailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Unexpected error in leads handler:', error);
    return fail(res, 500, 'Internal server error');
  }
}