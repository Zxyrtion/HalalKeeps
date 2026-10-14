import React from 'react';
import { 
  ASSESSMENT_QUESTIONS, 
  AssessmentAnswers, 
  AnswerValue 
} from '../types/assessment';
import { QuestionCard } from './QuestionCard';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  ShieldCheck,
  RefreshCw 
} from 'lucide-react';

interface AssessmentScreenProps {
  answers: AssessmentAnswers;
  onSelectAnswer: (questionId: string, answer: AnswerValue) => void;
  onNavigateToReview: () => void;
  highlightedQuestionId: string | null;
  businessName: string;
  businessType: string;
  assessmentName: string;
  onResetToDemo: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  answers,
  onSelectAnswer,
  onNavigateToReview,
  highlightedQuestionId,
  businessName,
  businessType,
  assessmentName,
  onResetToDemo,
}) => {
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                {assessmentName}
              </span>
              <span className="text-neutral-400 text-xs select-none">·</span>
              <span className="text-xs font-medium text-neutral-500">
                Food Business Owner Self-Audit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Halal Readiness Assessment
            </h1>
            <p className="mt-1 text-sm sm:text-base text-neutral-600">
              Evaluate your restaurant&apos;s halal readiness and discover what you need to improve.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetToDemo}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            title="Reset to hackathon baseline answers"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Reset Demo Answers</span>
          </button>
        </div>

        {/* Business Context Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs">
          <div className="p-3 bg-neutral-50/80 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Business Name</span>
            <span className="font-bold text-neutral-900 text-sm mt-0.5 block truncate">
              {businessName}
            </span>
          </div>
          <div className="p-3 bg-neutral-50/80 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Business Type</span>
            <span className="font-semibold text-neutral-800 text-sm mt-0.5 block truncate">
              {businessType}
            </span>
          </div>
          <div className="p-3 bg-neutral-50/80 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Progress</span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="font-bold font-mono text-emerald-800 text-sm">
                {answeredCount} of {totalQuestions} answered
              </span>
              {isAllAnswered ? (
                <span className="text-emerald-700 inline-flex items-center gap-1 text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              ) : (
                <span className="text-amber-700 inline-flex items-center gap-1 text-[11px] font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> {totalQuestions - answeredCount} remaining
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {ASSESSMENT_QUESTIONS.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selectedAnswer={answers[q.id]}
            onSelectAnswer={onSelectAnswer}
            isHighlighted={highlightedQuestionId === q.id}
          />
        ))}
      </div>

      {/* Bottom Sticky/Inline Action Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            isAllAnswered ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
          }`}>
            {isAllAnswered ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            ) : (
              <span className="font-mono text-xs font-bold">{answeredCount}/{totalQuestions}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">
              {isAllAnswered 
                ? 'All questions completed' 
                : `${totalQuestions - answeredCount} question${totalQuestions - answeredCount > 1 ? 's' : ''} left to complete`}
            </p>
            <p className="text-xs text-neutral-500">
              {isAllAnswered 
                ? 'Proceed to review your answers before submitting for readiness calculation.'
                : 'Select an option (Yes, No, or N/A) for each question to proceed.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToReview}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 transition-colors shadow-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <span>Review Answers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
