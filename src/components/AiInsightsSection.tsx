import React from 'react';
import { 
  AiInsights, 
  ComplianceGap, 
  CorrectiveAction, 
  EvidenceRecommendation 
} from '../types/assessment';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Lightbulb, 
  ClipboardCheck, 
  FileCheck2 
} from 'lucide-react';

interface AiInsightsSectionProps {
  insights: AiInsights;
  onReviewQuestion: (questionId: string) => void;
  readinessPercentage: string;
}

export const AiInsightsSection: React.FC<AiInsightsSectionProps> = ({
  insights,
  onReviewQuestion,
  readinessPercentage,
}) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <span>AI Readiness Insights</span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Personalized
              </span>
            </h2>
            <p className="text-xs text-neutral-500">
              Deterministic, answer-grounded compliance diagnostics and corrective roadmap.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Card A: AI Readiness Summary */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Card A · Readiness Summary
                </span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs font-semibold text-neutral-700">
                  {insights.scoreStatusText}
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 mt-1">
                Executive Halal Preparedness Assessment
              </h3>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                {insights.summary}
              </p>
              <div className="mt-3 text-xs text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Calculated against HaCeRa Standard guidelines for restaurant operations.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card B: Compliance Gap Analysis */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Card B · Compliance Gap Analysis
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  Identified Non-Compliant Areas ({insights.gaps.length})
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-neutral-100 text-neutral-700">
              {insights.gaps.length === 0 ? '0 Gaps' : `${insights.gaps.length} Actionable`}
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {insights.gaps.length === 0 ? (
              <div className="p-6 rounded-lg bg-emerald-50/70 border border-emerald-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-950">
                  No Compliance Gaps Detected
                </h4>
                <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                  All baseline assessment questions received positive answers. No immediate &quot;No&quot; gaps were identified in this screening tier.
                </p>
              </div>
            ) : (
              insights.gaps.map((gap) => (
                <div
                  key={gap.questionId}
                  className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 hover:border-neutral-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-900">
                        {gap.priority}
                      </span>
                      <span className="text-xs font-semibold text-neutral-600">
                        Question {gap.questionNumber} · Current Answer:{' '}
                        <span className="font-bold text-rose-700">{gap.currentAnswer}</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {gap.requirement}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {gap.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onReviewQuestion(gap.questionId)}
                    className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-md transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Review Answer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card C: Corrective Action Plan */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Card C · Corrective Action Plan
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  Practical Steps to Reach Certification Readiness
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-neutral-100 text-neutral-700">
              {insights.actions.length} Action Items
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {insights.actions.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-lg bg-neutral-50/70 border border-neutral-200/80 hover:border-neutral-300 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      act.priority === 'High Priority'
                        ? 'bg-rose-100 text-rose-900'
                        : act.priority === 'Medium Priority'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {act.priority}
                    </span>
                    <span className="text-xs font-semibold text-neutral-700">
                      Target Area
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {act.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {act.explanation}
                  </p>
                  <div className="mt-2 p-2.5 rounded bg-white border border-neutral-200 text-xs">
                    <span className="font-bold text-emerald-900">Practical Next Step: </span>
                    <span className="text-neutral-700">{act.nextStep}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReviewQuestion(act.questionId)}
                  className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-md transition-colors shadow-2xs cursor-pointer"
                >
                  <span>Review Answer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Card D: Evidence Recommendations */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Card D · Evidence Recommendations
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  Audit Verification Records & Documentation
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-neutral-100 text-neutral-700">
              {insights.evidence.length} Records
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {insights.evidence.map((evi) => (
              <div
                key={evi.id}
                className="p-4 rounded-lg bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-colors flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700 font-semibold">
                      {evi.documentType}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      evi.priority === 'Required'
                        ? 'bg-rose-100 text-rose-800'
                        : evi.priority === 'Recommended'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {evi.priority}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                    {evi.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {evi.explanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onReviewQuestion(evi.questionId)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                  >
                    <span>Review Answer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
