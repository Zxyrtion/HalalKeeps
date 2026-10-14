import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Store, 
  ShieldCheck, 
  FileCheck2, 
  HelpCircle,
  AlertTriangle,
  Award
} from 'lucide-react';
import { ScoreCalculation, AssessmentAnswers } from '../types/assessment';

interface SidebarProps {
  currentStep: 'assessment' | 'review' | 'results';
  onStepChange: (step: 'assessment' | 'review' | 'results') => void;
  answeredCount: number;
  totalQuestions: number;
  score: ScoreCalculation;
  hasSubmitted: boolean;
  businessName: string;
  businessType: string;
  assessmentName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  onStepChange,
  answeredCount,
  totalQuestions,
  score,
  hasSubmitted,
  businessName,
  businessType,
  assessmentName,
}) => {
  const isComplete = answeredCount === totalQuestions;

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
      {/* Business Profile Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Store className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-neutral-900 truncate" title={businessName}>
              {businessName}
            </h3>
            <p className="text-xs text-neutral-500 truncate" title={businessType}>
              {businessType}
            </p>
            <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Program</span>
              <span className="font-semibold text-emerald-800">{assessmentName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Navigation & Progress */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Assessment Status
          </h4>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            hasSubmitted 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : isComplete 
              ? 'bg-blue-50 text-blue-800 border border-blue-200' 
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {hasSubmitted ? 'Submitted' : isComplete ? 'Ready for Review' : 'In Progress'}
          </span>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-neutral-700">Questionnaire Progress</span>
            <span className="text-emerald-900 font-mono font-semibold">
              {answeredCount} of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden border border-neutral-200/60">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Vertical Step Links */}
        <div className="space-y-1.5 pt-2 border-t border-neutral-100">
          <button
            onClick={() => onStepChange('assessment')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
              currentStep === 'assessment'
                ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200/80 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 'assessment' ? 'bg-emerald-900 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                1
              </span>
              <span>Questionnaire</span>
            </span>
            {isComplete && <CheckCircle className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            onClick={() => onStepChange('review')}
            disabled={answeredCount === 0}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
              currentStep === 'review'
                ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200/80 shadow-2xs'
                : answeredCount > 0
                ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                : 'text-neutral-300 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 'review' ? 'bg-emerald-900 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                2
              </span>
              <span>Review & Submit</span>
            </span>
            {!isComplete && answeredCount > 0 && (
              <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Pending
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (hasSubmitted) onStepChange('results');
            }}
            disabled={!hasSubmitted}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
              currentStep === 'results'
                ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200/80 shadow-2xs'
                : hasSubmitted
                ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                : 'text-neutral-300 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                currentStep === 'results' ? 'bg-emerald-900 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                3
              </span>
              <span>Results & Insights</span>
            </span>
            {hasSubmitted && (
              <span className="font-mono text-[11px] font-bold text-emerald-800">
                {score.formattedPercentage}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Snapshot Card if submitted */}
      {hasSubmitted && (
        <div className="bg-emerald-900 text-white rounded-xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-800/40 pointer-events-none" />
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-2">
            <Award className="w-4 h-4" />
            <span>Latest Calculation</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
              {score.formattedPercentage}
            </span>
            <span className="text-xs text-emerald-200 font-medium">
              Readiness Score
            </span>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed mt-2">
            Status: <span className="font-semibold text-white">{score.status}</span>
          </p>
          <div className="mt-3 pt-3 border-t border-emerald-800/80 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div>
              <div className="font-mono font-bold text-emerald-200">{score.yesCount}</div>
              <div className="text-emerald-300/80 text-[10px]">Yes</div>
            </div>
            <div>
              <div className="font-mono font-bold text-rose-300">{score.noCount}</div>
              <div className="text-emerald-300/80 text-[10px]">No</div>
            </div>
            <div>
              <div className="font-mono font-bold text-neutral-300">{score.naCount}</div>
              <div className="text-emerald-300/80 text-[10px]">N/A</div>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Info Card */}
      <div className="bg-neutral-100/80 rounded-xl p-4 text-xs text-neutral-600 border border-neutral-200/70">
        <div className="flex items-center gap-1.5 font-semibold text-neutral-800 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>HaCeRa Standard</span>
        </div>
        <p className="text-[11px] leading-relaxed text-neutral-500">
          The Halal Readiness Check helps identify gaps against fundamental Halal Assurance System requirements before formal third-party audit filing.
        </p>
      </div>
    </aside>
  );
};
