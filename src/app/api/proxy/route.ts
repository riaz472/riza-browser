
import { NextRequest, NextResponse } from 'next/server';

/**
 * Riza Proxy Engine v5.0 - Shadow DOM Simulation Support
 * Features: Deep attribute rewriting, Script defusal, and security header stripping.
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
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const finalUrl = new URL(response.url);
    
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 2. Defusal Module: Strip frame-breaking and ancestry-checking scripts
      html = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, (match) => {
        if (match.toLowerCase().includes('top.location') || 
            match.toLowerCase().includes('window.frameElement') ||
            match.toLowerCase().includes('parent.location')) {
          return '<!-- Riza Defused Security Script -->';
        }
        return match;
      });

      // 3. Asset Rewriting Module: Convert all relative paths to absolute via proxy
      const proxyBase = `${new URL(request.url).origin}/api/proxy?url=`;
      
      const rewriteAttribute = (content: string, attr: string) => {
        const regex = new RegExp(`${attr}=(['"])((?!#|data:|javascript:|mailto:|tel:)[^'"]+)\\1`, 'gi');
        return content.replace(regex, (match, quote, p1) => {
          try {
            const absoluteUrl = new URL(p1, finalUrl.href).href;
            // Only proxy HTML/JS/CSS assets, direct images can sometimes be loaded directly
            return `${attr}=${quote}${proxyBase}${encodeURIComponent(absoluteUrl)}${quote}`;
          } catch (e) {
            return match;
          }
        });
      };

      html = rewriteAttribute(html, 'href');
      html = rewriteAttribute(html, 'src');
      html = rewriteAttribute(html, 'action');

      // 4. Inject Base Tag to catch remaining relative paths
      html = html.replace('<head>', `<head><base href="${finalUrl.origin}${finalUrl.pathname}">`);

      // 5. Explicit Header Stripping
      const headers = new Headers();
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');

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
    return new NextResponse(`Riza Proxy Error: ${error.message}`, { status: 500 });
  }
}
