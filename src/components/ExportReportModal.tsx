import React from 'react';
import { 
  ScoreCalculation, 
  AiInsights, 
  AssessmentAnswers, 
  ASSESSMENT_QUESTIONS 
} from '../types/assessment';
import { HalalKeepsLogo } from './HalalKeepsLogo';
import { X, Printer, Download, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: ScoreCalculation;
  insights: AiInsights;
  answers: AssessmentAnswers;
  businessName: string;
  businessType: string;
  assessmentName: string;
  submissionDate: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  score,
  insights,
  answers,
  businessName,
  businessType,
  assessmentName,
  submissionDate,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
            <h3 className="text-sm font-bold text-neutral-900">
              Halal Readiness Executive Report
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-800 text-xs sm:text-sm">
          {/* Official Letterhead */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-neutral-800">
            <HalalKeepsLogo size={42} showText={true} />
            <div className="text-right text-xs text-neutral-500 font-mono">
              <div>DOC ID: HK-HACERA-2026-09</div>
              <div>Generated: {submissionDate}</div>
            </div>
          </div>

          {/* Business & Assessment Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Business Name</span>
              <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{businessName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Facility</span>
              <span className="font-semibold text-neutral-800 mt-0.5 block">{businessType}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Evaluation Standard</span>
              <span className="font-semibold text-emerald-800 mt-0.5 block">{assessmentName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Evaluated Score</span>
              <span className="font-mono font-bold text-emerald-800 text-sm mt-0.5 block">
                {score.formattedPercentage} ({score.status})
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-xs mb-1.5 text-emerald-950">
              Executive AI Diagnostic
            </h4>
            <p className="text-neutral-700 leading-relaxed bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100">
              {insights.summary}
            </p>
          </div>

          {/* Table of Responses */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-xs mb-2">
              Assessment Criteria & Current Compliance State
            </h4>
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-100 text-[11px] font-bold text-neutral-700 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-xs">
                  {ASSESSMENT_QUESTIONS.map((q) => {
                    const ans = answers[q.id];
                    return (
                      <tr key={q.id}>
                        <td className="py-2.5 px-3 font-mono font-bold text-neutral-500">{q.number}</td>
                        <td className="py-2.5 px-3 font-semibold text-neutral-900">{q.title}</td>
                        <td className="py-2.5 px-3 text-neutral-500">{q.category}</td>
                        <td className="py-2.5 px-3 text-right font-bold">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${
                            ans === 'Yes' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : ans === 'No' 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {ans || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Items */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-xs mb-2">
              Prioritized Action Roadmap
            </h4>
            <div className="space-y-2">
              {insights.actions.map((act) => (
                <div key={act.id} className="p-3 rounded-lg border border-neutral-200 bg-white">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">{act.title}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {act.priority}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">{act.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-4 border-t border-neutral-200 text-[11px] text-neutral-400 leading-relaxed">
            Halal Keeps HaCeRa assessment is a self-assessment decision-support tool. It is not a legally binding halal certificate. Formal certification requires application, inspection, and issuance by the authorized Islamic Halal authority.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
