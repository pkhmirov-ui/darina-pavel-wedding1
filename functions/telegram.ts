export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;

    const data = await request.json();

    const text = `
💍 Новое подтверждение

👤 Имя: ${data.name}

❤️ Ответ: ${data.attendance}

👥 Количество гостей: ${data.guests}

🍽️ Пожелания:
${data.message || "Нет"}
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text,
        }),
      }
    );

    if (!telegramResponse.ok) {
      return new Response("Telegram error", { status: 500 });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
