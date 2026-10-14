import React, { useEffect, useRef } from 'react';
import { Question, AnswerValue } from '../types/assessment';
import { Check, X, Minus, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: AnswerValue | undefined;
  onSelectAnswer: (questionId: string, answer: AnswerValue) => void;
  isHighlighted?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isHighlighted = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const options: { value: AnswerValue; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      value: 'Yes',
      label: 'Yes',
      icon: <Check className="w-4 h-4 stroke-[2.5]" />,
      desc: 'Requirement currently met or in place',
    },
    {
      value: 'No',
      label: 'No',
      icon: <X className="w-4 h-4 stroke-[2.5]" />,
      desc: 'Not currently implemented or pending',
    },
    {
      value: 'N/A',
      label: 'N/A',
      icon: <Minus className="w-4 h-4 stroke-[2.5]" />,
      desc: 'Not applicable to our operations',
    },
  ];

  return (
    <div
      ref={cardRef}
      id={`question-${question.id}`}
      className={`bg-white rounded-xl border transition-all duration-300 p-5 sm:p-6 shadow-2xs relative ${
        isHighlighted
          ? 'border-emerald-600 ring-4 ring-emerald-100 shadow-md scale-[1.01]'
          : selectedAnswer
          ? 'border-neutral-300/80'
          : 'border-neutral-200'
      }`}
    >
      {/* Category & Step Index */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-emerald-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
            {question.number}
          </span>
          <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            {question.category}
          </span>
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          {selectedAnswer ? (
            <span className={`inline-flex items-center gap-1 font-semibold ${
              selectedAnswer === 'Yes'
                ? 'text-emerald-700'
                : selectedAnswer === 'No'
                ? 'text-rose-700'
                : 'text-neutral-600'
            }`}>
              Selected: {selectedAnswer}
            </span>
          ) : (
            <span className="text-amber-600 font-medium">Unanswered</span>
          )}
        </div>
      </div>

      {/* Question Title & Helper */}
      <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
        {question.title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 leading-relaxed flex items-start gap-1.5">
        <HelpCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
        <span>{question.helperText}</span>
      </p>

      {/* Answer Options: Yes, No, N/A */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.value;

          let selectedStyle = '';
          if (isSelected) {
            if (opt.value === 'Yes') {
              selectedStyle = 'bg-emerald-800 text-white border-emerald-800 shadow-xs ring-2 ring-emerald-600/30';
            } else if (opt.value === 'No') {
              selectedStyle = 'bg-rose-700 text-white border-rose-700 shadow-xs ring-2 ring-rose-600/30';
            } else {
              selectedStyle = 'bg-neutral-800 text-white border-neutral-800 shadow-xs ring-2 ring-neutral-600/30';
            }
          } else {
            selectedStyle = 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200/80 hover:border-neutral-300';
          }

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelectAnswer(question.id, opt.value)}
              className={`w-full py-3 px-4 rounded-lg border text-sm font-semibold transition-all duration-150 flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 cursor-pointer text-left sm:text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 ${selectedStyle}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-2 sm:gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {opt.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{opt.label}</span>
              </div>
              <span className={`text-[11px] font-normal leading-tight hidden sm:block ${
                isSelected ? 'text-white/80' : 'text-neutral-500'
              }`}>
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
