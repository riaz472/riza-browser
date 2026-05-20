import { NextRequest, NextResponse } from 'next/server';

/**
 * RizaBrowser Proxy Engine v2.1
 * Fetches target content, strips security headers, and rewrites URLs
 * to ensure internal navigation and forms remain within the proxy.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const url = new URL(targetUrl);
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Target returned status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 1. Inject <base> tag for static assets
      const baseTag = `<base href="${url.origin}/">`;
      html = html.replace('<head>', `<head>${baseTag}`);

      // 2. Rewrite internal links to route through this proxy
      const proxyBase = `${new URL(request.url).origin}/api/proxy?url=`;
      
      const rewriteAttribute = (content: string, attr: string) => {
        const regex = new RegExp(`${attr}="((?!#|data:|javascript:|mailto:|tel:)[^"]+)"`, 'gi');
        return content.replace(regex, (match, p1) => {
          try {
            const absoluteUrl = new URL(p1, url.href).href;
            return `${attr}="${proxyBase}${encodeURIComponent(absoluteUrl)}"`;
          } catch (e) {
            return match;
          }
        });
      };

      // Rewriting key attributes for seamless internal navigation
      html = rewriteAttribute(html, 'href');
      html = rewriteAttribute(html, 'action'); // Crucial for search forms

      // 3. Remove security headers and return
      const headers = new Headers();
      headers.set('Content-Type', 'text/html');
      headers.set('X-Frame-Options', 'ALLOWALL');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'; frame-ancestors *;");

      return new NextResponse(html, {
        status: 200,
        headers,
      });
    }

    // Pass-through for non-HTML resources
    const body = await response.arrayBuffer();
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error: any) {
    return new NextResponse(`Proxy Relay Error: ${error.message}`, { status: 500 });
  }
}