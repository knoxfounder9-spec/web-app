import dbConnect from '@/lib/db';
import Application from '@/lib/models/Application';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    const newApp = await Application.create({
      formId: data.formId,
      formTitle: data.formTitle,
      userName: data.userName,
      discordId: data.discordId,
      answers: data.answers, // Array of { question: string, answer: string }
      status: 'pending'
    });

    // Discord Webhook Notification
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "📩 New Application Received",
          color: 3447003,
          fields: [
            { name: "User", value: data.userName, inline: true },
            { name: "Discord ID", value: data.discordId, inline: true },
            { name: "Form", value: data.formTitle }
          ],
          timestamp: new Date()
        }]
      })
    });

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
