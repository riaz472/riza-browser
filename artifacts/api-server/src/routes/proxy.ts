import { Router } from "express";

const router = Router();

/**
 * Riza Proxy Engine v6.0 - Advanced Asset Interceptor
 * Converted from Next.js API route to Express
 */
router.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    res.status(400).send("Missing URL parameter");
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream Error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    const origin = new URL(targetUrl).origin;

    if (contentType.includes("text/html")) {
      let html = await response.text();

      const survivalScript = `
        <script>
          (function() {
            window.onbeforeunload = null;
            window.alert = console.log;
            document.addEventListener('click', (e) => {
              const link = e.target.closest('a');
              if (link && link.href && !link.href.startsWith('javascript:')) {
                e.preventDefault();
                window.parent.postMessage({ type: 'NAVIGATE', url: link.href }, '*');
              }
            }, true);
            document.addEventListener('submit', (e) => {
              const form = e.target;
              if (form.action) {
                e.preventDefault();
                const url = new URL(form.action);
                const params = new URLSearchParams(new FormData(form));
                const finalUrl = url.origin + url.pathname + '?' + params.toString();
                window.parent.postMessage({ type: 'NAVIGATE', url: finalUrl }, '*');
              }
            }, true);
          })();
        </script>
      `;
      html = html.replace("<head>", `<head>${survivalScript}<base href="${origin}/">`);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(html);
      return;
    }

    const body = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(Buffer.from(body));
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    res.status(500).send(`Relay Error: ${msg}`);
  }
});

export default router;
