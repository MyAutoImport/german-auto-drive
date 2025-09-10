// /api/contact.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// A quién llega el lead y desde qué “from” lo envías
const TO = process.env.CONTACT_TO_EMAIL; // ej: "tucorreo@dominio.com"
const FROM = process.env.CONTACT_FROM_EMAIL || 'Autoimport <onboarding@resend.dev>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, carType, budget, message } = req.body || {};

    // Validación mínima de los campos obligatorios
    if (!name || !email || !phone || !carType || !budget) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const subject = `Nueva consulta de ${name} (${carType}, ${budget})`;

    const html = `
      <h2>Nuevo lead de la web</h2>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
        <li><strong>Tipo de vehículo:</strong> ${carType}</li>
        <li><strong>Presupuesto:</strong> ${budget}</li>
      </ul>
      ${message ? `<p><strong>Mensaje:</strong><br>${escapeHtml(message)}</p>` : ''}
      <hr/>
      <p>Responder a: ${email}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email,
      subject,
      html,
    });

    if (error) {
      // Resend devolvió error (por credenciales, dominios, etc.)
      return res.status(502).json({ error: error.message || 'Error enviando email' });
    }

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (err) {
    console.error('CONTACT_API_ERROR', err);
    return res.status(500).json({ error: err?.message || 'Error interno' });
  }
}

// Pequeña utilidad para evitar HTML injection en el mensaje
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
