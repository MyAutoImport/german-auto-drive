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
    // Vercel (Node) ya parsea JSON si el header es application/json
    const { name, email, phone, carType, budget, message } =
      typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');

    // 1) Insertar en Supabase -> tabla 'leads'
    const { error: dbError } = await supabase.from('leads').insert([
      {
        name: name?.trim() || '',
        email: email?.trim() || '',
        phone: phone?.trim() || '',
        message: message?.trim() || '',
        // guardo tipo + presupuesto en 'source' como acordamos
        source: `${carType || ''}${budget ? ` (${budget})` : ''}`.trim(),
      },
    ]);

    if (dbError) {
      // log útil en respuesta si falla
      console.error('Supabase insert error:', dbError);
      return res.status(500).json({ ok: false, error: 'DB_INSERT_FAILED' });
    }

    // 2) Enviar email con Resend (lo que ya tenías)
    await resend.emails.send({
      from: process.env.CONTACT_FROM,   // p.ej: 'AutoImport <info@myautoimport.es>'
      to: process.env.CONTACT_TO,       // p.ej: 'info.myautoimport@gmail.com'
      subject: `Nueva consulta - ${carType || 'sin tipo'} ${budget ? `(${budget})` : ''}`,
      html: `
        <h3>Nueva consulta desde la web</h3>
        <ul>
          <li><b>Nombre:</b> ${escapeHtml(name)}</li>
          <li><b>Email:</b> ${escapeHtml(email)}</li>
          <li><b>Teléfono:</b> ${escapeHtml(phone)}</li>
          <li><b>Tipo de vehículo:</b> ${escapeHtml(carType || '')}</li>
          <li><b>Presupuesto:</b> ${escapeHtml(budget || '')}</li>
        </ul>
        <p><b>Mensaje:</b></p>
        <p>${escapeHtml(message || '')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
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
