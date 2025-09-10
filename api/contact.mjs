// api/contact.mjs
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Usa SIEMPRE la service-role key porque la función corre en servidor
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    // Vercel Node functions reciben el body como string si viene JSON
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { name, email, phone, carType, budget, message } = body || {};

    // 1) Guardar lead en Supabase
    const { error: dbError } = await supabase.from('leads').insert([{
      name,
      email,
      phone,
      car_type: carType,   // ojo con el snake_case si tu tabla está así
      budget,
      message
    }]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // seguimos enviando el mail, pero marcamos el fallo por si quieres verlo en logs
    }

    // 2) Enviar correo con Resend
    await resend.emails.send({
      from: process.env.CONTACT_FROM,  // p.ej: "AutoImport <info@myautoimport.es>"
      to: process.env.CONTACT_TO,      // p.ej: "info.myautoimport@gmail.com"
      subject: `Nueva consulta - ${carType || 'sin tipo'} (${budget || 'sin presupuesto'})`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <ul>
          <li><strong>Nombre:</strong> ${name || '-'}</li>
          <li><strong>Email:</strong> ${email || '-'}</li>
          <li><strong>Teléfono:</strong> ${phone || '-'}</li>
          <li><strong>Tipo de vehículo:</strong> ${carType || '-'}</li>
          <li><strong>Presupuesto:</strong> ${budget || '-'}</li>
        </ul>
        <p><strong>Mensaje:</strong></p>
        <p>${message || '-'}</p>
      `
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ ok: false, error: 'Internal error' });
  }
}
