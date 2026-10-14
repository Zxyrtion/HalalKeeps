import React, { useState } from 'react';
import { 
  ScoreCalculation, 
  PublishStatus 
} from '../types/assessment';
import { 
  Globe, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Lock, 
  Sparkles,
  Info
} from 'lucide-react';

interface PublishControlCardProps {
  score: ScoreCalculation;
  publishStatus: PublishStatus;
  onPublish: () => void;
  onUnpublish: () => void;
  onPreviewPublicProfile: () => void;
  onNavigateToCustomerDirectory: () => void;
  businessName: string;
  businessType: string;
}

export const PublishControlCard: React.FC<PublishControlCardProps> = ({
  score,
  publishStatus,
  onPublish,
  onUnpublish,
  onPreviewPublicProfile,
  onNavigateToCustomerDirectory,
  businessName,
  businessType,
}) => {
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isPublished = publishStatus === 'Published';

  const handlePublishClick = () => {
    onPublish();
    setToastMessage('Score published! Green Crescent Restaurant is now live in the Customer Directory.');
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 4500);
  };

  const handleUnpublishClick = () => {
    onUnpublish();
    setToastMessage('Score unpublished. Your establishment has been removed from the public directory.');
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 4500);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs relative overflow-hidden">
      {/* Toast Alert */}
      {showConfirmToast && (
        <div className="mb-4 p-3.5 rounded-lg bg-emerald-900 text-white text-xs flex items-center justify-between shadow-md transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setShowConfirmToast(false)}
            className="text-emerald-200 hover:text-white text-xs font-semibold px-2 py-0.5 rounded cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isPublished 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-neutral-100 text-neutral-600'
            }`}>
              {isPublished ? <Globe className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Public Directory Visibility
                </span>
                <span className="text-neutral-300">·</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  isPublished
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : publishStatus === 'Unpublished'
                    ? 'bg-neutral-100 text-neutral-700 border-neutral-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}>
                  {publishStatus === 'Published' 
                    ? 'Published — Visible to Customers' 
                    : publishStatus === 'Unpublished' 
                    ? 'Unpublished — Hidden from Directory' 
                    : 'Draft — Not Published'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                Publish My Readiness Score
              </h3>
            </div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl mt-1">
            Share your verified {score.formattedPercentage} readiness score in the Halal Keeps Public Customer Directory to demonstrate your commitment to halal integrity. You can update or unpublish your score at any time.
          </p>

          {/* Privacy Guarantee Pill */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>
              <strong>Privacy Guaranteed:</strong> Internal questionnaire answers, gap analysis, and AI corrective actions remain 100% confidential.
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
          <button
            type="button"
            onClick={onPreviewPublicProfile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
            title="Preview how customers will view your restaurant profile"
          >
            <Eye className="w-4 h-4 text-neutral-500" />
            <span>Preview Public Card</span>
          </button>

          {isPublished ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleUnpublishClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Unpublish Score</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToCustomerDirectory}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View in Directory</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handlePublishClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 transition-colors shadow-xs cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>Publish Score to Directory</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
