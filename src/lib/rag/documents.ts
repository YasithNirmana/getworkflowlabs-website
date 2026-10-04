export interface DocChunk {
  id: string;
  title: string;
  text: string;
}

export interface RagDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  chunks: DocChunk[];
  sampleQuestions: string[];
}

export const RAG_DOCUMENTS: RagDocument[] = [
  {
    id: 'remote-work-policy',
    title: 'Remote Work & Expense Policy',
    category: 'HR Policy',
    description: 'Northwind Consulting — internal policy on remote work eligibility, equipment, and expenses.',
    chunks: [
      {
        id: 'rwp-1',
        title: 'Eligibility & Overview',
        text: 'Remote work is available to full-time employees who have completed their 90-day probationary period. Employees may choose a hybrid arrangement (minimum 2 days in-office per week) or fully remote work, subject to written manager approval. Contractors and interns are not eligible under this policy.',
      },
      {
        id: 'rwp-2',
        title: 'Work Hours & Availability',
        text: 'Remote employees must be reachable during core hours of 10:00 AM to 3:00 PM in their local time zone, primarily via Slack. Outside of core hours, employees have flexibility to structure their day as needed, provided deliverables and meeting commitments are met. Employees working across time zones should coordinate overlap hours with their team lead.',
      },
      {
        id: 'rwp-3',
        title: 'Home Office Equipment',
        text: 'The company provides a one-time $500 stipend for home office equipment such as a desk, chair, or monitor. Receipts must be submitted through the expense portal within 30 days of purchase. Employees who leave the company within 12 months of receiving the stipend may be required to return the equipment or reimburse a prorated amount.',
      },
      {
        id: 'rwp-4',
        title: 'Expense Reimbursement',
        text: 'Home internet costs are reimbursed up to $50 per month upon submission of a monthly expense report. Reimbursements are typically processed within two pay cycles. Mobile phone reimbursement is available only for roles requiring frequent client calls, subject to manager sign-off.',
      },
      {
        id: 'rwp-5',
        title: 'Security Requirements',
        text: 'All remote employees must connect to company systems using the corporate VPN and a company-issued laptop. Connecting to internal systems over public Wi-Fi without VPN is strictly prohibited. Employees must complete annual security awareness training, and devices are subject to periodic compliance checks by IT.',
      },
      {
        id: 'rwp-6',
        title: 'Policy Review & Termination of Privileges',
        text: 'Remote work privileges may be revoked at management discretion in cases of performance concerns or policy violations. This policy is reviewed annually by HR, and employees will be notified at least 30 days in advance of any material changes.',
      },
    ],
    sampleQuestions: [
      'How much is the home office equipment stipend?',
      'What are the core working hours for remote employees?',
      'Is a VPN required to access company systems remotely?',
    ],
  },
  {
    id: 'taskflow-manual',
    title: 'TaskFlow Pro — User Manual',
    category: 'Product Manual',
    description: 'Setup guide and reference manual for the TaskFlow Pro project management software.',
    chunks: [
      {
        id: 'tfp-1',
        title: 'Getting Started',
        text: 'To get started with TaskFlow Pro, sign up for an account and create your first workspace. You can invite team members by email from the Workspace Settings page. New accounts include a 14-day free trial of the Pro plan with no credit card required.',
      },
      {
        id: 'tfp-2',
        title: 'Creating Projects & Tasks',
        text: 'Projects are created from the sidebar using the "New Project" button. Within a project, tasks can be assigned to team members, given due dates, and tagged with a priority level of Low, Medium, High, or Urgent. Tasks can also be organized into custom boards or lists depending on team preference.',
      },
      {
        id: 'tfp-3',
        title: 'Automations',
        text: 'TaskFlow Pro supports trigger-based automations, such as automatically notifying a task assignee\'s manager when a task status changes to "Done", or auto-assigning new tasks based on workload. The Pro plan allows up to 20 active automations per workspace; the Enterprise plan removes this limit.',
      },
      {
        id: 'tfp-4',
        title: 'Integrations',
        text: 'TaskFlow Pro integrates with Slack, Google Calendar, GitHub, and Zapier. Integrations are configured from Settings > Integrations, where each connection can be authorized individually. Webhook support is available on the Enterprise plan for custom integrations.',
      },
      {
        id: 'tfp-5',
        title: 'Reporting & Dashboards',
        text: 'Reporting features include burndown charts, time tracking summaries, and workload dashboards. Reports can be exported to CSV or PDF for sharing outside the platform. Advanced reporting and custom dashboards are available on Pro and Enterprise plans only.',
      },
      {
        id: 'tfp-6',
        title: 'Troubleshooting & Support',
        text: 'Common sync issues can usually be resolved by refreshing the workspace or reauthorizing the affected integration. Support is available via in-app chat, with a response time SLA of 24 hours for Pro customers and 4 hours for Enterprise customers.',
      },
    ],
    sampleQuestions: [
      'How many automations can I set up on the Pro plan?',
      'What integrations does TaskFlow Pro support?',
      'What is the support response time SLA for Enterprise customers?',
    ],
  },
  {
    id: 'horizon-financial-report',
    title: 'Horizon Retail Co. — Q3 2025 Financial Report',
    category: 'Financial Report',
    description: 'Summary of Horizon Retail Co.\'s Q3 2025 financial performance and outlook.',
    chunks: [
      {
        id: 'hrc-1',
        title: 'Revenue Overview',
        text: 'Horizon Retail Co. reported total revenue of $48.2 million for Q3 2025, an increase of 12% year-over-year. Growth was primarily driven by continued expansion of the e-commerce channel and stronger-than-expected holiday season pre-orders.',
      },
      {
        id: 'hrc-2',
        title: 'Segment Performance',
        text: 'The online segment generated $29 million in revenue, up 22% year-over-year, while the in-store segment generated $19.2 million, roughly flat compared to the prior year. The Northeast region posted the strongest growth of any region, at 18% year-over-year.',
      },
      {
        id: 'hrc-3',
        title: 'Operating Expenses',
        text: 'Total operating expenses were $31 million for the quarter. Marketing spend increased 18% due to early investment in holiday campaign preparation, while logistics costs rose 9%, largely attributable to higher fuel prices affecting last-mile delivery.',
      },
      {
        id: 'hrc-4',
        title: 'Profitability',
        text: 'Net income for the quarter was $6.1 million, representing a net margin of 12.6%, up from 10.9% in the same quarter last year. The improvement in margin was attributed to better inventory management and reduced discounting compared to the prior year.',
      },
      {
        id: 'hrc-5',
        title: 'Outlook & Guidance',
        text: 'Management issued Q4 2025 revenue guidance of $61 million to $64 million. The company plans to open 5 new store locations and continue investing in fulfillment center capacity to support online order growth.',
      },
      {
        id: 'hrc-6',
        title: 'Risks',
        text: 'The report highlights several risks for the upcoming quarter, including supply chain disruption risk from overseas suppliers, increasing competitive pressure from discount retailers, and exposure to currency fluctuations affecting imported goods.',
      },
    ],
    sampleQuestions: [
      "What was Horizon Retail's total revenue in Q3 2025?",
      'How did the online segment perform compared to in-store?',
      'What risks does the company highlight for the upcoming quarter?',
    ],
  },
];

export function getDocumentById(id: string): RagDocument | undefined {
  return RAG_DOCUMENTS.find((doc) => doc.id === id);
}
