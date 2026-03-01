export async function sendDiscordWebhook(embed) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        ...embed,
        timestamp: new Date().toISOString(),
        footer: { text: "Grind Team Portal System" }
      }]
    })
  });
}
