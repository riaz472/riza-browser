import { NextRequest, NextResponse } from 'next/server';

/**
 * RizaBrowser Proxy Engine v3.0
 * Deep-content inspection and rewriting engine to bypass CORS and frame policies.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const url = new URL(targetUrl);
    
    // Set a clean modern desktop User-Agent to get standard desktop views
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Target returned status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 1. Inject <base> tag to help resolve remaining relative assets
      const baseTag = `<base href="${url.origin}${url.pathname}">`;
      html = html.replace('<head>', `<head>${baseTag}`);

      // 2. Comprehensive URL Rewriting Module
      const proxyBase = `${new URL(request.url).origin}/api/proxy?url=`;
      
      const rewriteAttribute = (content: string, attr: string) => {
        // Regex matches attr="url" or attr='url'
        const regex = new RegExp(`${attr}=(['"])((?!#|data:|javascript:|mailto:|tel:)[^'"]+)\\1`, 'gi');
        return content.replace(regex, (match, quote, p1) => {
          try {
            // Convert relative/absolute paths to absolute URLs relative to target
            const absoluteUrl = new URL(p1, url.href).href;
            // Wrap in our proxy
            return `${attr}=${quote}${proxyBase}${encodeURIComponent(absoluteUrl)}${quote}`;
          } catch (e) {
            return match;
          }
        });
      };

      // Rewriting key attributes for deep asset and link redirection
      html = rewriteAttribute(html, 'href');
      html = rewriteAttribute(html, 'src');
      html = rewriteAttribute(html, 'action'); // Crucial for forms

      // 3. Construct clean response headers
      // We explicitly DO NOT copy upstream security headers (CSP, X-Frame, etc)
      const headers = new Headers();
      headers.set('Content-Type', 'text/html');
      headers.set('X-Frame-Options', 'ALLOWALL');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; frame-ancestors *;");

      return new NextResponse(html, {
        status: 200,
        headers,
      });
    }

    // 4. Pass-through for non-HTML resources (Images, JS, CSS)
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
    return new NextResponse(`Proxy Relay Error: ${error.message}`, { status: 500 });
  }
}
