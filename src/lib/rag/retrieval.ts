import type { DocChunk } from './documents';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'in', 'on', 'for', 'and', 'or', 'but', 'with', 'at', 'by',
  'from', 'as', 'it', 'its', 'this', 'that', 'these', 'those', 'what',
  'which', 'who', 'whom', 'do', 'does', 'did', 'can', 'could', 'will',
  'would', 'should', 'i', 'you', 'we', 'they', 'my', 'your', 'our',
  'their', 'how', 'when', 'where', 'why', 'about', 'into', 'up', 'if',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 0 && !STOPWORDS.has(token));
}

function termFrequency(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }
  return freq;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  for (const [term, freqA] of a) {
    const freqB = b.get(term);
    if (freqB) dot += freqA * freqB;
  }
  const magA = Math.sqrt([...a.values()].reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt([...b.values()].reduce((sum, v) => sum + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export interface ScoredChunk {
  chunk: DocChunk;
  score: number;
  matchedTerms: string[];
}

export function scoreChunks(question: string, chunks: DocChunk[]): ScoredChunk[] {
  const questionTokens = tokenize(question);
  const questionFreq = termFrequency(questionTokens);
  const questionTermSet = new Set(questionTokens);

  const scored = chunks.map((chunk) => {
    const chunkTokens = tokenize(chunk.text + ' ' + chunk.title);
    const chunkFreq = termFrequency(chunkTokens);
    const score = cosineSimilarity(questionFreq, chunkFreq);
    const matchedTerms = [...new Set(chunkTokens)].filter((t) => questionTermSet.has(t));
    return { chunk, score, matchedTerms };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export function topK(scored: ScoredChunk[], k: number): ScoredChunk[] {
  return scored.slice(0, k);
}
