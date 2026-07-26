import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Building2,
  CreditCard,
  Settings,
  PieChart,
  Wrench,
  FileText,
  MessageSquare,
  BarChart3,
  TrendingDown,
  Zap,
  CheckCircle,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { SystemArchitectureFlow } from './ArchitectureDiagram';

export default function PropertyManagementCaseStudy() {
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
            Case Study
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <header className="mb-16">
            <div className="text-blue-500 font-medium text-sm tracking-wider uppercase mb-4">Case Study</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Property Management System (PMS)
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl">
              A unified platform for managing operations, finances, and tenant communications.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'DigitalOcean', 'Netlify'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-medium text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Image Placeholder for actual system screenshots */}
          <div className="mb-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 p-1 flex items-center justify-center aspect-video overflow-hidden group relative">
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-500 z-10 transition-opacity group-hover:opacity-90">
              <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">System Screenshot Space</p>
              <p className="text-sm opacity-70">Add your actual application screenshots here</p>
            </div>
          </div>

          <div className="space-y-20">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">01.</span> Overview
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  Standout Management was operating a growing property portfolio using a combination of spreadsheets, physical boards, and manual financial processes. As the business expanded, these disconnected systems became increasingly difficult to maintain, resulting in inefficiencies, missing information, and significant administrative overhead.
                </p>
                <p>
                  To solve this, a custom Property Management System (PMS) was designed and developed, centralizing all core processes into one unified platform. This web-based management tool offered real-time updates, secure tenant portals, and streamlined financial reporting, enabling the agency to operate more efficiently, scale seamlessly, and manage multiple property operations with significantly reduced manual effort.
                </p>
              </div>
            </section>

            {/* The Challenge */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">02.</span> The Challenge
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400 mb-8">
                <p>
                  The agency was heavily reliant on manual processes that were slowing down their growth and creating administrative bottlenecks.
                </p>
                <p className="font-medium text-slate-300">Key challenges included:</p>
                <ul className="space-y-2 mt-4 list-disc pl-5">
                  <li>Inefficient manual processes for everything from tracking leads to recording lease agreements.</li>
                  <li>Disparate data sources leading to disjointed records and poor decision-making.</li>
                  <li>Relying on unsupported, basic tools like generic calendar apps and physical sticky notes.</li>
                  <li>Inconsistent messaging across email and direct communication.</li>
                  <li>Manual tracking of invoicing, rent collection, and maintenance issues.</li>
                  <li>Inability to quickly generate reports for owners and tax purposes.</li>
                </ul>
                <p className="mt-6">
                  These inefficiencies created significant administrative overhead and limited the agency’s ability to grow without hiring more support staff.
                </p>
              </div>
            </section>

            {/* The Solution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">03.</span> The Solution
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400 mb-12">
                <p>
                  A unified platform was architected that brought together all operational data, client interactions, and financial tracking. By developing custom micro-apps tailored to their specific workflows, the need for manual data entry and multiple disjointed tools was eliminated.
                </p>
                <p>
                  The core of the new Property Management System included modules for Property Management, Finance, Leads, and Maintenance.
                </p>
              </div>

              {/* Architecture Diagram */}
              <SystemArchitectureFlow />

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Centralized Property Operations</h3>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1">
                    <li>Tenant and lease management</li>
                    <li>Property portfolio tracking</li>
                    <li>Occupancy reporting</li>
                    <li>Maintenance request management</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Financial Automation</h3>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1">
                    <li>Automated rent tracking</li>
                    <li>Invoice generation</li>
                    <li>Payment reconciliation</li>
                    <li>Cashflow/financial reporting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp Invoice Automation</h3>
                  <p className="text-slate-400">
                    To improve tenant communication and reduce administrative effort, Twilio-powered WhatsApp messaging was integrated, allowing invoices and payment reminders to be sent automatically.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Migration Engine */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">04.</span> Data Migration Engine
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  One of the biggest challenges was migrating years of spreadsheet data into the new platform.
                </p>
                <p>
                  To solve this, a data migration pipeline was built that handled bulk data ingestion directly into the database while maintaining data integrity.
                </p>
                <p>
                  This automated the onboarding process to transition to the new management system.
                </p>
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">05.</span> Results
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                The implementation yielded immediate operational improvements across the business:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">60% Reduction in Admin Time</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Tasks that previously required manual spreadsheet updates, calculation verifications and reconciliation are completely automated.
                  </p>
                </div>
                
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Improved Financial Accuracy</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Automated calculations and rent roll record-keeping eliminated manual accounting errors and reduced financial discrepancies.
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Faster Tenant Communication</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Automated WhatsApp and email messaging reduced response times and improved tenant satisfaction and compliance.
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Scalable Business Foundation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    The system now provides the business with the technical foundation to support their ambitious growth trajectory and handle a higher volume of transactions without hiring more staff proportionately.
                  </p>
                </div>
              </div>
            </section>

            {/* Role */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">06.</span> Role
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-white">Full-Stack Engineering</h3>
                  <p className="text-slate-400 mt-1">Designed and developed the entire platform, including the desktop application, backend services, database architecture, integrations, and cloud deployment.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white">Business Process Analysis</h3>
                  <p className="text-slate-400 mt-1">Conducted workflows audit and translated operational challenges into practical software solutions.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white">Systems Architecture</h3>
                  <p className="text-slate-400 mt-1">Designed a scalable, modular architecture capable of supporting long-term business growth and future feature expansion.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white">DevOps & Deployment</h3>
                  <p className="text-slate-400 mt-1">Managed infrastructure, deployment pipelines, database hosting, backups, and production environments on DigitalOcean.</p>
                </div>
              </div>
            </section>

            {/* Business Impact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-500 font-mono text-sm">07.</span> Business Impact
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                <p>
                  The Property Management System transformed Standout Management from a spreadsheet-driven operation into a scalable, data-driven business.
                </p>
                <p>
                  By automating critical workflows and centralizing operational data, the agency was able to reduce administrative overhead, improve financial visibility, and establish a technology foundation capable of supporting future growth.
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
