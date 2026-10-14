import React, { useState } from 'react';
import { 
  ASSESSMENT_QUESTIONS, 
  AssessmentAnswers, 
  AnswerValue 
} from '../types/assessment';
import { 
  ArrowLeft, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Building2, 
  Edit3, 
  ShieldAlert,
  Loader2,
  Check,
  X,
  Minus
} from 'lucide-react';

interface ReviewScreenProps {
  answers: AssessmentAnswers;
  onEditAnswers: (questionId?: string) => void;
  onSubmitAssessment: () => void;
  businessName: string;
  businessType: string;
  assessmentName: string;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  answers,
  onEditAnswers,
  onSubmitAssessment,
  businessName,
  businessType,
  assessmentName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Validation
  const unansweredQuestions = ASSESSMENT_QUESTIONS.filter(
    (q) => !answers[q.id]
  );
  const isValid = unansweredQuestions.length === 0;

  const handleSubmit = () => {
    if (!isValid) return;

    setIsSubmitting(true);
    // Brief professional confirmation sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setTimeout(() => {
        onSubmitAssessment();
      }, 700);
    }, 600);
  };

  const getAnswerBadge = (val: AnswerValue | undefined) => {
    if (!val) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          Unanswered
        </span>
      );
    }
    if (val === 'Yes') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
          Yes (Compliant)
        </span>
      );
    }
    if (val === 'No') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
          <X className="w-3.5 h-3.5 text-rose-700 stroke-[3]" />
          No (Compliance Gap)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300">
        <Minus className="w-3.5 h-3.5 text-neutral-600 stroke-[3]" />
        N/A (Excluded)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                Step 2 of 3
              </span>
              <span className="text-neutral-400 text-xs">·</span>
              <span className="text-xs font-medium text-neutral-500">
                Pre-Submission Verification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Review and Submit Assessment
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Please inspect your recorded answers before submitting for readiness scoring and AI gap analysis.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEditAnswers()}
            className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Edit Answers</span>
          </button>
        </div>

        {/* Business Summary Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Business Name</span>
            <span className="font-bold text-neutral-900 text-sm mt-0.5 block truncate">
              {businessName}
            </span>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Business Type</span>
            <span className="font-semibold text-neutral-800 text-sm mt-0.5 block truncate">
              {businessType}
            </span>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/60">
            <span className="text-neutral-400 block text-[11px] font-medium">Assessment Module</span>
            <span className="font-semibold text-emerald-800 text-sm mt-0.5 block truncate">
              {assessmentName}
            </span>
          </div>
        </div>
      </div>

      {/* Validation Alert if Incomplete */}
      {!isValid && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-rose-900">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm">
            <h4 className="font-bold text-rose-900">Submission Blocked — Incomplete Assessment</h4>
            <p className="mt-1 text-rose-800 leading-relaxed">
              You must provide an answer (Yes, No, or N/A) for all questions before submitting. The following{' '}
              {unansweredQuestions.length} question{unansweredQuestions.length > 1 ? 's are' : ' is'} currently unanswered:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 font-semibold text-rose-950">
              {unansweredQuestions.map((q) => (
                <li key={q.id}>
                  Question {q.number}: {q.title}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => onEditAnswers(unansweredQuestions[0].id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
              >
                Complete Unanswered Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions & Selected Answers Breakdown */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs divide-y divide-neutral-100">
        <div className="p-5 bg-neutral-50/70 border-b border-neutral-200/80 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
            Assessment Questionnaire Responses
          </span>
          <span className="text-xs font-mono text-neutral-500">
            Total Questions: {ASSESSMENT_QUESTIONS.length}
          </span>
        </div>

        {ASSESSMENT_QUESTIONS.map((q) => {
          const selected = answers[q.id];
          return (
            <div key={q.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-sm bg-neutral-200 text-neutral-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {q.number}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    {q.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {q.title}
                </h3>
                <p className="text-xs text-neutral-500">
                  {q.helperText}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                {getAnswerBadge(selected)}
                <button
                  type="button"
                  onClick={() => onEditAnswers(q.id)}
                  className="p-1.5 text-neutral-400 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                  title="Edit this answer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Actions */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onEditAnswers()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Edit Answers</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-lg text-sm font-bold text-white transition-all duration-150 cursor-pointer shadow-xs ${
              !isValid
                ? 'bg-neutral-300 cursor-not-allowed text-neutral-500'
                : isSubmitting || submissionSuccess
                ? 'bg-emerald-800'
                : 'bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                <span>Calculating Readiness Score...</span>
              </>
            ) : submissionSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Verified! Loading Results...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
