'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Mail,
  Clock,
  Flame,
  Gauge,
  Snowflake,
  Wand2,
  Loader2,
  CircleDot,
  Building2,
  LifeBuoy,
  Briefcase,
  MailWarning,
  Shuffle
} from 'lucide-react';

type Priority = 'High' | 'Medium' | 'Low';

interface Triage {
  category: string;
  categoryIcon: React.ElementType;
  priority: Priority;
  sentiment: string;
  suggestedAction: string;
  draftReplies: string[];
}

interface SampleEmail {
  id: string;
  from: string;
  company: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  triage: Triage;
}

const SAMPLE_EMAILS: SampleEmail[] = [
  {
    id: 'lead-hot',
    from: 'Marcus Webb',
    company: 'Northgate Facilities Group',
    subject: 'Ready to move forward on the maintenance platform',
    preview: 'We reviewed the proposal internally and want to get started this quarter...',
    body: "Hi team,\n\nWe reviewed the proposal internally and the ops leadership is on board. We'd like to get started before the end of the quarter if possible - can we get a call on the calendar this week to discuss implementation timelines and pricing for the 40-property tier?\n\nThanks,\nMarcus",
    receivedAt: '9:14 AM',
    triage: {
      category: 'Sales — New Lead',
      categoryIcon: Briefcase,
      priority: 'High',
      sentiment: 'Positive, ready to buy',
      suggestedAction: 'Route directly to sales lead + calendar link within 1 hour',
      draftReplies: [
        "Hi Marcus,\n\nThat's great to hear — glad the proposal landed well with your team. I've attached a scheduling link so we can find a time this week to walk through implementation timelines and the 40-property pricing tier in detail.\n\nLooking forward to it,\nWorkflow Labs Team",
        "Hi Marcus,\n\nFantastic news — thanks for the update. I've looped in our onboarding lead and grabbed a scheduling link below so we can lock in a time this week to cover timelines and pricing for the 40-property tier.\n\nTalk soon,\nWorkflow Labs Team",
        "Hi Marcus,\n\nAppreciate you letting us know — excited to get moving. I'm free most of this week to walk through implementation and the 40-property pricing tier; here's a link to grab a slot that works for you.\n\nBest,\nWorkflow Labs Team",
      ],
    },
  },
  {
    id: 'support-urgent',
    from: 'Priya Shah',
    company: 'Lakeview Residences',
    subject: 'URGENT: Tenant portal down for all users',
    preview: 'Since about 8am this morning none of our tenants can log into the portal...',
    body: "Since about 8am this morning none of our tenants can log into the portal to submit maintenance requests or pay rent. We have several people calling the office right now. Please advise ASAP, this is affecting our whole building.",
    receivedAt: '8:52 AM',
    triage: {
      category: 'Support — Outage',
      categoryIcon: LifeBuoy,
      priority: 'High',
      sentiment: 'Urgent, frustrated',
      suggestedAction: 'Escalate to on-call engineer immediately, send holding reply',
      draftReplies: [
        "Hi Priya,\n\nThanks for flagging this right away — I've escalated it to our on-call engineering team as a top priority and we're actively investigating. I'll follow up within 30 minutes with a status update.\n\nApologies for the disruption,\nWorkflow Labs Support",
        "Hi Priya,\n\nSorry for the trouble this is causing — this has been pushed to our on-call engineers as a top priority and they're on it right now. Expect a status update from me within the next 30 minutes.\n\nThanks for your patience,\nWorkflow Labs Support",
        "Hi Priya,\n\nGot it, treating this as urgent — I've paged our on-call engineer and they're investigating the outage now. I'll check back in with a concrete update shortly.\n\nApologies for the inconvenience,\nWorkflow Labs Support",
      ],
    },
  },
  {
    id: 'lead-cold',
    from: 'Dana Ruiz',
    company: 'Ruiz & Co. Property Advisors',
    subject: 'Just browsing your website',
    preview: 'Hi, I saw your site and was curious what kind of pricing you offer...',
    body: "Hi, I saw your site and was curious what kind of pricing you offer for something like this. Not in a rush, just exploring options for later this year. Feel free to send info whenever.",
    receivedAt: 'Yesterday, 4:20 PM',
    triage: {
      category: 'Sales — Early Interest',
      categoryIcon: Briefcase,
      priority: 'Low',
      sentiment: 'Neutral, exploratory',
      suggestedAction: 'Send pricing overview + add to nurture sequence',
      draftReplies: [
        "Hi Dana,\n\nThanks for reaching out! I've attached a quick overview of our pricing tiers. No pressure at all — happy to answer questions whenever you're ready to explore further.\n\nBest,\nWorkflow Labs Team",
        "Hi Dana,\n\nThanks for checking us out! I've included a pricing breakdown for you to browse at your own pace — feel free to reach back out whenever the timing is right.\n\nBest wishes,\nWorkflow Labs Team",
        "Hi Dana,\n\nAppreciate you reaching out. Attached is a pricing overview to look over whenever it's convenient — no rush at all, and I'm happy to answer anything as it comes up.\n\nTake care,\nWorkflow Labs Team",
      ],
    },
  },
  {
    id: 'vendor-invoice',
    from: 'Billing — CleanPro Services',
    company: 'CleanPro Services',
    subject: 'Invoice #4471 attached',
    preview: 'Please find attached invoice #4471 for services rendered in March...',
    body: "Please find attached invoice #4471 for janitorial services rendered in March. Payment is due within 30 days. Let us know if you have any questions.",
    receivedAt: 'Yesterday, 11:05 AM',
    triage: {
      category: 'Admin — Invoice',
      categoryIcon: Building2,
      priority: 'Medium',
      sentiment: 'Neutral',
      suggestedAction: 'Forward to accounts payable, no reply needed',
      draftReplies: [
        "Hi CleanPro team,\n\nReceived, thank you — this has been forwarded to our accounts payable team for processing within the standard 30-day window.\n\nBest,\nWorkflow Labs Team",
        "Hi CleanPro team,\n\nThanks for sending this over — invoice #4471 has been passed along to accounts payable and will be processed within 30 days as usual.\n\nRegards,\nWorkflow Labs Team",
        "Hi CleanPro team,\n\nConfirming receipt of invoice #4471. It's been routed to our accounts payable team and is on track for payment within the standard 30-day terms.\n\nThank you,\nWorkflow Labs Team",
      ],
    },
  },
  {
    id: 'spam',
    from: 'growth.hacks247@offshore-mail.biz',
    company: 'Unknown',
    subject: 'Boost your SEO ranking 10x this month!!',
    preview: 'Our exclusive backlink package guarantees page 1 rankings...',
    body: "Our exclusive backlink package guarantees page 1 rankings on Google within 30 days. Reply now to claim your discount before it expires!",
    receivedAt: '2 days ago',
    triage: {
      category: 'Spam / Irrelevant',
      categoryIcon: MailWarning,
      priority: 'Low',
      sentiment: 'N/A',
      suggestedAction: 'Auto-archive, no reply — flagged as low-quality outreach',
      draftReplies: [
        'No reply recommended. This message has been archived automatically.',
        'No reply recommended. Flagged as unsolicited outreach and moved to the archive.',
        'No reply recommended. Message matched low-quality outreach patterns and was auto-archived.',
      ],
    },
  },
  {
    id: 'complaint',
    from: 'Harold Jennings',
    company: 'Tenant, Unit 4B',
    subject: 'Second request - heating issue not fixed',
    preview: "This is the second time I'm writing about the heating in my unit...",
    body: "This is the second time I'm writing about the heating in my unit. A technician came out last week but it's still not working properly and it's getting cold. I need this resolved soon.",
    receivedAt: '2 days ago',
    triage: {
      category: 'Support — Escalation',
      categoryIcon: LifeBuoy,
      priority: 'High',
      sentiment: 'Frustrated, repeat issue',
      suggestedAction: 'Escalate to maintenance supervisor, prioritize same-day dispatch',
      draftReplies: [
        "Hi Harold,\n\nI'm sorry to hear the issue hasn't been fully resolved — I've escalated this to our maintenance supervisor for a same-day follow-up visit to make sure it's fixed properly this time.\n\nThank you for your patience,\nWorkflow Labs Team",
        "Hi Harold,\n\nApologies that this is still unresolved — I've flagged it to our maintenance supervisor directly and requested a same-day visit to get it fixed for good this time.\n\nThanks for bearing with us,\nWorkflow Labs Team",
        "Hi Harold,\n\nSorry for the repeat trouble — this has been escalated to our maintenance supervisor with a same-day dispatch request so we can get it properly resolved today.\n\nWe appreciate your patience,\nWorkflow Labs Team",
      ],
    },
  },
];

const priorityStyles: Record<Priority, { badge: string; icon: React.ElementType; dot: string }> = {
  High: { badge: 'bg-red-50 text-red-600 border-red-200', icon: Flame, dot: 'bg-red-500' },
  Medium: { badge: 'bg-amber-50 text-amber-600 border-amber-200', icon: Gauge, dot: 'bg-amber-500' },
  Low: { badge: 'bg-slate-100 text-slate-500 border-slate-200', icon: Snowflake, dot: 'bg-slate-400' },
};

function pickReplyIndex(count: number, previousIndex: number | null) {
  if (count <= 1) return 0;
  let index = Math.floor(Math.random() * count);
  if (index === previousIndex) {
    index = (index + 1) % count;
  }
  return index;
}

export default function EmailTriageDemo() {
  const [selectedId, setSelectedId] = useState<string>(SAMPLE_EMAILS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revealedId, setRevealedId] = useState<string>(SAMPLE_EMAILS[0].id);
  const [replyIndex, setReplyIndex] = useState<number>(0);

  const selected = SAMPLE_EMAILS.find((e) => e.id === selectedId)!;
  const isRevealed = revealedId === selectedId && !isAnalyzing;

  function handleSelect(id: string) {
    const email = SAMPLE_EMAILS.find((e) => e.id === id)!;
    const previousIndex = id === selectedId ? replyIndex : null;
    const nextIndex = pickReplyIndex(email.triage.draftReplies.length, previousIndex);

    setSelectedId(id);
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setRevealedId(id);
      setReplyIndex(nextIndex);
    }, 900);
  }

  const PriorityIcon = priorityStyles[selected.triage.priority].icon;
  const CategoryIcon = selected.triage.categoryIcon;
  const totalReplies = selected.triage.draftReplies.length;
  const currentReply = selected.triage.draftReplies[replyIndex] ?? selected.triage.draftReplies[0];

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 border border-blue-100">
              Sales & Support
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              AI Email / Lead Triage
            </h1>
            <p className="text-lg text-slate-600">
              Select an email on the left to see how an AI triage layer would classify it — priority, category,
              sentiment, and a first-draft reply — before it ever reaches a person&apos;s inbox.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-6">

            {/* Inbox list */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">Sample Inbox</span>
                <span className="ml-auto text-xs text-slate-400">{SAMPLE_EMAILS.length} messages</span>
              </div>
              <div className="divide-y divide-slate-100 overflow-y-auto">
                {SAMPLE_EMAILS.map((email) => {
                  const active = email.id === selectedId;
                  return (
                    <button
                      key={email.id}
                      onClick={() => handleSelect(email.id)}
                      className={`w-full text-left px-5 py-4 transition-colors ${
                        active ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-sm font-semibold truncate ${active ? 'text-blue-700' : 'text-slate-800'}`}>
                          {email.from}
                        </span>
                        <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {email.receivedAt}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-700 truncate mb-1">{email.subject}</div>
                      <div className="text-xs text-slate-500 truncate">{email.preview}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email + Triage panel */}
            <div className="lg:col-span-3 space-y-6">

              {/* Raw email */}
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selected.subject}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {selected.from} &middot; {selected.company}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{selected.receivedAt}</span>
                </div>
                <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed border-t border-slate-100 pt-4">
                  {selected.body}
                </p>
              </div>

              {/* AI Triage output */}
              <div className="bg-slate-900 text-white rounded-3xl shadow-sm p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">AI Triage Result</h3>
                  {isAnalyzing && (
                    <span className="ml-auto flex items-center gap-2 text-xs text-blue-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Analyzing...
                    </span>
                  )}
                </div>

                {isAnalyzing ? (
                  <div className="space-y-3 relative z-10">
                    <div className="h-4 w-2/3 bg-slate-700/60 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-slate-700/60 rounded animate-pulse"></div>
                    <div className="h-20 w-full bg-slate-700/40 rounded-xl animate-pulse mt-4"></div>
                  </div>
                ) : (
                  isRevealed && (
                    <div className="space-y-6 relative z-10">
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200">
                          <CategoryIcon className="w-3.5 h-3.5 text-blue-400" />
                          {selected.triage.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${priorityStyles[selected.triage.priority].badge}`}
                        >
                          <PriorityIcon className="w-3.5 h-3.5" />
                          {selected.triage.priority} Priority
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-200">
                          <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
                          {selected.triage.sentiment}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Suggested Action</p>
                        <p className="text-sm text-slate-200 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                          {selected.triage.suggestedAction}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Suggested Reply Draft</p>
                          {totalReplies > 1 && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                              <Shuffle className="w-3 h-3" />
                              Variation {replyIndex + 1} of {totalReplies}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-200 whitespace-pre-line bg-slate-800/60 border border-slate-700 rounded-xl p-4 leading-relaxed">
                          {currentReply}
                        </p>
                        {totalReplies > 1 && (
                          <p className="text-xs text-slate-500 mt-2">
                            Click the email again to reroll a different reply variation.
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <p className="text-xs text-slate-400 text-center">
                This is a simulated demo using sample data for illustration — it is not connected to a live inbox or AI model.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
