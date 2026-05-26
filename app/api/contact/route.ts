import nodemailer from 'nodemailer'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, contact, message } = await req.json()

  if (!name?.trim() || !contact?.trim() || !message?.trim()) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim())

  await transporter.sendMail({
    from: `"PR Gazette" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
    ...(isEmail ? { replyTo: contact.trim() } : {}),
    subject: `Letter to the Editor — from ${name}`,
    text: `From: ${name}\nContact: ${contact}\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${name}<br>
      <strong>Contact:</strong> ${contact}</p>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  })

  return Response.json({ ok: true })
}
