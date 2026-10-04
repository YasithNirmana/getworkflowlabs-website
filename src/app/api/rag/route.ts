import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_QUESTION_LENGTH = 300;
const MAX_CONTEXT_CHUNKS = 5;
const MAX_CHUNK_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;

// Best-effort in-memory rate limit. Resets on cold start / new instance,
// which is fine for a low-traffic portfolio demo — not a real abuse defense.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

interface ContextChunk {
  id: string;
  text: string;
}

function buildPrompt(question: string, context: ContextChunk[]) {
  const contextBlock = context
    .map((c) => `[${c.id}]\n${c.text}`)
    .join('\n\n');

  const system =
    "You are a document Q&A assistant in a product demo. Answer the user's question using ONLY the information in the provided context chunks below. " +
    "If the context does not contain enough information to answer, say so plainly instead of guessing. " +
    'Keep the answer concise (2-4 sentences). When you use a fact from a chunk, cite it inline using its bracketed id, e.g. [C2].';

  const user = `Context:\n${contextBlock}\n\nQuestion: ${question}`;

  return { system, user };
}

async function callAnthropic(apiKey: string, system: string, user: string) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error('Anthropic API returned an unexpected response shape.');
  return text as string;
}

async function callOpenAI(apiKey: string, system: string, user: string) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI API returned an unexpected response shape.');
  return text as string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'rate_limited', message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: { question?: unknown; context?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const question = typeof body.question === 'string' ? body.question.trim() : '';
  const rawContext = Array.isArray(body.context) ? body.context : [];

  if (!question) {
    return NextResponse.json({ error: 'invalid_request', message: 'A question is required.' }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: 'invalid_request', message: `Question must be ${MAX_QUESTION_LENGTH} characters or fewer.` },
      { status: 400 }
    );
  }

  const context: ContextChunk[] = rawContext
    .slice(0, MAX_CONTEXT_CHUNKS)
    .filter(
      (c): c is ContextChunk =>
        typeof c === 'object' && c !== null && typeof (c as ContextChunk).id === 'string' && typeof (c as ContextChunk).text === 'string'
    )
    .map((c) => ({ id: c.id, text: c.text.slice(0, MAX_CHUNK_LENGTH) }));

  if (context.length === 0) {
    return NextResponse.json({ error: 'invalid_request', message: 'At least one context chunk is required.' }, { status: 400 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!anthropicKey && !openaiKey) {
    return NextResponse.json(
      {
        error: 'not_configured',
        message:
          'No AI API key is configured on the server yet. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in the environment to enable live answers.',
      },
      { status: 503 }
    );
  }

  const { system, user } = buildPrompt(question, context);

  try {
    const provider = anthropicKey ? 'anthropic' : 'openai';
    const answer = anthropicKey
      ? await callAnthropic(anthropicKey, system, user)
      : await callOpenAI(openaiKey as string, system, user);

    return NextResponse.json({ answer, provider });
  } catch (err) {
    console.error('RAG demo generation failed:', err);
    return NextResponse.json(
      { error: 'generation_failed', message: 'The AI provider request failed. Please try again shortly.' },
      { status: 502 }
    );
  }
}
