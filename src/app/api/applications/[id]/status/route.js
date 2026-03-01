import dbConnect from '@/lib/db';
import Application from '@/lib/models/Application';
import { sendDiscordWebhook } from '@/lib/webhook';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { status } = await req.json();

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // Discord Notification Logic
    const colors = {
      accepted: 0x2ecc71,
      rejected: 0xe74c3c,
      review: 0xf1c40f
    };

    await sendDiscordWebhook({
      title: "Application Status Updated",
      color: colors[status] || 0x3498db,
      fields: [
        { name: "Applicant", value: updatedApp.userName, inline: true },
        { name: "Discord ID", value: updatedApp.discordId, inline: true },
        { name: "New Status", value: status.toUpperCase() },
        { name: "Portal Link", value: `${process.env.NEXT_PUBLIC_BASE_URL}/status` }
      ]
    });

    return NextResponse.json({ success: true, updatedApp });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET status for specific Discord ID
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // This is the Discord ID
    const apps = await Application.find({ discordId: id }).sort({ createdAt: -1 });
    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
