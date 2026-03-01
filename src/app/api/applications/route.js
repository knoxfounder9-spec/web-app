import dbConnect from '@/lib/db';
import Application from '@/lib/models/Application';
import { sendDiscordWebhook } from '@/lib/webhook';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    const application = await Application.create({
      formId: data.formId,
      formTitle: data.formTitle,
      userName: data.userName,
      discordId: data.discordId,
      answers: data.answers,
      status: 'pending'
    });

    // Notify Admin via Webhook
    await sendDiscordWebhook({
      title: "New Application Received!",
      color: 0x3498db,
      fields: [
        { name: "User", value: data.userName, inline: true },
        { name: "Discord ID", value: data.discordId, inline: true },
        { name: "Form", value: data.formTitle }
      ]
    });

    return NextResponse.json({ success: true, id: application._id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
