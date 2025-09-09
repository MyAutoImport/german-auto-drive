// api/lead-create.mjs
import { supabaseAdmin } from './_supabase.mjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name = '', email, phone = '', message = '', source = 'web' } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  // 1) Guardar lead en la BD
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert([{ name, email, phone, message, source }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // 2) Enviar email de aviso (Resend)
  try {
    await resend.emails.send({
      from: 'Leads <no-reply@resend.dev>', // luego puedes configurar tu dominio
      to: process.env.LEADS_TO_EMAIL,
      subject: `Nuevo lead de ${name || email}`,
      html: `
        <h2>Nuevo lead</h2>
        <p><b>Nombre:</b> ${name || '-'}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${phone || '-'}</p>
        <p><b>Mensaje:</b><br>${(message || '').replace(/\n/g,'<br>')}</p>
        <p><b>Fuente:</b> ${source}</p>
        <hr>
        <p>ID: ${data.id} · ${data.created_at}</p>
      `,
    });
  } catch (e) {
    // Si el correo falla, igualmente devuelve 200 para no perder el lead
    console.error('Email error:', e);
  }

  return res.json({ ok: true, lead: data });
}
