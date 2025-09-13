// /api/contact.mjs
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Aseguramos body como objeto
    const raw = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');

    // Compatibilidad con claves antiguas y nuevas
    const name    = (raw.name ?? raw.full_name ?? '').trim();
    const email   = (raw.email ?? '').trim();
    const phone   = (raw.phone ?? raw.phone_number ?? '').trim();
    const carType = (raw.carType ?? raw.car_type ?? '').trim();
    const budget  = (raw.budget ?? raw.budget_range ?? '').trim();
    const message = (raw.message ?? '').trim();

    // 1) Insertar en Supabase -> tabla 'leads'
    const { error: dbError } = await supabase.from('leads').insert([
      {
        name,
        email,
        phone,
        message,
        // guardo tipo + presupuesto en 'source'
        source: `${carType}${budget ? ` (${budget})` : ''}`.trim(),
      },
    ]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return res.status(500).json({ ok: false, error: 'DB_INSERT_FAILED' });
    }

    // 2) Enviar email con Resend
    // - to admite array; permite múltiples correos en CONTACT_TO separados por comas
    const toList = String(process.env.CONTACT_TO || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!process.env.CONTACT_FROM) {
      console.error('CONTACT_FROM no está definido');
    }
    if (toList.length === 0) {
      console.error('CONTACT_TO no está definido o está vacío');
    }

    let emailResult = null;
    try {
      emailResult = await resend.emails.send({
        from: process.env.CONTACT_FROM,       // remitente verificado en Resend
        to: toList,
        subject: `Nueva consulta - ${carType || 'sin tipo'}${budget ? ` (${budget})` : ''}`,
        reply_to: email || undefined,         // para poder responder al usuario
        html: `
          <h3>Nueva consulta desde la web</h3>
          <ul>
            <li><b>Nombre:</b> ${escapeHtml(name)}</li>
            <li><b>Email:</b> ${escapeHtml(email)}</li>
            <li><b>Teléfono:</b> ${escapeHtml(phone)}</li>
            <li><b>Tipo de vehículo:</b> ${escapeHtml(carType)}</li>
            <li><b>Presupuesto:</b> ${escapeHtml(budget)}</li>
          </ul>
          <p><b>Mensaje:</b></p>
          <p>${escapeHtml(message)}</p>
        `,
        text:
          `Nueva consulta desde la web\n` +
          `Nombre: ${name}\n` +
          `Email: ${email}\n` +
          `Teléfono: ${phone}\n` +
          `Tipo de vehículo: ${carType}\n` +
          `Presupuesto: ${budget}\n\n` +
          `Mensaje:\n${message}\n`,
      });
    } catch (mailErr) {
      console.error('Resend send error:', mailErr);
    }

    const emailSent = Boolean(emailResult?.id);
    return res.status(200).json({ ok: true, emailSent, resendId: emailResult?.id || null });
  } catch (err) {
    console.error('SERVER_ERROR:', err);
    return res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
}

// pequeña ayuda para no romper el html del correo
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
