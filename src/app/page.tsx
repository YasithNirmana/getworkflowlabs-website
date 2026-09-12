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
  CreditCard,
  PieChart,
  Wrench,
  FileText,
  MessageSquare,
  BarChart3,
  TrendingDown,
  Zap,
  CheckCircle,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            Workflow Labs
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-blue-600 transition-colors">The Problem</a>
            <a href="#what-we-do" className="hover:text-blue-600 transition-colors">What We Do</a>
            <a href="#featured-work" className="hover:text-blue-600 transition-colors">Case Studies</a>
            <a href="#research" className="hover:text-blue-600 transition-colors">Research</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-sm hover:shadow-md">
            Let's Connect
          </a>
        </div>
      </nav>

      <main className="pt-20">

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50/20 to-transparent -z-10"></div>

          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8 border border-blue-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Researching modern workflows
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Helping operational teams reduce manual coordination through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">automation and AI.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                We research, design, and implement solutions that simplify complex operational workflows.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group">
                  Let's Connect
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Currently exploring</p>
                <div className="flex flex-wrap gap-3">
                  {['Property Management', 'Facilities Management', 'Professional Services'].map((item) => (
                    <span key={item} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section id="problem" className="py-24 bg-white relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                  Operations shouldn't depend on spreadsheets, emails, and endless follow-ups.
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Many businesses still rely on disconnected tools and manual processes to coordinate day-to-day operations.
                </p>
                <p className="text-lg text-slate-600 font-medium mb-8">
                  These inefficiencies consume time, create bottlenecks, and increase the risk of human error.
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Common challenges include:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Tracking requests across multiple channels",
                    "Coordinating between teams, vendors, and clients",
                    "Managing approvals and follow-ups",
                    "Producing reports manually",
                    "Maintaining visibility across operational workflows"
                  ].map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      </div>
                      <span className="text-slate-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                What We Do
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                We help businesses identify and automate operational bottlenecks.
              </p>
              <p className="text-lg text-slate-400">
                Our focus is on understanding how operational teams work and finding opportunities to reduce repetitive administrative tasks through:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { icon: Workflow, title: "Workflow Automation" },
                { icon: Settings, title: "Process Optimization" },
                { icon: Bot, title: "AI-Assisted Operations" },
                { icon: LayoutDashboard, title: "Internal Tools & Dashboards" },
                { icon: BarChart, title: "Reporting Automation" },
                { icon: Network, title: "Systems Integration" }
              ].map((feature, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <p className="text-xl md:text-2xl font-medium text-white relative z-10">
                Rather than forcing businesses into generic software, we explore solutions tailored to the way teams actually operate.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Work / Case Studies Section */}
        <section id="featured-work" className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                Featured Work
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Case Studies
              </h2>
              <p className="text-lg text-slate-400">
                Real-world examples of how we've helped businesses streamline operations through custom automation and tailored software solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Case Study Card 1 */}
              <Link href="/case-studies/property-management-system" className="group block h-full">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 hover:bg-slate-800/50 transition-all h-full flex flex-col">
                  {/* Abstract thumbnail replacing the full architecture diagram */}
                  <div className="h-48 bg-slate-900 relative overflow-hidden border-b border-slate-800 p-6 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                    <div className="flex gap-4 relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                       <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                         <Building2 className="w-7 h-7 text-blue-400" />
                       </div>
                       <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/30 -ml-4 mt-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                         <Settings className="w-7 h-7 text-purple-400" />
                       </div>
                       <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30 -ml-4 -mt-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                         <Zap className="w-7 h-7 text-emerald-400" />
                       </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col grow">
                    <div className="flex items-center gap-2 mb-4">
                       <span className="px-3 py-1 bg-slate-800/80 rounded-full text-xs font-medium text-slate-300 border border-slate-700">Property Management</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      Property Management System
                    </h3>
                    <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                      A unified platform that centralized operations, finances, and tenant communications, moving the agency away from spreadsheets and manual tracking.
                    </p>
                    <div className="mt-auto flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                      Read Case Study <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Placeholder for future case studies */}
              <div className="border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-900/20 h-full min-h-[400px]">
                <div className="w-14 h-14 bg-slate-800/50 rounded-full flex items-center justify-center mb-5">
                  <span className="text-slate-400 text-xl font-light">+</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-3">More Case Studies Soon</h3>
                <p className="text-sm text-slate-500 max-w-[250px]">We are currently documenting more of our recent operational transformations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Research Section */}
        <section id="research" className="py-24 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-200">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
                  Current Research
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                  We're speaking with operations professionals to understand where manual work creates the most friction.
                </h2>
                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    We're actively speaking with professionals responsible for operations, maintenance, property management, compliance, reporting, and administrative coordination.
                  </p>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                    <p className="font-semibold text-slate-900 mb-2">The goal is simple:</p>
                    <p>Understand where teams spend the most time on manual work and identify opportunities for meaningful automation.</p>
                  </div>
                  <p className="font-medium text-slate-800">
                    If you're involved in operational processes and would like to share insights, we'd love to hear from you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-square rounded-[2.5rem] bg-slate-100 overflow-hidden relative">
                  <Image
                    src="/headshot_yasith.png"
                    alt="Yasith"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-50 rounded-full blur-3xl -z-10"></div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                  About
                </h2>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Yasith Nirmana</h3>
                  <p className="text-blue-600 font-semibold text-lg">Founder, Workflow Labs</p>
                  <p className="text-sm text-slate-500 mt-1">Software Engineer | MBA | Enterprise Software Experience</p>
                  <a
                    href="https://www.linkedin.com/in/yasith-nirmana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3 transition-colors group"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn Profile
                  </a>
                </div>
                <div className="space-y-6 text-lg text-slate-600">
                  <p className="font-medium text-slate-900">
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
        <section id="contact" className="py-24 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjwvc3ZnPg==')] opacity-50"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Interested in discussing operational challenges, workflow automation, or process improvement?
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:hello@getworkflowlabs.com" className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
                hello@getworkflowlabs.com
              </a>
              <a href="https://www.linkedin.com/in/yasith-nirmana/" className="flex items-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-blue-500 w-full sm:w-auto justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                Connect on Linkedin
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <Workflow className="w-3.5 h-3.5 text-white" />
            </div>
            Workflow Labs
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm">Helping businesses streamline operations through automation and AI.</p>
          </div>
          <div className="text-sm flex flex-col md:items-end items-center gap-1">
            <span>© 2026 Workflow Labs</span>
            <Link href="/anti-spam-policy" className="text-slate-500 hover:text-white transition-colors">
              Anti-Spam &amp; Outreach Policy
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
