/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ASSESSMENT_QUESTIONS, 
  AssessmentAnswers, 
  AnswerValue, 
  INITIAL_DEMO_ANSWERS, 
  HIGH_READINESS_ANSWERS,
  SAMPLE_DIRECTORY_RESTAURANTS,
  PublicRestaurant,
  PublishStatus,
  calculateReadinessScore, 
  generateAiInsights 
} from './types/assessment';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { AssessmentScreen } from './components/AssessmentScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { CustomerDirectoryScreen } from './components/CustomerDirectoryScreen';
import { PublicProfileModal } from './components/PublicProfileModal';
import { DemoToolbar } from './components/DemoToolbar';
import { ExportReportModal } from './components/ExportReportModal';

export default function App() {
  // Navigation View State: 'business' (Portal) or 'directory' (Customer)
  const [activeView, setActiveView] = useState<'business' | 'directory'>('business');

  // Assessment State
  const [answers, setAnswers] = useState<AssessmentAnswers>(INITIAL_DEMO_ANSWERS);
  const [currentStep, setCurrentStep] = useState<'assessment' | 'review' | 'results'>('assessment');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(true); // Pre-evaluated for initial demo state (33.3%)
  const [highlightedQuestionId, setHighlightedQuestionId] = useState<string | null>(null);
  const [submissionDate, setSubmissionDate] = useState<string>('Oct 14, 2026, 06:15 AM');
  
  // Publication State for Green Crescent Restaurant (Initialized as Published as required for demo)
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('Published');

  // Modals State
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedPublicRestaurant, setSelectedPublicRestaurant] = useState<PublicRestaurant | null>(null);
  const [isPublicProfileModalOpen, setIsPublicProfileModalOpen] = useState<boolean>(false);

  // Business Metadata
  const businessName = 'Green Crescent Restaurant';
  const businessType = 'Restaurant / Food Establishment';
  const assessmentName = 'HaCeRa Readiness Check';
  const cuisine = 'Halal Grilled & Casual Dining';
  const location = 'Central District, Suite 104';

  // Derived Calculations
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(Boolean).length;
  }, [answers]);

  const scoreCalculation = useMemo(() => {
    return calculateReadinessScore(answers);
  }, [answers]);

  const aiInsights = useMemo(() => {
    return generateAiInsights(answers, scoreCalculation);
  }, [answers, scoreCalculation]);

  // Construct Green Crescent Restaurant's dynamic public directory object
  const ownerPublicRestaurant: PublicRestaurant = useMemo(() => {
    const scoreVal = scoreCalculation.percentage ?? 0;
    let summary = '';
    if (scoreVal >= 90) {
      summary = 'Green Crescent Restaurant demonstrates high readiness (100%) across all foundational HaCeRa criteria, including HAS manual procedures, culinary personnel alignment, and formal certification roadmap.';
    } else if (scoreVal >= 70) {
      summary = `Green Crescent Restaurant shows nearly ready status (${scoreCalculation.formattedPercentage}), with key systems established and final procedural reviews underway.`;
    } else if (scoreVal >= 40) {
      summary = `Green Crescent Restaurant has initiated foundational readiness (${scoreCalculation.formattedPercentage}) and is implementing Halal Assurance System procedures.`;
    } else {
      summary = `Green Crescent Restaurant has completed the preliminary self-assessment (${scoreCalculation.formattedPercentage}) and is actively working on corrective compliance documentation.`;
    }

    const isCert = answers['q1'] === 'Yes';
    const credScore = scoreVal >= 90 ? 94.8 : scoreVal >= 70 ? 76.5 : scoreVal >= 40 ? 45.2 : 33.3;

    return {
      id: 'res-green-crescent',
      isOwnerBusiness: true,
      name: businessName,
      businessType,
      cuisine,
      location,
      address: 'Artiaga St., Central Business District, City of Davao, Davao Del Sur, 8000',
      publishStatus,
      readinessPercentage: scoreVal,
      formattedPercentage: scoreCalculation.formattedPercentage,
      readinessStatus: scoreCalculation.status,
      credibilityScore: credScore,
      profileViews: scoreVal >= 90 ? 42 : 18,
      dineIns: scoreVal >= 90 ? 15 : 2,
      footTraffic: scoreVal >= 90 ? 'Moderate' : 'Quiet',
      services: ['Dine-in', 'Takeout', 'Delivery'],
      isCertified: isCert,
      lastUpdated: submissionDate,
      publicSummary: summary,
      verifiedAuditTier: 'HaCeRa Self-Assessment',
      officialCertificationStatus: scoreVal >= 90 ? 'In Process' : 'Self-Assessed (Audit Pending)',
      bannerBg: 'from-[#033126] via-emerald-900 to-[#033126]',
    };
  }, [answers, businessName, businessType, cuisine, location, publishStatus, scoreCalculation, submissionDate]);

  // Combined Directory List: Green Crescent Restaurant + Sample Directory Restaurants
  const allDirectoryRestaurants = useMemo(() => {
    // Green Crescent is placed at the top if published
    return [ownerPublicRestaurant, ...SAMPLE_DIRECTORY_RESTAURANTS];
  }, [ownerPublicRestaurant]);

  // Handle Answer Selection
  const handleSelectAnswer = (questionId: string, answer: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Step Navigations
  const handleNavigateToReview = () => {
    setCurrentStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditAnswers = (questionId?: string) => {
    setCurrentStep('assessment');
    if (questionId) {
      setHighlightedQuestionId(questionId);
      setTimeout(() => setHighlightedQuestionId(null), 3500);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAssessment = () => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setSubmissionDate(formatted);
    setHasSubmitted(true);
    setCurrentStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen 5: Improve My Readiness Loop
  const handleImproveReadiness = () => {
    setCurrentStep('assessment');
    setHighlightedQuestionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump from AI Insight "Review Answer" button to Question
  const handleReviewQuestion = (questionId: string) => {
    setCurrentStep('assessment');
    setHighlightedQuestionId(questionId);
    setTimeout(() => {
      setHighlightedQuestionId(null);
    }, 4000);
  };

  // Publishing Actions
  const handlePublish = () => {
    setPublishStatus('Published');
  };

  const handleUnpublish = () => {
    setPublishStatus('Unpublished');
  };

  const handlePreviewPublicProfile = () => {
    setSelectedPublicRestaurant(ownerPublicRestaurant);
    setIsPublicProfileModalOpen(true);
  };

  const handleViewCustomerProfile = (restaurant: PublicRestaurant) => {
    setSelectedPublicRestaurant(restaurant);
    setIsPublicProfileModalOpen(true);
  };

  // Demo Toolbar Presets
  const handleLoadInitialDemo = () => {
    setAnswers({ ...INITIAL_DEMO_ANSWERS });
    setHighlightedQuestionId(null);
    setPublishStatus('Published');
  };

  const handleLoadHighReadiness = () => {
    setAnswers({ ...HIGH_READINESS_ANSWERS });
    setHighlightedQuestionId(null);
  };

  const handleClearAnswers = () => {
    setAnswers({});
    setHighlightedQuestionId(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Hackathon Quick Demo Controls */}
      <DemoToolbar
        onLoadInitialState={handleLoadInitialDemo}
        onLoadHighReadinessState={handleLoadHighReadiness}
        onClearAnswers={handleClearAnswers}
        score={scoreCalculation}
        currentStep={currentStep}
        publishStatus={publishStatus}
        onTogglePublish={() => {
          if (publishStatus === 'Published') {
            handleUnpublish();
          } else {
            handlePublish();
          }
        }}
        activeView={activeView}
        onToggleView={() => {
          setActiveView((prev) => (prev === 'business' ? 'directory' : 'business'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Primary Top Bar */}
      <TopNav
        activeView={activeView}
        onViewChange={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentStep={currentStep}
        onStepChange={(step) => {
          setActiveView('business');
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        canNavigateToReview={answeredCount > 0}
        hasSubmitted={hasSubmitted}
        isOwnerPublished={publishStatus === 'Published'}
        onResetDemo={handleLoadInitialDemo}
        onApplyReadyState={handleLoadHighReadiness}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === 'business' ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Sidebar */}
            <Sidebar
              currentStep={currentStep}
              onStepChange={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
              score={scoreCalculation}
              hasSubmitted={hasSubmitted}
              businessName={businessName}
              businessType={businessType}
              assessmentName={assessmentName}
            />

            {/* Center Main Stage */}
            <div className="flex-1 w-full min-w-0">
              {currentStep === 'assessment' && (
                <AssessmentScreen
                  answers={answers}
                  onSelectAnswer={handleSelectAnswer}
                  onNavigateToReview={handleNavigateToReview}
                  highlightedQuestionId={highlightedQuestionId}
                  businessName={businessName}
                  businessType={businessType}
                  assessmentName={assessmentName}
                  onResetToDemo={handleLoadInitialDemo}
                />
              )}

              {currentStep === 'review' && (
                <ReviewScreen
                  answers={answers}
                  onEditAnswers={handleEditAnswers}
                  onSubmitAssessment={handleSubmitAssessment}
                  businessName={businessName}
                  businessType={businessType}
                  assessmentName={assessmentName}
                />
              )}

              {currentStep === 'results' && (
                <ResultsScreen
                  score={scoreCalculation}
                  insights={aiInsights}
                  answers={answers}
                  onImproveReadiness={handleImproveReadiness}
                  onReviewQuestion={handleReviewQuestion}
                  businessName={businessName}
                  businessType={businessType}
                  assessmentName={assessmentName}
                  submissionDate={submissionDate}
                  publishStatus={publishStatus}
                  onPublish={handlePublish}
                  onUnpublish={handleUnpublish}
                  onPreviewPublicProfile={handlePreviewPublicProfile}
                  onNavigateToCustomerDirectory={() => {
                    setActiveView('directory');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />
              )}
            </div>
          </div>
        ) : (
          /* Customer Directory View */
          <CustomerDirectoryScreen
            restaurants={allDirectoryRestaurants}
            onViewRestaurantProfile={handleViewCustomerProfile}
            onNavigateToBusinessPortal={() => {
              setActiveView('business');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-neutral-200 mt-12 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800">Halal Keeps</span>
            <span>·</span>
            <span>HaCeRa Halal Readiness & Customer Directory</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
            <button
              onClick={() => {
                setActiveView('business');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Business Owner Portal
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveView('directory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Customer Directory
            </button>
            <span>·</span>
            <span>Self-Assessment Decision Support Tool</span>
          </div>
        </div>
      </footer>

      {/* Public Profile Modal (Consumer Safe) */}
      <PublicProfileModal
        restaurant={selectedPublicRestaurant}
        isOpen={isPublicProfileModalOpen}
        onClose={() => {
          setIsPublicProfileModalOpen(false);
          setSelectedPublicRestaurant(null);
        }}
        isOwnerProfile={selectedPublicRestaurant?.isOwnerBusiness}
      />

      {/* Printable / Downloadable Executive Report Modal */}
      <ExportReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        score={scoreCalculation}
        insights={aiInsights}
        answers={answers}
        businessName={businessName}
        businessType={businessType}
        assessmentName={assessmentName}
        submissionDate={submissionDate}
      />
    </div>
  );
}
