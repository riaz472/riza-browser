
import { NextRequest, NextResponse } from 'next/server';

/**
 * Riza Proxy Engine v6.0 - Advanced Asset Interceptor
 * Features: Deep attribute rewriting, Header stripping, and Asset resolution.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream Error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const origin = new URL(targetUrl).origin;

    // Handle HTML rewriting
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 1. Inject Survival Script
      const survivalScript = `
        <script>
          (function() {
            // Prevent frame-breaking
            window.onbeforeunload = null;
            window.alert = console.log;
            
            // Intercept all clicks for navigation
            document.addEventListener('click', (e) => {
              const link = e.target.closest('a');
              if (link && link.href && !link.href.startsWith('javascript:')) {
                e.preventDefault();
                window.parent.postMessage({ type: 'NAVIGATE', url: link.href }, '*');
              }
            }, true);

            // Intercept forms
            document.addEventListener('submit', (e) => {
              const form = e.target;
              if (form.action) {
                e.preventDefault();
                const url = new URL(form.action);
                const params = new URLSearchParams(new FormData(form) as any);
                const finalUrl = url.origin + url.pathname + '?' + params.toString();
                window.parent.postMessage({ type: 'NAVIGATE', url: finalUrl }, '*');
              }
            }, true);
          })();
        </script>
      `;
      html = html.replace('<head>', `<head>${survivalScript}<base href="${origin}/">`);

      const headers = new Headers();
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      
      return new NextResponse(html, { status: 200, headers });
    }

    // Pass-through for assets
    const body = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=3600');
    
    return new NextResponse(body, { status: 200, headers });

  } catch (error: any) {
    return new NextResponse(`Relay Error: ${error.message}`, { status: 500 });
  }
}
