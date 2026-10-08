import { NextRequest, NextResponse } from 'next/server';
import { FirebaseNotConfiguredError, markLeadUnsubscribed } from '@/lib/firebase/firestore';

export const runtime = 'nodejs';

// Firestore auto-generated IDs are base62; custom IDs in this project are
// expected to follow the same shape. Reject anything else (e.g. slashes,
// which Firestore would otherwise interpret as a sub-path) before it ever
// reaches the database.
const LEAD_ID_PATTERN = /^[A-Za-z0-9_-]{1,200}$/;

function renderPage({
  title,
  message,
  tone = 'neutral',
}: {
  title: string;
  message: string;
  tone?: 'success' | 'error' | 'neutral';
}) {
  const accent =
    tone === 'success' ? '#34d399' : tone === 'error' ? '#f87171' : '#818cf8';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title} - Workflow Labs</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #05070d;
    color: #e2e8f0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .card {
    max-width: 440px;
    width: 100%;
    text-align: center;
    padding: 40px 32px;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03);
  }
  .dot {
    width: 44px;
    height: 44px;
    margin: 0 auto 20px;
    border-radius: 999px;
    background: ${accent}1a;
    border: 1px solid ${accent}40;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  h1 { font-size: 20px; font-weight: 600; color: #fff; margin: 0 0 12px; }
  p { font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px; }
  a {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #c7d2fe;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 10px 20px;
  }
  a:hover { background: rgba(255,255,255,0.06); }
</style>
</head>
<body>
  <div class="card">
    <div class="dot" aria-hidden="true">${tone === 'success' ? '✓' : tone === 'error' ? '!' : '•'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="/">Back to Workflow Labs</a>
  </div>
</body>
</html>`;

  return html;
}

function htmlResponse(status: number, page: Parameters<typeof renderPage>[0]) {
  return new NextResponse(renderPage(page), {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')?.trim() ?? '';

  if (!id || !LEAD_ID_PATTERN.test(id)) {
    return htmlResponse(400, {
      title: 'Invalid link',
      message: 'This unsubscribe link is missing or malformed. If you need help, please contact us directly.',
      tone: 'error',
    });
  }

  try {
    const result = await markLeadUnsubscribed(id);
    if (result === 'not_found') {
      // Don't reveal whether the ID was valid — just log it server-side.
      console.warn(`Unsubscribe request for unknown lead id: ${id}`);
    }

    // Idempotent and non-revealing: whether the lead existed or was already
    // unsubscribed, the visitor sees the same confirmation.
    return htmlResponse(200, {
      title: "You're unsubscribed",
      message: "You won't receive any further outreach emails from us. It may take a short while to take effect everywhere.",
      tone: 'success',
    });
  } catch (err) {
    if (err instanceof FirebaseNotConfiguredError) {
      console.error('Unsubscribe request received but Firebase is not configured:', err.message);
      return htmlResponse(503, {
        title: 'Temporarily unavailable',
        message: "We couldn't process your request right now. Please try again shortly or contact us directly.",
        tone: 'error',
      });
    }

    console.error('Unsubscribe request failed:', err);
    return htmlResponse(500, {
      title: 'Something went wrong',
      message: "We couldn't process your request. Please try again shortly or contact us directly.",
      tone: 'error',
    });
  }
}
