// api/lead-create.mjs
import { supabaseAdmin } from './_supabase.mjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    fullName = '',
    email,
    phone = '',
    vehicleType = '',
    budgetRange = '',
    message = '',
  } = req.body || {};

  if (!email) return res.status(400).json({ error: 'Email requerido' });

  // 1) Guardar en BD
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert([{
      full_name: fullName,
      email,
      phone,
      vehicle_type: vehicleType,
      budget_range: budgetRange,
      message
    }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // 2) Email con Resend (no rompe si falla)
  try {
    await resend.emails.send({
      from: 'Leads <no-reply@resend.dev>',     // luego puedes usar tu dominio verificado en Resend
      to: process.env.LEADS_TO_EMAIL,
      subject: `Nuevo lead: ${fullName || email}`,
      html: `
        <h2>Nuevo lead desde la web</h2>
        <p><b>Nombre:</b> ${fullName || '-'}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${phone || '-'}</p>
        <p><b>Tipo de vehículo:</b> ${vehicleType || '-'}</p>
        <p><b>Presupuesto:</b> ${budgetRange || '-'}</p>
        <p><b>Mensaje:</b><br>${(message || '').replace(/\n/g,'<br>')}</p>
        <hr>
        <p>ID Lead: ${data.id} · ${data.created_at}</p>
      `,
    });
  } catch (e) {
    console.error('Email error:', e);
  }

  return res.json({ ok: true });
}
