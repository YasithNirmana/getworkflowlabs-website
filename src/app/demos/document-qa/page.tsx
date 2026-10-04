'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Search,
  Layers,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  X,
  ExternalLink,
} from 'lucide-react';
import { RAG_DOCUMENTS, type RagDocument } from '@/lib/rag/documents';
import { scoreChunks, topK, type ScoredChunk } from '@/lib/rag/retrieval';

type Stage = 'idle' | 'chunking' | 'scoring' | 'retrieved' | 'generating' | 'done' | 'error';

const TOP_K = 3;

export default function DocumentQaDemo() {
  const [activeDocId, setActiveDocId] = useState<string>(RAG_DOCUMENTS[0].id);
  const [question, setQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [scored, setScored] = useState<ScoredChunk[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [focusedChunkId, setFocusedChunkId] = useState<string | null>(null);

  const activeDoc = RAG_DOCUMENTS.find((d) => d.id === activeDocId) as RagDocument;
  const retrieved = useMemo(() => topK(scored, TOP_K).filter((s) => s.score > 0), [scored]);

  function resetPipeline() {
    setStage('idle');
    setScored([]);
    setAnswer('');
    setErrorMessage('');
  }

  function handleDocChange(docId: string) {
    if (docId === activeDocId) return;
    setActiveDocId(docId);
    setQuestion('');
    setCustomQuestion('');
    resetPipeline();
  }

  function openDocument(chunkId?: string) {
    setFocusedChunkId(chunkId ?? null);
    setIsDocModalOpen(true);
  }

  async function runPipeline(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuestion(trimmed);
    setAnswer('');
    setErrorMessage('');

    setStage('chunking');
    await wait(500);

    setStage('scoring');
    const results = scoreChunks(trimmed, activeDoc.chunks);
    setScored(results);
    await wait(700);

    const top = topK(results, TOP_K).filter((s) => s.score > 0);
    setStage('retrieved');
    await wait(500);

    if (top.length === 0) {
      setStage('done');
      setAnswer(
        "None of the chunks in this document scored a meaningful match for that question, so a real system would either say it doesn't know or fall back to a broader search. Try a question closer to the document's content, or use one of the suggested questions."
      );
      return;
    }

    setStage('generating');
    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          context: top.map((s) => ({ id: s.chunk.id, text: s.chunk.text })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStage('error');
        setErrorMessage(data?.message ?? 'Something went wrong generating the answer.');
        return;
      }

      setAnswer(data.answer as string);
      setStage('done');
    } catch {
      setStage('error');
      setErrorMessage('Could not reach the AI API. Please try again.');
    }
  }

  function wait(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  const isBusy = stage === 'chunking' || stage === 'scoring' || stage === 'retrieved' || stage === 'generating';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/#ai-tools" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Workflow Labs</span>
          </Link>
          <div className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            AI Tool Demo
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <header className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 border border-indigo-100">
              Knowledge & Search
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Document Q&amp;A
            </h1>
            <p className="text-lg text-slate-600">
              Pick a document, ask a question, and watch each step of a Retrieval-Augmented Generation (RAG)
              pipeline run live — chunking, relevance scoring, retrieval, and a grounded answer from a real AI model.
            </p>
          </header>

          {/* Document selector */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {RAG_DOCUMENTS.map((doc) => {
              const active = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleDocChange(doc.id)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    active
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className={`w-4 h-4 ${active ? 'text-blue-200' : 'text-blue-500'}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${active ? 'text-blue-200' : 'text-slate-400'}`}>
                      {doc.category}
                    </span>
                  </div>
                  <h3 className={`font-bold mb-2 ${active ? 'text-white' : 'text-slate-900'}`}>{doc.title}</h3>
                  <p className={`text-sm leading-relaxed ${active ? 'text-blue-100' : 'text-slate-500'}`}>
                    {doc.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">

            {/* Question input */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Suggested Questions
                </h3>
                <div className="space-y-2">
                  {activeDoc.sampleQuestions.map((q) => (
                    <button
                      key={q}
                      disabled={isBusy}
                      onClick={() => runPipeline(q)}
                      className="w-full text-left text-sm px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Or ask your own</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      runPipeline(customQuestion);
                    }}
                    className="flex flex-col gap-3"
                  >
                    <textarea
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      disabled={isBusy}
                      maxLength={300}
                      rows={3}
                      placeholder={`Ask something about "${activeDoc.title}"...`}
                      className="w-full text-sm rounded-xl border border-slate-200 p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 resize-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isBusy || !customQuestion.trim()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Ask
                    </button>
                  </form>
                </div>
              </div>

              {/* Document chunk preview */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    Document Chunks ({activeDoc.chunks.length})
                  </h3>
                  <button
                    onClick={() => openDocument()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Full Document
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {activeDoc.chunks.map((chunk) => {
                    const match = scored.find((s) => s.chunk.id === chunk.id);
                    const isTop = retrieved.some((r) => r.chunk.id === chunk.id);
                    return (
                      <button
                        key={chunk.id}
                        onClick={() => openDocument(chunk.id)}
                        className={`w-full text-left text-xs rounded-lg border px-3 py-2 transition-colors ${
                          isTop && stage !== 'idle' && stage !== 'chunking'
                            ? 'border-blue-300 bg-blue-50/70 hover:bg-blue-50'
                            : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-600">{chunk.title}</span>
                          {match && stage !== 'idle' && stage !== 'chunking' && (
                            <span className="text-slate-400 font-mono">{match.score.toFixed(2)}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pipeline visualization */}
            <div className="lg:col-span-3">
              <div className="bg-slate-900 text-white rounded-3xl shadow-sm p-6 md:p-8 min-h-[520px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

                {stage === 'idle' ? (
                  <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center relative z-10">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-slate-700">
                      <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-slate-400 max-w-sm">
                      Pick a suggested question or ask your own to see the retrieval pipeline run step by step.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                    <div className="pb-4 border-b border-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Question</p>
                      <p className="text-slate-100 font-medium">{question}</p>
                    </div>

                    <PipelineStep
                      index={1}
                      label="Chunking the document"
                      description={`Splitting "${activeDoc.title}" into ${activeDoc.chunks.length} retrievable chunks.`}
                      status={stepStatus(stage, 'chunking')}
                    />

                    <PipelineStep
                      index={2}
                      label="Scoring relevance"
                      description="Comparing the question against every chunk using term-overlap similarity."
                      status={stepStatus(stage, 'scoring')}
                    >
                      {(stage === 'scoring' || stage === 'retrieved' || stage === 'generating' || stage === 'done' || stage === 'error') &&
                        scored.length > 0 && (
                          <div className="mt-3 space-y-1.5">
                            {scored.slice(0, 4).map((s) => (
                              <div key={s.chunk.id} className="flex items-center gap-2 text-xs">
                                <span className="w-16 shrink-0 text-slate-400 font-mono">{s.chunk.id}</span>
                                <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, s.score * 100)}%` }}
                                  />
                                </div>
                                <span className="w-10 text-right text-slate-400 font-mono">{s.score.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                    </PipelineStep>

                    <PipelineStep
                      index={3}
                      label="Retrieving top chunks"
                      description={`Selecting the top ${TOP_K} most relevant chunks to ground the answer.`}
                      status={stepStatus(stage, 'retrieved')}
                    >
                      {(stage === 'retrieved' || stage === 'generating' || stage === 'done' || stage === 'error') && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {retrieved.length === 0 ? (
                            <span className="text-xs text-slate-400">No chunks scored above zero relevance.</span>
                          ) : (
                            retrieved.map((r) => (
                              <span
                                key={r.chunk.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-300"
                              >
                                {r.chunk.title}
                              </span>
                            ))
                          )}
                        </div>
                      )}
                    </PipelineStep>

                    <PipelineStep
                      index={4}
                      label="Generating grounded answer"
                      description="Sending the question + retrieved chunks to the AI model to synthesize a final answer."
                      status={stepStatus(stage, 'generating')}
                    >
                      {stage === 'generating' && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-blue-300">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Calling AI API...
                        </div>
                      )}

                      {stage === 'error' && (
                        <div className="mt-3 flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {stage === 'done' && answer && (
                        <div className="mt-3 flex items-start gap-2 text-xs text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          Answer generated using only the retrieved chunks above.
                        </div>
                      )}
                    </PipelineStep>

                    {stage === 'done' && answer && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Answer</p>
                          {retrieved.length > 0 && (
                            <button
                              onClick={() => openDocument(retrieved[0].chunk.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200 transition-colors shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Verify in document
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-slate-100 whitespace-pre-line bg-slate-800/60 border border-slate-700 rounded-xl p-4 leading-relaxed">
                          {answer}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-400 text-center mt-4">
                Retrieval runs entirely in your browser using lexical similarity. The final answer is generated by a real AI model call, grounded strictly in the retrieved chunks.
              </p>
            </div>
          </div>
        </div>
      </main>

      {isDocModalOpen && (
        <DocumentModal
          doc={activeDoc}
          retrievedIds={retrieved.map((r) => r.chunk.id)}
          focusedChunkId={focusedChunkId}
          onClose={() => setIsDocModalOpen(false)}
        />
      )}
    </div>
  );
}

function DocumentModal({
  doc,
  retrievedIds,
  focusedChunkId,
  onClose,
}: {
  doc: RagDocument;
  retrievedIds: string[];
  focusedChunkId: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!focusedChunkId) return;
    const el = document.getElementById(`chunk-${focusedChunkId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusedChunkId]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">{doc.category}</p>
            <h2 className="text-lg font-bold text-slate-900">{doc.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 space-y-5">
          {retrievedIds.length > 0 && (
            <p className="text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              Sections highlighted in blue were retrieved and used to ground the AI&apos;s answer.
            </p>
          )}
          {doc.chunks.map((chunk) => {
            const isRetrieved = retrievedIds.includes(chunk.id);
            const isFocused = chunk.id === focusedChunkId;
            return (
              <div
                key={chunk.id}
                id={`chunk-${chunk.id}`}
                className={`rounded-xl border p-4 transition-colors ${
                  isRetrieved ? 'border-blue-300 bg-blue-50/60' : 'border-slate-100 bg-white'
                } ${isFocused ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-slate-800">{chunk.title}</h3>
                  {isRetrieved && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                      Used in answer
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{chunk.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function stepStatus(stage: Stage, step: Stage): 'pending' | 'active' | 'done' {
  const order: Stage[] = ['chunking', 'scoring', 'retrieved', 'generating'];
  const stageIndex = order.indexOf(stage === 'done' || stage === 'error' ? 'generating' : stage);
  const stepIndex = order.indexOf(step);
  if (stageIndex < 0 || stepIndex < 0) return 'pending';
  if (stepIndex < stageIndex) return 'done';
  if (stepIndex === stageIndex) return stage === 'done' || stage === 'error' ? 'done' : 'active';
  return 'pending';
}

function PipelineStep({
  index,
  label,
  description,
  status,
  children,
}: {
  index: number;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'done';
  children?: React.ReactNode;
}) {
  return (
    <div className={`transition-opacity ${status === 'pending' ? 'opacity-40' : 'opacity-100'}`}>
      <div className="flex items-start gap-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
            status === 'done'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : status === 'active'
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              : 'bg-slate-800 border-slate-700 text-slate-500'
          }`}
        >
          {status === 'done' ? <CheckCircle2 className="w-3.5 h-3.5" /> : index}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-100">{label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
