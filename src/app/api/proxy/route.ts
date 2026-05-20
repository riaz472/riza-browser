import { NextRequest, NextResponse } from 'next/server';

/**
 * Riza Proxy Engine v4.0 - Production Mirroring
 * Features: Absolute URL rewriting, Script injection for link interception,
 * User-Agent spoofing, and automatic search engine fallback.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const url = new URL(targetUrl);
    
    // 1. Production-grade Desktop Chrome User-Agent Spoofing
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 0 } // Bypass cache for live content
    });

    // 2. Strict Dynamic Fallback for blocked/failing nodes
    if (!response.ok && response.status !== 404) {
      const fallbackUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(targetUrl)}`;
      return NextResponse.redirect(`${new URL(request.url).origin}/api/proxy?url=${encodeURIComponent(fallbackUrl)}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const finalUrl = new URL(response.url); // Handle redirects
    
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 3. Response Mirroring & Script Injection Module
      // Injects absolute base tag and a communication bridge for the parent browser
      const injection = `
        <base href="${finalUrl.origin}${finalUrl.pathname}">
        <script>
          // Global error survival layer
          window.onerror = function() { return true; };
          
          // Link Interception Bridge
          document.addEventListener('click', function(e) {
            let target = e.target.closest('a');
            if(target && target.href) {
              const href = target.getAttribute('href');
              if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                e.preventDefault();
                try {
                  const absoluteUrl = new URL(href, window.location.href).href;
                  window.parent.postMessage({ type: 'NAVIGATE', url: absoluteUrl }, '*');
                } catch(err) {}
              }
            }
          }, true);

          // Form Submission Interception (Search engines support)
          document.addEventListener('submit', function(e) {
            const form = e.target;
            if (form.method.toLowerCase() === 'get') {
              e.preventDefault();
              const formData = new FormData(form);
              const params = new URLSearchParams();
              for (const [key, value] of formData.entries()) {
                params.append(key, value.toString());
              }
              const action = form.getAttribute('action') || '';
              try {
                const absoluteUrl = new URL(action, window.location.href).href;
                const finalUrl = absoluteUrl + (absoluteUrl.includes('?') ? '&' : '?') + params.toString();
                window.parent.postMessage({ type: 'NAVIGATE', url: finalUrl }, '*');
              } catch(err) {}
            }
          }, true);
        </script>
      `;
      
      // Inject at the beginning of head
      html = html.replace('<head>', `<head>${injection}`);

      // 4. Absolute URL Rewriting Module
      const proxyBase = `${new URL(request.url).origin}/api/proxy?url=`;
      const rewriteAttribute = (content: string, attr: string) => {
        const regex = new RegExp(`${attr}=(['"])((?!#|data:|javascript:|mailto:|tel:)[^'"]+)\\1`, 'gi');
        return content.replace(regex, (match, quote, p1) => {
          try {
            const absoluteUrl = new URL(p1, finalUrl.href).href;
            return `${attr}=${quote}${proxyBase}${encodeURIComponent(absoluteUrl)}${quote}`;
          } catch (e) {
            return match;
          }
        });
      };

      html = rewriteAttribute(html, 'href');
      html = rewriteAttribute(html, 'src');
      html = rewriteAttribute(html, 'action');

      // 5. Explicit Header Stripping & Content Spoofing
      const headers = new Headers();
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('X-Frame-Options', 'ALLOWALL');
      headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; frame-ancestors *;");

      return new NextResponse(html, {
        status: 200,
        headers,
      });
    }

    // Pass-through for assets (Images, CSS, JS)
    const body = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=3600');
    
    return new NextResponse(body, {
      status: 200,
      headers,
    });

  } catch (error: any) {
    // Ultimate fallback to functional search engine mirror
    const fallbackUrl = `https://duckduckgo.com/html/`;
    return NextResponse.redirect(`${new URL(request.url).origin}/api/proxy?url=${encodeURIComponent(fallbackUrl)}`);
  }
}
