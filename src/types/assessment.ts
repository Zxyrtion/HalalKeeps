export type AnswerValue = 'Yes' | 'No' | 'N/A';

export interface Question {
  id: string;
  number: number;
  category: string;
  title: string;
  helperText: string;
}

export interface AssessmentAnswers {
  [questionId: string]: AnswerValue | undefined;
}

export type ReadinessStatus = 
  | 'Needs Improvement'
  | 'Developing Readiness'
  | 'Nearly Ready'
  | 'High Readiness'
  | 'Insufficient Information';

export interface ScoreCalculation {
  yesCount: number;
  noCount: number;
  naCount: number;
  applicableCount: number;
  totalQuestions: number;
  percentage: number | null; // null if insufficient information (0 applicable)
  formattedPercentage: string;
  status: ReadinessStatus;
  statusColor: {
    badgeBg: string;
    badgeText: string;
    strokeColor: string;
    accentColor: string;
  };
}

export interface ComplianceGap {
  questionId: string;
  questionNumber: number;
  requirement: string;
  currentAnswer: AnswerValue;
  explanation: string;
  priority: 'High Priority' | 'Critical' | 'Informational';
  category: string;
}

export interface CorrectiveAction {
  id: string;
  questionId: string;
  title: string;
  explanation: string;
  priority: 'High Priority' | 'Medium Priority' | 'Best Practice';
  nextStep: string;
}

export interface EvidenceRecommendation {
  id: string;
  questionId: string;
  title: string;
  explanation: string;
  priority: 'Required' | 'Recommended' | 'Supporting';
  documentType: string;
}

export interface AiInsights {
  summary: string;
  scoreStatusText: string;
  gaps: ComplianceGap[];
  actions: CorrectiveAction[];
  evidence: EvidenceRecommendation[];
}

export type PublishStatus = 'Draft' | 'Published' | 'Unpublished';

export interface PublicRestaurant {
  id: string;
  isOwnerBusiness?: boolean;
  name: string;
  businessType: string;
  cuisine: string;
  location: string;
  address: string;
  publishStatus: PublishStatus;
  readinessPercentage: number;
  formattedPercentage: string;
  readinessStatus: ReadinessStatus;
  credibilityScore: number;
  profileViews: number;
  dineIns: number;
  footTraffic: 'Quiet' | 'Moderate' | 'Busy' | 'New';
  services: ('Dine-in' | 'Takeout' | 'Delivery')[];
  isCertified: boolean;
  lastUpdated: string;
  publicSummary: string;
  verifiedAuditTier: string;
  officialCertificationStatus: 'Self-Assessed (Audit Pending)' | 'Officially Verified & Certified' | 'In Process';
  bannerBg?: string;
  logoUrl?: string;
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    category: 'Certification & Regulatory',
    title: 'Are you halal-certified?',
    helperText: 'Indicate whether your establishment currently holds applicable halal certification.',
  },
  {
    id: 'q2',
    number: 2,
    category: 'Documentation & Systems',
    title: 'Do you have a HAS (Halal Assurance System) Manual?',
    helperText: 'Indicate whether your establishment has documented procedures for its Halal Assurance System.',
  },
  {
    id: 'q3',
    number: 3,
    category: 'Personnel & Kitchen Operations',
    title: 'Do you have a Muslim Cook?',
    helperText: 'Indicate whether your establishment currently employs a Muslim cook.',
  },
];

export const INITIAL_DEMO_ANSWERS: AssessmentAnswers = {
  q1: 'No',
  q2: 'No',
  q3: 'Yes',
};

export const HIGH_READINESS_ANSWERS: AssessmentAnswers = {
  q1: 'Yes',
  q2: 'Yes',
  q3: 'Yes',
};

/**
 * Calculates score according to official HaCeRa demo guidelines:
 * Yes = 1 point
 * No = 0 points
 * N/A = excluded from calculation
 * Score = (Yes / Applicable) * 100
 */
export function calculateReadinessScore(answers: AssessmentAnswers): ScoreCalculation {
  let yesCount = 0;
  let noCount = 0;
  let naCount = 0;

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const val = answers[q.id];
    if (val === 'Yes') yesCount++;
    else if (val === 'No') noCount++;
    else if (val === 'N/A') naCount++;
  });

  const applicableCount = yesCount + noCount; // N/A is excluded
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  if (applicableCount === 0) {
    return {
      yesCount,
      noCount,
      naCount,
      applicableCount: 0,
      totalQuestions,
      percentage: null,
      formattedPercentage: 'Insufficient Information',
      status: 'Insufficient Information',
      statusColor: {
        badgeBg: 'bg-neutral-100 text-neutral-700 border-neutral-200',
        badgeText: 'text-neutral-700',
        strokeColor: '#9CA3AF',
        accentColor: '#4B5563',
      },
    };
  }

  const rawPercent = (yesCount / applicableCount) * 100;
  // Round to 1 decimal place (e.g. 33.3% or 100%)
  const percentage = Math.round(rawPercent * 10) / 10;
  const formattedPercentage = `${percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1)}%`;

  let status: ReadinessStatus = 'Needs Improvement';
  let statusColor = {
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'text-rose-700',
    strokeColor: '#E11D48',
    accentColor: '#BE123C',
  };

  if (percentage >= 90) {
    status = 'High Readiness';
    statusColor = {
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badgeText: 'text-emerald-800',
      strokeColor: '#059669',
      accentColor: '#047857',
    };
  } else if (percentage >= 70) {
    status = 'Nearly Ready';
    statusColor = {
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      badgeText: 'text-teal-800',
      strokeColor: '#0D9488',
      accentColor: '#0F766E',
    };
  } else if (percentage >= 40) {
    status = 'Developing Readiness';
    statusColor = {
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      badgeText: 'text-amber-800',
      strokeColor: '#D97706',
      accentColor: '#B45309',
    };
  }

  return {
    yesCount,
    noCount,
    naCount,
    applicableCount,
    totalQuestions,
    percentage,
    formattedPercentage,
    status,
    statusColor,
  };
}

/**
 * Generates personalized AI Insights based on user's exact answers
 */
export function generateAiInsights(answers: AssessmentAnswers, score: ScoreCalculation): AiInsights {
  const gaps: ComplianceGap[] = [];
  const actions: CorrectiveAction[] = [];
  const evidence: EvidenceRecommendation[] = [];

  // Check Q1: Halal certified
  if (answers['q1'] === 'No') {
    gaps.push({
      questionId: 'q1',
      questionNumber: 1,
      requirement: 'Official Halal Certification',
      currentAnswer: 'No',
      explanation: 'Establishment does not currently hold an active Halal certificate from a recognized authority.',
      priority: 'High Priority',
      category: 'Regulatory',
    });
    actions.push({
      id: 'act-q1',
      questionId: 'q1',
      title: 'Review Certification Roadmap & Select Authority',
      explanation: 'Identify the authorized Halal certification body applicable to your jurisdiction. Review application timelines, audit protocols, and document checklist. Current uncertified status does not bar your business from achieving compliance.',
      priority: 'High Priority',
      nextStep: 'Obtain application package from relevant Islamic Council or Halal certifying body and review prerequisite standards.',
    });
    evidence.push({
      id: 'evi-q1',
      questionId: 'q1',
      title: 'Halal Certification Application & Submission Records',
      explanation: 'Official application forms, submission receipt, or preliminary eligibility verification letters.',
      priority: 'Required',
      documentType: 'Statutory Application',
    });
  } else if (answers['q1'] === 'Yes') {
    evidence.push({
      id: 'evi-q1-active',
      questionId: 'q1',
      title: 'Active Halal Certificate & Scope of Certification',
      explanation: 'Current valid certificate copy, expiry date schedule, and approved food premises schedule.',
      priority: 'Required',
      documentType: 'Official Certificate',
    });
  }

  // Check Q2: HAS Manual
  if (answers['q2'] === 'No') {
    gaps.push({
      questionId: 'q2',
      questionNumber: 2,
      requirement: 'Halal Assurance System (HAS) Documentation',
      currentAnswer: 'No',
      explanation: 'Absence of documented standard operating procedures (SOPs) for halal raw material assurance, storage segregation, and contamination control.',
      priority: 'High Priority',
      category: 'Documentation',
    });
    actions.push({
      id: 'act-q2',
      questionId: 'q2',
      title: 'Draft & Implement Halal Assurance System Manual',
      explanation: 'Formulate an internal HAS manual covering ingredient purchasing, receiving checks, separate storage, utensil sanitization, and traceability controls.',
      priority: 'High Priority',
      nextStep: 'Adopt standard restaurant HAS template, draft core SOPs, and designate an internal Halal coordinator.',
    });
    evidence.push({
      id: 'evi-q2',
      questionId: 'q2',
      title: 'HAS Manual, Traceability SOPs & Receiving Logs',
      explanation: 'Standard Operating Procedures binder including supplier ingredient approval lists and incoming goods inspection sheets.',
      priority: 'Required',
      documentType: 'System Manual',
    });
  } else if (answers['q2'] === 'Yes') {
    evidence.push({
      id: 'evi-q2-active',
      questionId: 'q2',
      title: 'Approved Halal Assurance System (HAS) Manual & SOPs',
      explanation: 'Documented and signed HAS manual with current ingredient specifications and internal review signatures.',
      priority: 'Required',
      documentType: 'System Manual',
    });
  }

  // Check Q3: Muslim Cook
  if (answers['q3'] === 'No') {
    gaps.push({
      questionId: 'q3',
      questionNumber: 3,
      requirement: 'Kitchen Personnel & Muslim Cook Deployment',
      currentAnswer: 'No',
      explanation: 'The establishment does not currently employ a Muslim cook or dedicated Halal culinary supervisor.',
      priority: 'Critical',
      category: 'Operations',
    });
    actions.push({
      id: 'act-q3',
      questionId: 'q3',
      title: 'Review Kitchen Personnel & Halal Competency Requirements',
      explanation: 'Examine applicable personnel and operational requirements with your local authority. Note: The answer alone does not establish certification ineligibility, as certain frameworks permit certified Halal food handlers or dedicated Muslim supervisors.',
      priority: 'Medium Priority',
      nextStep: 'Assess kitchen staffing roster and enroll culinary staff in accredited Halal Food Handling certification programs.',
    });
    evidence.push({
      id: 'evi-q3',
      questionId: 'q3',
      title: 'Kitchen Staff Roster & Halal Training Certificates',
      explanation: 'Proof of employment, certified Halal food handler credentials, and food hygiene competency records.',
      priority: 'Recommended',
      documentType: 'Personnel Credentials',
    });
  } else if (answers['q3'] === 'Yes') {
    evidence.push({
      id: 'evi-q3-active',
      questionId: 'q3',
      title: 'Muslim Cook / Halal Kitchen Supervisor Credentials',
      explanation: 'Employment verification, Islamic dietary law compliance awareness, and certified food hygiene credentials.',
      priority: 'Recommended',
      documentType: 'Personnel Credentials',
    });
  }

  // Always include supplier list evidence as best practice
  evidence.push({
    id: 'evi-general-suppliers',
    questionId: 'q2',
    title: 'Approved Halal Raw Material & Meat Supplier List',
    explanation: 'Certificates of slaughter and halal compliance for all meat, poultry, sauces, and seasoning inventory.',
    priority: 'Supporting',
    documentType: 'Supply Chain Proof',
  });

  // Dynamic AI Summary
  let summary = '';
  let scoreStatusText = '';

  if (score.percentage === null) {
    scoreStatusText = 'Assessment Inconclusive';
    summary = 'All applicable questions were marked as N/A. To generate an accurate halal readiness profile, please provide specific responses for your restaurant operations.';
  } else if (score.percentage >= 90) {
    scoreStatusText = 'Strong Readiness Profile';
    summary = `Green Crescent Restaurant demonstrates high readiness with a score of ${score.formattedPercentage}. All evaluated fundamental prerequisites (certification groundwork, HAS manual documentation, and personnel alignment) are satisfied. The restaurant is well-positioned to initiate formal audit scheduling with the certification authority.`;
    
    // Add positive corrective action if no gaps
    if (actions.length === 0) {
      actions.push({
        id: 'act-ready',
        questionId: 'q1',
        title: 'Conduct Internal Mock Audit & Finalize Filing',
        explanation: 'With core pillars in place, perform an internal pre-audit walk-through. Ensure staff are prepared for onsite inspector interviews and records are organized.',
        priority: 'Best Practice',
        nextStep: 'Assemble submission dossier with all attached evidence and book official inspection date.',
      });
    }
  } else if (score.percentage >= 70) {
    scoreStatusText = 'Substantial Progress';
    summary = `Green Crescent Restaurant shows promising preparation at ${score.formattedPercentage}. Key foundations are present, but remaining compliance items must be addressed before external audit filing to prevent procedural delays.`;
  } else if (score.percentage >= 40) {
    scoreStatusText = 'Developing Readiness';
    summary = `Green Crescent Restaurant has initiated foundational steps (${score.formattedPercentage}), but critical gaps remain in operational documentation and regulatory alignment. Prioritize formalizing your Halal Assurance System before initiating certification.`;
  } else {
    scoreStatusText = 'Significant Action Needed';
    summary = `Green Crescent Restaurant is in the early phase of its halal compliance journey (${score.formattedPercentage}). Several essential requirements—including certification filing and formal HAS documentation—require immediate corrective measures before your establishment is audit-ready.`;
  }

  return {
    summary,
    scoreStatusText,
    gaps,
    actions,
    evidence,
  };
}

/**
 * Realistic Sample Directory Restaurants matching the user's reference UI:
 * - Tinhat Company Inc. (Artiaga St., Barangay 36-D, Asian Fusion)
 * - TINHAT Boutique Hotel and Restaurant (Artiaga St., Barangay 36-D)
 * - Halal na kaonan (Purok 1, Bago Aplaya, City of Davao)
 * - Barakah Artisan Cafe (Downtown)
 */
export const SAMPLE_DIRECTORY_RESTAURANTS: PublicRestaurant[] = [
  {
    id: 'res-tinhat-company',
    name: 'Tinhat Company Inc.',
    businessType: 'Boutique Hotel, Restaurant & Catering Services',
    cuisine: 'Asian Fusion',
    location: 'Davao Region, 8000',
    address: 'Artiaga St., Barangay 36-D (Pob.), City of Davao, Davao Del Sur, Davao Region, 8000',
    publishStatus: 'Published',
    readinessPercentage: 82.9,
    formattedPercentage: '82.9%',
    readinessStatus: 'Nearly Ready',
    credibilityScore: 24.9,
    profileViews: 25,
    dineIns: 2,
    footTraffic: 'Quiet',
    services: ['Dine-in', 'Takeout', 'Delivery'],
    isCertified: true,
    lastUpdated: 'Oct 12, 2026',
    publicSummary: 'Completed full HaCeRa operational audit with dedicated halal receiving bay, verified Muslim head supervisor, and active HAS documentation.',
    verifiedAuditTier: 'HaCeRa Tier 1 Verified',
    officialCertificationStatus: 'Officially Verified & Certified',
    bannerBg: 'from-emerald-950 via-emerald-900 to-emerald-950',
  },
  {
    id: 'res-tinhat-hotel',
    name: 'TINHAT Boutique Hotel and Restaurant',
    businessType: 'Hotel & Dining Service',
    cuisine: 'International & Local Grill',
    location: 'Davao Region',
    address: 'Artiaga St., Barangay 36-D (Pob.), City of Davao, Davao Del Sur, Davao Region',
    publishStatus: 'Published',
    readinessPercentage: 74.5,
    formattedPercentage: '74.5%',
    readinessStatus: 'Nearly Ready',
    credibilityScore: 15.7,
    profileViews: 4,
    dineIns: 0,
    footTraffic: 'New',
    services: ['Dine-in', 'Takeout'],
    isCertified: true,
    lastUpdated: 'Oct 11, 2026',
    publicSummary: 'Independent hotel kitchen operating with accredited halal poultry and meat suppliers, documented cross-contamination control SOPs.',
    verifiedAuditTier: 'HaCeRa Tier 2 Pre-Audit',
    officialCertificationStatus: 'Officially Verified & Certified',
    bannerBg: 'from-emerald-100 via-teal-100 to-emerald-200',
  },
  {
    id: 'res-halal-kaonan',
    name: 'Halal na kaonan',
    businessType: 'Traditional Food Establishment',
    cuisine: 'Local Halal Specialties',
    location: 'Davao Region, 8000',
    address: 'Purok 1, Bago Aplaya, City of Davao, Davao Del Sur, Davao Region, 8000',
    publishStatus: 'Published',
    readinessPercentage: 66.7,
    formattedPercentage: '66.7%',
    readinessStatus: 'Developing Readiness',
    credibilityScore: 18.2,
    profileViews: 1,
    dineIns: 0,
    footTraffic: 'New',
    services: ['Dine-in', 'Takeout'],
    isCertified: true,
    lastUpdated: 'Oct 10, 2026',
    publicSummary: 'Authentic local halal eatery operated by Muslim kitchen staff. HAS documentation and formal system manual currently in preparation.',
    verifiedAuditTier: 'HaCeRa Foundation',
    officialCertificationStatus: 'Self-Assessed (Audit Pending)',
    bannerBg: 'from-emerald-100 via-emerald-200 to-teal-100',
  },
  {
    id: 'res-barakah-deli',
    name: 'Barakah Artisan Grill & Deli',
    businessType: 'Casual Dining / Steakhouse',
    cuisine: 'Charcoal Grill & Steaks',
    location: 'West Boulevard, Davao',
    address: 'Ecoland Drive, City of Davao, Davao Del Sur, 8000',
    publishStatus: 'Published',
    readinessPercentage: 100,
    formattedPercentage: '100%',
    readinessStatus: 'High Readiness',
    credibilityScore: 92.4,
    profileViews: 58,
    dineIns: 14,
    footTraffic: 'Moderate',
    services: ['Dine-in', 'Takeout', 'Delivery'],
    isCertified: true,
    lastUpdated: 'Oct 09, 2026',
    publicSummary: 'All beef, poultry, seasonings, and culinary staff verified compliant with 100% Halal Assurance System requirements.',
    verifiedAuditTier: 'HaCeRa Tier 1 Verified',
    officialCertificationStatus: 'Officially Verified & Certified',
    bannerBg: 'from-emerald-900 via-teal-900 to-emerald-950',
  },
];
