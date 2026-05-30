import { createServerFn } from "@tanstack/react-start";

export const trackWhatsappClick = createServerFn({ method: "POST" })
  .inputValidator((data: { source: string; offer?: string; path?: string; referrer?: string }) => data)
  .handler(async ({ data }) => {
    const ts = new Date().toISOString();
    // Structured log line — searchable via server-function-logs (filter: "whatsapp_click")
    console.log(
      "whatsapp_click",
      JSON.stringify({
        ts,
        source: data.source,
        offer: data.offer ?? null,
        path: data.path ?? null,
        referrer: data.referrer ?? null,
      })
    );
    return { ok: true };
  });
