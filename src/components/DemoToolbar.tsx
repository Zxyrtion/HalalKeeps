import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck, 
  Globe, 
  Store,
  Eye,
  EyeOff
} from 'lucide-react';
import { ScoreCalculation, PublishStatus } from '../types/assessment';

interface DemoToolbarProps {
  onLoadInitialState: () => void;
  onLoadHighReadinessState: () => void;
  onClearAnswers: () => void;
  score: ScoreCalculation;
  currentStep: 'assessment' | 'review' | 'results';
  publishStatus: PublishStatus;
  onTogglePublish: () => void;
  activeView: 'business' | 'directory';
  onToggleView: () => void;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  onLoadInitialState,
  onLoadHighReadinessState,
  onClearAnswers,
  score,
  currentStep,
  publishStatus,
  onTogglePublish,
  activeView,
  onToggleView,
}) => {
  const isPublished = publishStatus === 'Published';

  return (
    <div className="w-full bg-emerald-950 text-white border-b border-emerald-900 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-emerald-200">Hackathon Evaluator Strip:</span>
          <span className="text-neutral-300">
            Score: <strong className="font-mono text-white">{score.formattedPercentage}</strong>
          </span>
          <span className="text-emerald-800">·</span>
          <span className="text-neutral-300 flex items-center gap-1">
            Status:
            <span className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
              isPublished 
                ? 'bg-emerald-800 text-emerald-100 border border-emerald-600' 
                : 'bg-neutral-800 text-neutral-400'
            }`}>
              {publishStatus}
            </span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Publish Toggle */}
          <button
            type="button"
            onClick={onTogglePublish}
            className={`px-2.5 py-1 rounded font-medium transition-colors border flex items-center gap-1 cursor-pointer text-[11px] ${
              isPublished
                ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-rose-800/60'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-600/60'
            }`}
            title="Toggle whether Green Crescent Restaurant is published in Customer Directory"
          >
            {isPublished ? <EyeOff className="w-3 h-3 text-rose-300" /> : <Eye className="w-3 h-3 text-emerald-300" />}
            <span>{isPublished ? 'Unpublish from Directory' : 'Publish to Directory'}</span>
          </button>

          {/* Quick View Switcher */}
          <button
            type="button"
            onClick={onToggleView}
            className="px-2.5 py-1 rounded bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 font-medium transition-colors border border-neutral-700/60 flex items-center gap-1 cursor-pointer text-[11px]"
          >
            {activeView === 'business' ? <Globe className="w-3 h-3 text-emerald-400" /> : <Store className="w-3 h-3 text-emerald-400" />}
            <span>{activeView === 'business' ? 'Go to Customer Directory' : 'Go to Business Portal'}</span>
          </button>

          <span className="text-emerald-800 hidden sm:inline">|</span>

          {/* Preset 1 (33.3% initial gaps) */}
          <button
            type="button"
            onClick={onLoadInitialState}
            className="px-2 py-1 rounded bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-medium transition-colors border border-emerald-700/60 flex items-center gap-1 cursor-pointer text-[11px]"
            title="Preset 1: Initial Gaps (33.3%)"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Preset 1 (33%)</span>
          </button>

          {/* Preset 2 (100% high readiness) */}
          <button
            type="button"
            onClick={onLoadHighReadinessState}
            className="px-2 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition-colors border border-emerald-600/60 flex items-center gap-1 cursor-pointer text-[11px]"
            title="Preset 2: High Readiness (100%)"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-300" />
            <span>Preset 2 (100%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
