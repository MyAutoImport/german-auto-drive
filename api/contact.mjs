// api/contact.mjs
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Supabase opcional (guarda los leads)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Esta ruta acepta POST con JSON del formulario
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' });

  try {
    const {
      full_name = '',
      email = '',
      phone = '',
      vehicle_type = '',
      budget = '',
      message = ''
    } = req.body || {};

    // 1) Guardar en Supabase (tabla leads)
    try {
      await supabase.from('leads').insert([
        { full_name, email, phone, vehicle_type, budget, message }
      ]);
    } catch (e) {
      // no rompemos el flujo si falla guardar, pero lo anotamos
      console.error('Supabase insert error:', e?.message || e);
    }

    // 2) Enviar email con Resend
    const toEmail = process.env.TO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    const html = `
      <h2>Nuevo lead</h2>
      <p><b>Nombre:</b> ${escapeHtml(full_name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Teléfono:</b> ${escapeHtml(phone)}</p>
      <p><b>Tipo de vehículo:</b> ${escapeHtml(vehicle_type)}</p>
      <p><b>Presupuesto:</b> ${escapeHtml(budget)}</p>
      <p><b>Mensaje:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'Nuevo lead de la web',
      html
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err?.message || 'Server error' });
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
