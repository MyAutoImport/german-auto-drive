// api/contact.mjs
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, carType, budget, message } = req.body || {};

    // Validación acorde a tu formulario
    if (!name || !email || !phone || !carType || !budget) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // IMPORTANTE:
    // Si no has verificado dominio en Resend, usa onboarding@resend.dev como "from"
    const from = process.env.CONTACT_FROM || 'AutoImport <onboarding@resend.dev>';
    const to = process.env.CONTACT_TO; // tu correo destino (obligatorio)

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Falta RESEND_API_KEY' });
    }
    if (!to) {
      return res.status(500).json({ error: 'Falta CONTACT_TO' });
    }

    const subject = `Nueva consulta - ${carType} (${budget})`;
    const html = `
      <h2>Nueva consulta desde la web</h2>
      <ul>
        <li><b>Nombre:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Teléfono:</b> ${phone}</li>
        <li><b>Tipo de vehículo:</b> ${carType}</li>
        <li><b>Presupuesto:</b> ${budget}</li>
      </ul>
      <p><b>Mensaje:</b></p>
      <p>${(message || '').replace(/\n/g, '<br/>')}</p>
    `;

    const { error } = await resend.emails.send({
      from,            // si no hay dominio verificado => onboarding@resend.dev
      to,
      reply_to: email, // para que puedas responder al lead
      subject,
      html
    });

    if (error) {
      // Devolver el motivo de Resend, no “A server error…”
      return res.status(500).json({ error: error.message || 'Error enviando email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
