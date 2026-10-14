import React from 'react';
import { HalalKeepsLogo } from './HalalKeepsLogo';
import { 
  Sparkles, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  Globe, 
  Store,
  ExternalLink 
} from 'lucide-react';

interface TopNavProps {
  activeView: 'business' | 'directory';
  onViewChange: (view: 'business' | 'directory') => void;
  currentStep: 'assessment' | 'review' | 'results';
  onStepChange: (step: 'assessment' | 'review' | 'results') => void;
  canNavigateToReview: boolean;
  hasSubmitted: boolean;
  isOwnerPublished: boolean;
  onResetDemo: () => void;
  onApplyReadyState: () => void;
  onOpenReportModal?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeView,
  onViewChange,
  currentStep,
  onStepChange,
  canNavigateToReview,
  hasSubmitted,
  isOwnerPublished,
  onResetDemo,
  onApplyReadyState,
  onOpenReportModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Official Brand Logo & Wordmark */}
        <div 
          onClick={() => {
            onViewChange('business');
            onStepChange('assessment');
          }}
          className="cursor-pointer flex items-center shrink-0 group focus-visible:outline-hidden"
          role="button"
          tabIndex={0}
          aria-label="Halal Keeps Home"
        >
          <HalalKeepsLogo size={38} showText={true} />
        </div>

        {/* Zone 2: Navigation — View Switcher & Flow Stepper */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Main Mode Switcher: Business Portal vs Customer Directory */}
          <div className="inline-flex items-center p-1 bg-neutral-100 rounded-lg text-xs font-semibold border border-neutral-200/80">
            <button
              type="button"
              onClick={() => onViewChange('business')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeView === 'business'
                  ? 'bg-white text-emerald-950 shadow-2xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-emerald-800" />
              <span>Business Owner Portal</span>
            </button>

            <button
              type="button"
              onClick={() => onViewChange('directory')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeView === 'directory'
                  ? 'bg-white text-emerald-950 shadow-2xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-800" />
              <span>Customer Directory</span>
              {isOwnerPublished && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Your restaurant is live in directory" />
              )}
            </button>
          </div>

          {/* Stepper (Only active in Business View on desktop) */}
          {activeView === 'business' && (
            <nav className="hidden xl:flex items-center gap-1.5 text-xs font-medium">
              <button
                onClick={() => onStepChange('assessment')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  currentStep === 'assessment'
                    ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/80 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Assessment</span>
              </button>

              <span className="text-neutral-300 font-light select-none">/</span>

              <button
                onClick={() => {
                  if (canNavigateToReview) onStepChange('review');
                }}
                disabled={!canNavigateToReview}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  currentStep === 'review'
                    ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/80 shadow-2xs'
                    : canNavigateToReview
                    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === 'review' ? 'bg-emerald-900 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>2</span>
                <span>Review</span>
              </button>

              <span className="text-neutral-300 font-light select-none">/</span>

              <button
                onClick={() => {
                  if (hasSubmitted) onStepChange('results');
                }}
                disabled={!hasSubmitted}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  currentStep === 'results'
                    ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/80 shadow-2xs'
                    : hasSubmitted
                    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === 'results' ? 'bg-emerald-900 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>3</span>
                <span>Results</span>
              </button>
            </nav>
          )}
        </div>

        {/* Zone 3: Quick Action & Presets */}
        <div className="flex items-center gap-2 shrink-0">
          {hasSubmitted && onOpenReportModal && activeView === 'business' && (
            <button
              onClick={onOpenReportModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-2xs whitespace-nowrap"
              title="Print or Export Assessment Report"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export Report</span>
            </button>
          )}

          {/* Quick Demo Switcher */}
          <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-50/80 p-0.5 text-xs">
            <button
              onClick={onResetDemo}
              className="px-2 py-1 font-medium rounded text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors flex items-center gap-1"
              title="Demo Initial: 33.3% score with 2 gaps"
            >
              <RefreshCw className="w-3 h-3 text-amber-600" />
              <span className="hidden sm:inline">Demo 33%</span>
            </button>
            <span className="text-neutral-200 font-light select-none">|</span>
            <button
              onClick={onApplyReadyState}
              className="px-2 py-1 font-medium rounded text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1"
              title="Demo High: 100% score"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span className="hidden sm:inline">Demo 100%</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
