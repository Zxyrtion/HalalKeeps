import React from 'react';
import { 
  ScoreCalculation, 
  AiInsights, 
  AssessmentAnswers,
  PublishStatus 
} from '../types/assessment';
import { AiInsightsSection } from './AiInsightsSection';
import { PublishControlCard } from './PublishControlCard';
import { 
  ArrowUpRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  AlertTriangle, 
  Building2, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Printer, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Globe
} from 'lucide-react';

interface ResultsScreenProps {
  score: ScoreCalculation;
  insights: AiInsights;
  answers: AssessmentAnswers;
  onImproveReadiness: () => void;
  onReviewQuestion: (questionId: string) => void;
  businessName: string;
  businessType: string;
  assessmentName: string;
  submissionDate: string;
  publishStatus: PublishStatus;
  onPublish: () => void;
  onUnpublish: () => void;
  onPreviewPublicProfile: () => void;
  onNavigateToCustomerDirectory: () => void;
  onOpenReportModal?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  insights,
  answers,
  onImproveReadiness,
  onReviewQuestion,
  businessName,
  businessType,
  assessmentName,
  submissionDate,
  publishStatus,
  onPublish,
  onUnpublish,
  onPreviewPublicProfile,
  onNavigateToCustomerDirectory,
  onOpenReportModal,
}) => {
  // SVG Circular Gauge calculations
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const percentage = score.percentage ?? 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Assessment Completed & Evaluated
              </span>
              <span className="text-neutral-400 text-xs">·</span>
              <span className="text-xs font-mono text-neutral-500">
                Submitted {submissionDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Readiness Results Dashboard
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Live calculated readiness metrics, audit gap diagnostics, and prioritized remediation actions for {businessName}.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            {onOpenReportModal && (
              <button
                type="button"
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 transition-colors shadow-2xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-neutral-500" />
                <span>Print Report</span>
              </button>
            )}

            {/* Screen 5 Primary Re-entry Button */}
            <button
              type="button"
              onClick={onImproveReadiness}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 transition-colors shadow-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
              <span>Improve My Readiness</span>
            </button>
          </div>
        </div>

        {/* Business Context Row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Business Name</span>
            <span className="font-bold text-neutral-900 text-sm mt-0.5 block truncate">
              {businessName}
            </span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Facility Type</span>
            <span className="font-semibold text-neutral-800 text-sm mt-0.5 block truncate">
              {businessType}
            </span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Audit Standard</span>
            <span className="font-semibold text-emerald-800 text-sm mt-0.5 block truncate">
              {assessmentName}
            </span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Directory Status</span>
            <span className={`font-bold text-sm mt-0.5 block flex items-center gap-1.5 ${
              publishStatus === 'Published' ? 'text-emerald-700' : 'text-neutral-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                publishStatus === 'Published' ? 'bg-emerald-600' : 'bg-neutral-400'
              }`}></span>
              {publishStatus === 'Published' ? 'Published' : publishStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ADDITIONAL FEATURE: Publish My Readiness Score Card */}
      <PublishControlCard
        score={score}
        publishStatus={publishStatus}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        onPreviewPublicProfile={onPreviewPublicProfile}
        onNavigateToCustomerDirectory={onNavigateToCustomerDirectory}
        businessName={businessName}
        businessType={businessType}
      />

      {/* Hero Circular Score Visualization Card - STRONGEST VISUAL ELEMENT */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Circular Readiness Gauge */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg 
                className="w-full h-full transform -rotate-90 drop-shadow-sm"
                viewBox="0 0 250 250"
              >
                {/* Background Ring */}
                <circle
                  cx="125"
                  cy="125"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="20"
                  fill="transparent"
                  className="transition-all duration-500"
                />

                {/* Animated Value Arc */}
                <circle
                  cx="125"
                  cy="125"
                  r={radius}
                  stroke={score.statusColor.strokeColor}
                  strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease',
                  }}
                />
              </svg>

              {/* Inside Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Readiness Score
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-neutral-900 mt-1">
                  {score.formattedPercentage}
                </span>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${score.statusColor.badgeBg}`}>
                    {score.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-2 text-[11px] text-neutral-400 text-center font-mono">
              Formula: ({score.yesCount} Yes ÷ {score.applicableCount} Applicable) × 100
            </p>
          </div>

          {/* Metric Breakdown & Diagnostic Summary */}
          <div className="flex-1 w-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  HaCeRa Readiness Evaluation
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-tight">
                {score.status === 'High Readiness'
                  ? 'Excellent Preparedness — On Track for Halal Certification'
                  : score.status === 'Nearly Ready'
                  ? 'Nearly Ready — Minor Remediation Required'
                  : score.status === 'Developing Readiness'
                  ? 'Developing Readiness — Action Plan In Progress'
                  : 'Needs Improvement — Critical Compliance Gaps Detected'}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {score.percentage !== null && score.percentage >= 90
                  ? 'Your responses confirm that primary operational standards (HAS Manual, competent kitchen personnel, and certification pathway) are in order.'
                  : 'Your assessment identifies specific requirements currently marked as "No". Resolving these compliance gaps will raise your readiness score.'}
              </p>
            </div>

            {/* Answer Counts Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-700 text-xs font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Yes Answers</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-900">
                  {score.yesCount}
                </div>
                <div className="text-[11px] text-emerald-700/80 font-medium mt-0.5">
                  1 pt per response
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 text-center">
                <div className="flex items-center justify-center gap-1.5 text-rose-700 text-xs font-semibold mb-1">
                  <XCircle className="w-4 h-4" />
                  <span>No (Gaps)</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-rose-900">
                  {score.noCount}
                </div>
                <div className="text-[11px] text-rose-700/80 font-medium mt-0.5">
                  0 pts (Requires Action)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-100/80 border border-neutral-200/80 text-center">
                <div className="flex items-center justify-center gap-1.5 text-neutral-600 text-xs font-semibold mb-1">
                  <MinusCircle className="w-4 h-4" />
                  <span>N/A Excluded</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-neutral-800">
                  {score.naCount}
                </div>
                <div className="text-[11px] text-neutral-500 font-medium mt-0.5">
                  Excluded from divisor
                </div>
              </div>
            </div>

            {/* Improvement CTA Banner */}
            <div className="p-4 rounded-xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-300" />
                  Ready to update your answers?
                </h4>
                <p className="text-xs text-emerald-100/80 mt-0.5">
                  Modify answers to reflect implemented SOPs or staffing updates, then resubmit for instant recalculation.
                </p>
              </div>
              <button
                type="button"
                onClick={onImproveReadiness}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-50 active:bg-neutral-100 transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                <span>Improve My Readiness</span>
                <ChevronRight className="w-4 h-4 text-emerald-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory & Demo Disclaimer */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-start gap-3 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-neutral-700 font-semibold">Regulatory Disclaimer: </strong>
            These readiness indicators and score calculations are for demonstration purposes only and are not official halal certification ratings. A 100% readiness score demonstrates strong preliminary self-audit compliance but does not mean the establishment has been officially halal-certified. Actual compliance and official certification require appropriate on-site audits, document verification, and formal approval by the recognized Islamic Halal authority in your jurisdiction.
          </p>
        </div>
      </div>

      {/* Screen 4: AI Readiness Insights Section immediately below */}
      <AiInsightsSection
        insights={insights}
        onReviewQuestion={onReviewQuestion}
        readinessPercentage={score.formattedPercentage}
      />
    </div>
  );
};
