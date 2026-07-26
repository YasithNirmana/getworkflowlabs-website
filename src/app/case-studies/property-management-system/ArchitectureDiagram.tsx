"use client";

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Edge,
  Node,
  Position,
  Handle,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import icons
import {
  Users, Building, CreditCard,
  Settings, DollarSign, Wrench,
  FileText, MessageSquare, LineChart,
  CheckCircle2, TrendingUp, Zap, Server
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Node Definition
const CustomNode = ({ data, isConnectable }: any) => {
  const Icon = data.icon;

  const typeStyles: Record<string, string> = {
    input: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    system: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    output: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    outcome: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  return (
    <div className={cn(
      "px-4 py-3 rounded-xl border backdrop-blur-md min-w-[160px] transition-all hover:scale-105 shadow-xl",
      "flex flex-col items-center justify-center gap-2",
      typeStyles[data.nodeType as string] || "border-border bg-slate-800 text-white"
    )}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="!opacity-0" />

      {Icon && <Icon className="w-5 h-5 mb-1 opacity-80" />}
      <div className="font-medium text-sm text-center text-white">{data.label}</div>
      {data.description && (
        <div className="text-[10px] text-slate-400 text-center max-w-[120px] leading-tight">
          {data.description}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="!opacity-0" />
    </div>
  );
};

const initialNodes: Node[] = [
  // Inputs
  { id: 'in-1', type: 'customNode', position: { x: 50, y: 50 }, data: { label: 'Tenant Data', icon: Users, nodeType: 'input' } },
  { id: 'in-2', type: 'customNode', position: { x: 250, y: 50 }, data: { label: 'Property Records', icon: Building, nodeType: 'input' } },
  { id: 'in-3', type: 'customNode', position: { x: 450, y: 50 }, data: { label: 'Payments', icon: CreditCard, nodeType: 'input' } },

  // Central System
  { id: 'sys-main', type: 'customNode', position: { x: 214, y: 190 }, data: { label: 'Property Management System', icon: Server, nodeType: 'system', description: 'Centralized Hub' } },

  // Modules
  { id: 'sys-ops', type: 'customNode', position: { x: 50, y: 360 }, data: { label: 'Operations', icon: Settings, nodeType: 'system' } },
  { id: 'sys-fin', type: 'customNode', position: { x: 250, y: 360 }, data: { label: 'Financials', icon: DollarSign, nodeType: 'system' } },
  { id: 'sys-maint', type: 'customNode', position: { x: 450, y: 360 }, data: { label: 'Maintenance', icon: Wrench, nodeType: 'system' } },

  // Outputs
  { id: 'out-1', type: 'customNode', position: { x: 46, y: 490 }, data: { label: 'Automated Invoicing', icon: FileText, nodeType: 'output' } },
  { id: 'out-2', type: 'customNode', position: { x: 243, y: 490 }, data: { label: 'WhatsApp Reminders', icon: MessageSquare, nodeType: 'output' } },
  { id: 'out-3', type: 'customNode', position: { x: 446, y: 490 }, data: { label: 'Real-Time Reporting', icon: LineChart, nodeType: 'output' } },

  // Outcomes
  { id: 'res-1', type: 'customNode', position: { x: -50, y: 630 }, data: { label: '90% Less Admin Work', icon: TrendingUp, nodeType: 'outcome' } },
  { id: 'res-2', type: 'customNode', position: { x: 150, y: 630 }, data: { label: 'Faster Tenant Comms', icon: Zap, nodeType: 'outcome' } },
  { id: 'res-3', type: 'customNode', position: { x: 350, y: 630 }, data: { label: 'Accurate Finances', icon: CheckCircle2, nodeType: 'outcome' } },
  { id: 'res-4', type: 'customNode', position: { x: 550, y: 630 }, data: { label: 'Scalable Operations', icon: Building, nodeType: 'outcome' } },
];

const edgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#888', strokeWidth: 2, opacity: 0.5 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#888',
  },
};

const initialEdges: Edge[] = [
  // Inputs to Main System
  { id: 'e-in1-main', source: 'in-1', target: 'sys-main', ...edgeOptions },
  { id: 'e-in2-main', source: 'in-2', target: 'sys-main', ...edgeOptions },
  { id: 'e-in3-main', source: 'in-3', target: 'sys-main', ...edgeOptions },

  // Main to Modules
  { id: 'e-main-ops', source: 'sys-main', target: 'sys-ops', ...edgeOptions },
  { id: 'e-main-fin', source: 'sys-main', target: 'sys-fin', ...edgeOptions },
  { id: 'e-main-maint', source: 'sys-main', target: 'sys-maint', ...edgeOptions },

  // Modules to Outputs
  { id: 'e-ops-out1', source: 'sys-ops', target: 'out-1', ...edgeOptions },
  { id: 'e-fin-out2', source: 'sys-fin', target: 'out-2', ...edgeOptions },
  { id: 'e-maint-out3', source: 'sys-maint', target: 'out-3', ...edgeOptions },
  { id: 'e-ops-out2', source: 'sys-ops', target: 'out-2', ...edgeOptions },

  // Outputs to Outcomes
  { id: 'e-out1-res1', source: 'out-1', target: 'res-1', ...edgeOptions },
  { id: 'e-out2-res2', source: 'out-2', target: 'res-2', ...edgeOptions },
  { id: 'e-out3-res3', source: 'out-3', target: 'res-3', ...edgeOptions },
  { id: 'e-out1-res4', source: 'out-1', target: 'res-4', ...edgeOptions },
  { id: 'e-out3-res4', source: 'out-3', target: 'res-4', ...edgeOptions },
];

export function SystemArchitectureFlow() {
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  return (
    <div className="w-full h-[650px] rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden relative my-8">
      <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-mono font-semibold text-slate-400 bg-slate-800/80 backdrop-blur rounded-full border border-slate-700">
        Architecture Diagram
      </div>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        elementsSelectable={false}
        preventScrolling={false}
      >
        <Background color="#555" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
