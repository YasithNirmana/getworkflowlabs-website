import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Workflow,
  Settings,
  Bot,
  LayoutDashboard,
  BarChart,
  Network,
  Mail,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  BarChart3,
  Zap,
  ArrowUpRight,
  Sparkles,
  Inbox,
  Search,
  Layers,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#problem', label: 'The Problem' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#featured-work', label: 'Case Studies' },
  { href: '#ai-tools', label: 'AI Tools' },
  { href: '#research', label: 'Research' },
  { href: '#about', label: 'About' }
];

const capabilities = [
  'Workflow Automation',
  'AI-Assisted Operations',
  'Document Intelligence',
  'Systems Integration',
  'Internal Tools',
  'Reporting Automation',
  'Process Optimization',
  'Retrieval-Augmented Generation'
];

const pipeline = [
  { icon: Inbox, label: 'Request received', detail: 'Email · Portal · Spreadsheet', running: false },
  { icon: Sparkles, label: 'AI classifies & prioritizes', detail: 'Maintenance · High priority', running: false },
  { icon: Network, label: 'Routed for approval', detail: 'Assigned to vendor', running: false },
  { icon: BarChart3, label: 'Reporting updated', detail: 'Dashboard synced', running: true }
];

const linkedInPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function Eyebrow({ index, children, className = '' }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 ${className}`}>
      <span className="text-blue-400">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-blue-400/60 to-transparent" />
      {children}
    </div>
  );
}

function Hairline() {
  return <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

const accents = {
  blue: { glow: 'bg-blue-500/30', dot: 'bg-blue-400 text-blue-400', text: 'text-blue-300 group-hover:text-blue-200' },
  indigo: { glow: 'bg-indigo-500/30', dot: 'bg-indigo-400 text-indigo-400', text: 'text-indigo-300 group-hover:text-indigo-200' },
  emerald: { glow: 'bg-emerald-500/25', dot: 'bg-emerald-400 text-emerald-400', text: 'text-emerald-300 group-hover:text-emerald-200' }
};

function ShowcaseCard({
  href,
  tag,
  title,
  description,
  cta,
  accent,
  icons
}: {
  href: string;
  tag: string;
  title: React.ReactNode;
  description: string;
  cta: string;
  accent: keyof typeof accents;
  icons: { icon: React.ElementType; className: string }[];
}) {
  const a = accents[accent];
  return (
    <Link
      href={href}
      className="group ring-gradient flex h-full flex-col overflow-hidden rounded-3xl bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-indigo-950/50"
    >
      <div className="relative h-52 overflow-hidden border-b border-white/5 bg-[#070a12]">
        <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
        <div className={`absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${a.glow}`} />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] motion-safe:animate-orbit">
          <span className={`absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_0_12px_currentColor] ${a.dot}`} />
        </div>
        <div className="relative flex h-full items-center justify-center transition-transform duration-700 group-hover:scale-105">
          {icons.map(({ icon: Icon, className }, i) => (
            <div
              key={i}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-md ${i > 0 ? '-ml-3' : ''} ${i % 2 ? 'mt-10' : ''} ${className}`}
            >
              <Icon className="h-6 w-6" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex grow flex-col p-7">
        <span className="mb-4 w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400">
          {tag}
        </span>
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-slate-400">{description}</p>
        <div className={`mt-auto flex items-center text-sm font-medium transition-colors ${a.text}`}>
          {cta}
          <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function PlaceholderCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Plus className="h-5 w-5 text-slate-500" />
      </div>
      <h3 className="mb-2 text-base font-medium text-slate-300">{title}</h3>
      <p className="max-w-[250px] text-sm text-slate-500">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070d] font-sans text-slate-300 selection:bg-indigo-500/30 selection:text-white">

      {/* Navigation */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 pl-5 pr-2 shadow-lg shadow-black/30">
          <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_0_20px_-4px_rgba(99,102,241,0.8)]">
              <Workflow className="h-4 w-4 text-white" />
            </div>
            Workflow Labs
          </a>
          <div className="hidden gap-7 text-sm text-slate-400 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-all hover:bg-slate-200 active:scale-95">
            Let&apos;s Connect
          </a>
        </nav>
      </header>

      <main>

        {/* Hero Section */}
        <section className="relative isolate overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0" />
            <div className="absolute -top-48 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] motion-safe:animate-aurora" />
            <div className="absolute right-[-10%] top-24 h-[420px] w-[520px] rounded-full bg-violet-600/20 blur-[120px] motion-safe:animate-aurora [animation-delay:-7s]" />
            <div className="absolute left-[-12%] top-72 h-[320px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px] motion-safe:animate-aurora [animation-delay:-12s]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
          </div>

          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="glass mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-slate-300 motion-safe:animate-fade-up">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                </span>
                Researching modern workflows
              </div>
              <h1
                className="mb-8 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem] motion-safe:animate-fade-up"
                style={{ animationDelay: '100ms' }}
              >
                Helping operational teams reduce manual coordination through{' '}
                <span className="text-gradient font-serif font-normal italic">automation and AI.</span>
              </h1>
              <p
                className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl motion-safe:animate-fade-up"
                style={{ animationDelay: '200ms' }}
              >
                We research, design, and implement solutions that simplify complex operational workflows.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up" style={{ animationDelay: '300ms' }}>
                <a href="#contact" className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-8px_rgba(129,140,248,0.7)] transition-all hover:shadow-[0_0_60px_-6px_rgba(129,140,248,0.9)] active:scale-95">
                  Let&apos;s Connect
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#featured-work" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.07]">
                  View our work
                </a>
              </div>
            </div>

            {/* Hero visual: an example automated workflow */}
            <div className="relative motion-safe:animate-fade-up" style={{ animationDelay: '250ms' }}>
              <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent)] blur-2xl" />

              <div className="glass ring-gradient relative rounded-3xl p-5 shadow-2xl shadow-black/60 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>
                    <span className="font-mono text-xs text-slate-500">example-workflow.run</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <ol className="relative space-y-3">
                  <div aria-hidden className="absolute bottom-8 left-8 top-8 w-px overflow-hidden bg-white/10">
                    <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-300 to-transparent motion-safe:animate-travel" />
                  </div>
                  {pipeline.map((step, i) => (
                    <li
                      key={step.label}
                      className="relative flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3 pr-4 motion-safe:animate-fade-up"
                      style={{ animationDelay: `${450 + i * 150}ms` }}
                    >
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0b0f1a]">
                        <step.icon className="h-[18px] w-[18px] text-blue-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">{step.label}</p>
                        <p className="truncate font-mono text-[11px] text-slate-500">{step.detail}</p>
                      </div>
                      {step.running ? (
                        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-300" />
                          Running
                        </span>
                      ) : (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      )}
                    </li>
                  ))}
                </ol>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] text-slate-500">
                  <span>trigger: new_request</span>
                  <span className="text-slate-400">human-in-the-loop ✓</span>
                </div>
              </div>

              <div className="glass absolute -right-4 -top-5 hidden items-center gap-2 rounded-2xl border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 shadow-xl shadow-black/40 motion-safe:animate-float sm:flex">
                <Bot className="h-4 w-4 text-violet-300" />
                AI-assisted
              </div>
              <div className="glass absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-2xl border border-white/10 px-3.5 py-2.5 text-xs text-slate-200 shadow-xl shadow-black/40 motion-safe:animate-float [animation-delay:-3.5s] sm:flex">
                <Users className="h-4 w-4 text-cyan-300" />
                Built around your team
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities marquee */}
        <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.01] py-5 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex w-max motion-safe:animate-marquee">
            {[...capabilities, ...capabilities].map((item, i) => (
              <span
                key={i}
                aria-hidden={i >= capabilities.length}
                className="flex items-center gap-3 whitespace-nowrap px-7 font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
              >
                <span className="h-1 w-1 rounded-full bg-indigo-400/70" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* The Problem Section */}
        <section id="problem" className="relative py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div className="reveal">
                <Eyebrow index="01">The Problem</Eyebrow>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-[1.1]">
                  Operations shouldn&apos;t depend on spreadsheets, emails, and{' '}
                  <span className="font-serif font-normal italic text-slate-400">endless follow-ups.</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-slate-400">
                  Many businesses still rely on disconnected tools and manual processes to coordinate day-to-day operations.
                </p>
                <p className="text-lg leading-relaxed text-slate-200">
                  These inefficiencies consume time, create bottlenecks, and increase the risk of human error.
                </p>
              </div>

              <div className="reveal ring-gradient relative overflow-hidden rounded-3xl bg-white/[0.02]">
                <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">ops-audit.log</span>
                </div>
                <div className="relative p-6 md:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    Common challenges include:
                  </h3>
                  <ul className="divide-y divide-white/5">
                    {[
                      "Tracking requests across multiple channels",
                      "Coordinating between teams, vendors, and clients",
                      "Managing approvals and follow-ups",
                      "Producing reports manually",
                      "Maintaining visibility across operational workflows"
                    ].map((challenge, i) => (
                      <li key={i} className="flex items-center gap-4 py-4">
                        <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                        <span className="flex-1 text-slate-300">{challenge}</span>
                        <span className="hidden rounded-full border border-amber-400/20 bg-amber-400/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300/80 sm:inline">
                          Friction
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Hairline />

        {/* What We Do Section */}
        <section id="what-we-do" className="relative isolate overflow-hidden py-24 md:py-32">
          <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mb-16 max-w-3xl">
              <Eyebrow index="02">Services</Eyebrow>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                What We Do
              </h2>
              <p className="mb-6 text-xl text-slate-300">
                We help businesses identify and automate operational bottlenecks.
              </p>
              <p className="text-lg text-slate-400">
                Our focus is on understanding how operational teams work and finding opportunities to reduce repetitive administrative tasks through:
              </p>
            </div>

            <div className="reveal mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Workflow, title: "Workflow Automation" },
                { icon: Settings, title: "Process Optimization" },
                { icon: Bot, title: "AI-Assisted Operations" },
                { icon: LayoutDashboard, title: "Internal Tools & Dashboards" },
                { icon: BarChart, title: "Reporting Automation" },
                { icon: Network, title: "Systems Integration" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group ring-gradient relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]"
                >
                  <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative mb-10 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02]">
                      <feature.icon className="h-5 w-5 text-blue-300" />
                    </div>
                    <span className="font-mono text-xs text-slate-600">/0{i + 1}</span>
                  </div>
                  <h3 className="relative text-lg font-medium text-white">{feature.title}</h3>
                </div>
              ))}
            </div>

            <figure className="reveal ring-gradient relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-violet-600/15 px-8 py-12 text-center md:px-16 md:py-16">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
              <blockquote className="relative font-serif text-2xl leading-snug text-white md:text-4xl">
                Rather than forcing businesses into generic software, we explore solutions{' '}
                <span className="text-gradient italic">tailored to the way teams actually operate.</span>
              </blockquote>
            </figure>
          </div>
        </section>

        <Hairline />

        {/* Featured Work / Case Studies Section */}
        <section id="featured-work" className="relative isolate overflow-hidden py-24 md:py-32">
          <div aria-hidden className="absolute right-0 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mb-16 max-w-3xl">
              <Eyebrow index="03">Featured Work</Eyebrow>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Case Studies
              </h2>
              <p className="text-lg text-slate-400">
                Real-world examples of how we&apos;ve helped businesses streamline operations through custom automation and tailored software solutions.
              </p>
            </div>

            <div className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ShowcaseCard
                href="/case-studies/property-management-system"
                tag="Property Management"
                title="Property Management System"
                description="A unified platform that centralized operations, finances, and tenant communications, moving the agency away from spreadsheets and manual tracking."
                cta="Read Case Study"
                accent="blue"
                icons={[
                  { icon: Building2, className: 'border-blue-400/30 bg-blue-500/10 text-blue-300' },
                  { icon: Settings, className: 'border-violet-400/30 bg-violet-500/10 text-violet-300' },
                  { icon: Zap, className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300' }
                ]}
              />
              <PlaceholderCard
                title="More Case Studies Soon"
                text="We are currently documenting more of our recent operational transformations."
              />
            </div>
          </div>
        </section>

        <Hairline />

        {/* AI Tool Samples Section */}
        <section id="ai-tools" className="relative isolate overflow-hidden py-24 md:py-32">
          <div aria-hidden className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mb-16 max-w-3xl">
              <Eyebrow index="04">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                AI Tool Samples
              </Eyebrow>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Interactive demos, <span className="font-serif font-normal italic text-slate-400">not just slideware.</span>
              </h2>
              <p className="text-lg text-slate-400">
                A growing collection of sample AI tools you can try directly in the browser, showing the kind of automation we build into real operational workflows.
              </p>
            </div>

            <div className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ShowcaseCard
                href="/demos/email-triage"
                tag="Sales & Support"
                title="AI Email / Lead Triage"
                description="Drop in an inbox of raw emails and watch the AI classify intent, score priority, and draft a suggested first reply in seconds."
                cta="Try the Demo"
                accent="emerald"
                icons={[
                  { icon: Inbox, className: 'border-blue-400/30 bg-blue-500/10 text-blue-300' },
                  { icon: Sparkles, className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300' }
                ]}
              />
              <ShowcaseCard
                href="/demos/document-qa"
                tag="Knowledge & Search"
                title={<>Document Q&amp;A</>}
                description="Pick a document and ask it a question — watch retrieval-augmented generation (RAG) run step by step, from chunking to a grounded AI answer."
                cta="Try the Demo"
                accent="indigo"
                icons={[
                  { icon: Layers, className: 'border-indigo-400/30 bg-indigo-500/10 text-indigo-300' },
                  { icon: Search, className: 'border-blue-400/30 bg-blue-500/10 text-blue-300' }
                ]}
              />
              <PlaceholderCard
                title="More Tools Coming Soon"
                text="More sample AI tools are on the way, covering other everyday operational bottlenecks."
              />
            </div>
          </div>
        </section>

        {/* Current Research Section */}
        <section id="research" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal ring-gradient relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] p-8 md:p-16">
              {/* Radar: listening for where friction lives */}
              <div aria-hidden className="pointer-events-none absolute -right-28 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 overflow-hidden rounded-full xl:block">
                {[0, 1, 2, 3].map((ring) => (
                  <div key={ring} className="absolute rounded-full border border-white/[0.06]" style={{ inset: `${ring * 65}px` }} />
                ))}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(129,140,248,0.22)_50deg,transparent_70deg)] motion-safe:animate-radar" />
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300 shadow-[0_0_16px_4px_rgba(129,140,248,0.6)]" />
                <span className="absolute left-[30%] top-[28%] h-1.5 w-1.5 animate-ping rounded-full bg-cyan-300" />
                <span className="absolute left-[62%] top-[70%] h-1.5 w-1.5 animate-ping rounded-full bg-violet-300 [animation-delay:700ms]" />
                <span className="absolute left-[22%] top-[64%] h-1.5 w-1.5 animate-ping rounded-full bg-blue-300 [animation-delay:1400ms]" />
              </div>

              <div className="relative max-w-2xl">
                <Eyebrow index="05">Current Research</Eyebrow>
                <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl md:leading-[1.15]">
                  We&apos;re speaking with operations professionals to understand where{' '}
                  <span className="font-serif font-normal italic text-gradient">manual work creates the most friction.</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-400">
                  <p>
                    We&apos;re actively speaking with professionals responsible for operations, maintenance, property management, compliance, reporting, and administrative coordination.
                  </p>
                  <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 pl-7">
                    <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-blue-400 via-indigo-400 to-violet-400" />
                    <p className="mb-2 font-semibold text-white">The goal is simple:</p>
                    <p>Understand where teams spend the most time on manual work and identify opportunities for meaningful automation.</p>
                  </div>
                  <p className="font-medium text-slate-200">
                    If you&apos;re involved in operational processes and would like to share insights, we&apos;d love to hear from you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="overflow-hidden py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div className="reveal relative order-2 md:order-1">
                <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-blue-600/25 via-indigo-500/10 to-violet-600/25 blur-2xl" />
                <div className="ring-gradient relative aspect-square overflow-hidden rounded-[2rem] bg-slate-900">
                  <Image
                    src="/headshot_yasith.png"
                    alt="Yasith"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-transparent to-transparent" />
                  <div className="glass absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-white">Yasith Nirmana</p>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Founder</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Open to chat
                    </span>
                  </div>
                </div>
              </div>
              <div className="reveal order-1 md:order-2">
                <Eyebrow index="06">The Founder</Eyebrow>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  About
                </h2>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white">Yasith Nirmana</h3>
                  <p className="text-gradient w-fit text-lg font-medium">Founder, Workflow Labs</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Software Engineer', 'MBA', 'Enterprise Software Experience'].map((credential) => (
                      <span key={credential} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                        {credential}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://www.linkedin.com/in/yasith-nirmana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={linkedInPath} /></svg>
                    LinkedIn Profile
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
                <div className="space-y-6 text-lg text-slate-400">
                  <p className="font-medium text-slate-100">
                    Built by a software engineer passionate about operational excellence.
                  </p>
                  <p>
                    Workflow Labs was founded to explore how automation and AI can help businesses spend less time managing processes and more time creating value.
                  </p>
                  <p>
                    With experience building enterprise software and working closely with business operations, our mission is to simplify complex workflows through practical technology solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative isolate overflow-hidden border-t border-white/5 py-32 md:py-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_20%,transparent_100%)]" />
            <div className="absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px] motion-safe:animate-aurora" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
          </div>
          <div className="reveal mx-auto max-w-4xl px-6 text-center">
            <Eyebrow index="07" className="justify-center">Contact</Eyebrow>
            <h2 className="mb-6 text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Let&apos;s <span className="text-gradient font-serif font-normal italic">Connect</span>
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
              Interested in discussing operational challenges, workflow automation, or process improvement?
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="mailto:yasith@getworkflowlabs.com" className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-slate-950 shadow-[0_0_40px_-8px_rgba(129,140,248,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_60px_-6px_rgba(129,140,248,0.9)] active:translate-y-0 sm:w-auto">
                <Mail className="h-5 w-5 text-indigo-600" />
                yasith@getworkflowlabs.com
              </a>
              <a href="https://www.linkedin.com/in/yasith-nirmana/" target="_blank" rel="noopener noreferrer" className="glass flex w-full items-center justify-center gap-3 rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] active:translate-y-0 sm:w-auto">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={linkedInPath} /></svg>
                Connect on Linkedin
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/5 pt-12 text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2 font-semibold text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-violet-600">
              <Workflow className="h-3.5 w-3.5 text-white" />
            </div>
            Workflow Labs
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm">Helping businesses streamline operations through automation and AI.</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-sm md:items-end">
            <span>© 2026 Workflow Labs</span>
            <Link href="/anti-spam-policy" className="text-slate-500 transition-colors hover:text-white">
              Anti-Spam &amp; Outreach Policy
            </Link>
          </div>
        </div>
        <div aria-hidden className="mt-10 select-none whitespace-nowrap text-center text-[13vw] font-semibold leading-[0.8] tracking-tighter text-transparent [background-clip:text] bg-gradient-to-b from-white/[0.08] to-transparent">
          Workflow Labs
        </div>
      </footer>

    </div>
  );
}
