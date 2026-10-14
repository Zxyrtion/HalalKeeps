import React from 'react';
import { PublicRestaurant } from '../types/assessment';
import { HalalKeepsLogo } from './HalalKeepsLogo';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Store, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Lock,
  Award
} from 'lucide-react';

interface PublicProfileModalProps {
  restaurant: PublicRestaurant | null;
  isOpen: boolean;
  onClose: () => void;
  isOwnerProfile?: boolean;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  isOwnerProfile = false,
}) => {
  if (!isOpen || !restaurant) return null;

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const percentage = restaurant.readinessPercentage;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#059669';
  let badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  if (percentage < 40) {
    strokeColor = '#E11D48';
    badgeStyle = 'bg-rose-50 text-rose-800 border-rose-300';
  } else if (percentage < 70) {
    strokeColor = '#D97706';
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-300';
  } else if (percentage < 90) {
    strokeColor = '#0D9488';
    badgeStyle = 'bg-teal-50 text-teal-800 border-teal-300';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HalalKeepsLogo size={32} showText={false} />
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-300 block">
                Public Halal Readiness Profile
              </span>
              <h3 className="text-base font-bold text-white truncate max-w-sm">
                {restaurant.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Restaurant Header & Location */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {restaurant.businessType}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {restaurant.cuisine}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                {restaurant.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {restaurant.location}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  Updated: {restaurant.lastUpdated}
                </span>
              </div>
            </div>

            {isOwnerProfile && (
              <span className="self-start px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                Your Published Profile
              </span>
            )}
          </div>

          {/* Large Readiness Score Visualization */}
          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black font-mono tracking-tight text-neutral-900">
                  {restaurant.formattedPercentage}
                </span>
                <span className="text-[10px] uppercase font-bold text-neutral-400">
                  Readiness
                </span>
              </div>
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle}`}>
                  {restaurant.readinessStatus}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {restaurant.verifiedAuditTier}
                </span>
              </div>
              <h4 className="text-sm font-bold text-neutral-900">
                Voluntary Halal Preparedness Disclosure
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {restaurant.publicSummary}
              </p>
            </div>
          </div>

          {/* Certification vs Readiness Distinction */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Audit & Verification Transparency
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 block text-[11px] font-medium">Self-Assessed HaCeRa Score</span>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-neutral-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono">{restaurant.formattedPercentage}</span>
                  <span className="font-normal text-neutral-500">({restaurant.readinessStatus})</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 block text-[11px] font-medium">Official Certification Authority Status</span>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-neutral-800">
                  <Award className="w-4 h-4 text-emerald-800" />
                  <span>{restaurant.officialCertificationStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Statement */}
          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-2.5 text-xs text-emerald-950">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Public Profile Policy:</strong> In compliance with Halal Keeps privacy standards, only aggregate readiness indicators and establishment information approved by the business owner are shown. Questionnaire answers and internal operational records are strictly protected.
            </p>
          </div>

          {/* Mandatory Public Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Mandatory Consumer Notice: </strong>
              Halal readiness scores reflect self-reported assessment responses and are intended for informational purposes only. A high score does not constitute official halal certification or guarantee that an establishment is halal-certified. Customers should verify certification status with the relevant certification body.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            Halal Keeps · Public Trust Registry
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
