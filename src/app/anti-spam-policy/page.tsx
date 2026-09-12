import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anti-Spam & Outreach Policy - Workflow Labs',
  description: 'WorkflowLabs\' policy on email outreach, anti-spam compliance, and how to report abuse.',
};

export default function AntiSpamPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="text-sm font-medium text-slate-500">
            Policy
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <header className="mb-16">
            <div className="text-blue-500 font-medium text-sm tracking-wider uppercase mb-4">Policy</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Anti-Spam &amp; Outreach Policy
            </h1>
            <p className="text-slate-500 text-sm">Last updated: September 2026</p>
          </header>

          <div className="space-y-16">

            <section>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  WorkflowLabs does not engage in unsolicited bulk email advertising (&quot;spam&quot;) of this website or our services. This policy governs how we and any third parties conduct email outreach on our behalf.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">01.</span> Our Commitment
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-slate-400">
                <li>We do not send unsolicited bulk commercial email to purchased or unverified mass mailing lists.</li>
                <li>Any direct outreach we conduct is targeted, individually relevant, and sent in small volumes to specific prospective clients in our target industry.</li>
                <li>We honor every opt-out and unsubscribe request immediately and permanently suppress that contact from future outreach.</li>
                <li>We do not use deceptive subject lines, false sender information, or misleading content in any email we send.</li>
                <li>We comply with applicable anti-spam regulations, including CAN-SPAM (US), CASL (Canada), and the Spam Act (Australia), for recipients in those jurisdictions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">02.</span> Third Parties and Affiliates
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  WorkflowLabs does not authorize any affiliate, partner, or third party to advertise this website using unsolicited messages. We do not run affiliate marketing programs for this website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">03.</span> Sending Infrastructure
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  Outbound email campaigns are sent only from designated, authenticated sending domains, separate from our primary web domain, with proper SPF, DKIM, and DMARC authentication in place and gradual sending-volume practices to maintain good sending reputation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">04.</span> Reporting Abuse
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  If you believe you received an unsolicited or improper message referencing WorkflowLabs or getworkflowlabs.com, please contact us at{' '}
                  <a href="mailto:yasithnirmana99@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    yasithnirmana99@gmail.com
                  </a>{' '}
                  so we can investigate.
                </p>
              </div>
            </section>

          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-slate-500 py-8 border-t border-slate-800/50 text-center text-sm">
        <div className="max-w-4xl mx-auto px-6">
          © {new Date().getFullYear()} Workflow Labs
        </div>
      </footer>
    </div>
  );
}
