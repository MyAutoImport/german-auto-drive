// api/leads.mjs
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || // server (si está)
  process.env.SUPABASE_ANON_KEY ||          // server fallback
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // último recurso

function err(res, code, msg, extra) {
  console.error('leads-api', msg, extra ?? '');
  return res.status(code).json({ ok: false, error: msg });
}

// Simple validation
function validateLead(data) {
  if (!data.name || data.name.trim().length === 0) return 'name is required';
  if (!data.email || !data.email.includes('@')) return 'valid email is required';
  if (!data.source || data.source.trim().length === 0) return 'source is required';
  return null;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return err(res, 405, 'Method not allowed');
  }

  try {
    if (!SUPABASE_URL || !SB_KEY) {
      return err(res, 500, 'Missing Supabase env (URL/KEY)');
    }

    const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    
    // compat ES/EN
    const normalized = {
      name: body.name ?? body.nombre ?? '',
      email: body.email ?? '',
      phone: body.phone ?? body.telefono ?? '',
      message: body.message ?? body.mensaje ?? '',
      source: body.source ?? body.origen ?? 'web',
    };

    const validationError = validateLead(normalized);
    if (validationError) {
      return err(res, 400, validationError);
    }

    const data = {
      name: normalized.name.trim(),
      email: normalized.email.trim(),
      phone: normalized.phone.trim(),
      message: normalized.message.trim(),
      source: normalized.source.trim()
    };

    console.log('Processing lead:', { ...data, email: '***' });

    const supabase = createClient(SUPABASE_URL, SB_KEY);
    const { error: dbErr } = await supabase.from('leads').insert({
      name: data.name, 
      email: data.email, 
      phone: data.phone,
      message: data.message, 
      source: data.source,
    });
    
    if (dbErr) {
      return err(res, 500, 'Supabase insert failed', dbErr);
    }

    console.log('Lead saved to database successfully');

    // email no debe romper la API
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('leads-api', 'RESEND_API_KEY missing (email skipped)');
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'MyAutoImport <noreply@myautoimport.es>',
          to: ['info.myautoimport@gmail.com'],
          subject: `Nuevo lead (${data.source})`,
          text:
`Nombre: ${data.name}
Email: ${data.email}
Tel: ${data.phone}
Origen: ${data.source}

Mensaje:
${data.message}`.trim(),
        });
        console.log('Email sent successfully');
      }
    } catch (mailErr) {
      console.error('leads-api mail', mailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return err(res, 400, e?.message || 'Bad request', e);
  }
}