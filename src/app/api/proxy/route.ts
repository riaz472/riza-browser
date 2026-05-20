
import { NextRequest, NextResponse } from 'next/server';

/**
 * RizaBrowser Proxy Engine
 * Fetches target content and strips security headers to allow iframe rendering.
 * Injects a <base> tag to fix relative asset paths.
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
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    
    // Only process HTML content for injection
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // Inject <base> tag to ensure relative links (css, js, images) resolve to the original domain
      const baseTag = `<base href="${new URL(targetUrl).origin}/">`;
      html = html.replace('<head>', `<head>${baseTag}`);
      
      const headers = new Headers();
      headers.set('Content-Type', 'text/html');
      // Explicitly allow iframing
      headers.set('X-Frame-Options', 'ALLOWALL');
      headers.set('Access-Control-Allow-Origin', '*');

      return new NextResponse(html, {
        status: 200,
        headers,
      });
    }

    // For other assets (though the iframe mostly handles links itself), return raw
    const body = await response.arrayBuffer();
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error: any) {
    return new NextResponse(`Proxy Error: ${error.message}`, { status: 500 });
  }
}
