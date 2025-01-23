import React, { useState } from 'react';
import type { MentalHealthQuestion, ScreeningResult } from '../types';

const questions: MentalHealthQuestion[] = [
  {
    id: '1',
    question: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
    type: 'scale',
  },
  {
    id: '2',
    question: 'How would you rate your current stress level?',
    type: 'scale',
  },
  {
    id: '3',
    question: 'Have you been feeling anxious or worried about various aspects of your life?',
    type: 'scale',
  },
  {
    id: '4',
    question: 'How would you describe your sleep quality over the past week?',
    type: 'choice',
    options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
  },
];

interface Props {
  onComplete: (result: ScreeningResult) => void;
}

export function MentalHealthScreening({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});

  const handleAnswer = (value: number | string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate result based on answers
      const result: ScreeningResult = {
        stress: Math.round(Math.random() * 100), // In a real app, this would be calculated based on answers
        anxiety: Math.round(Math.random() * 100),
        mood: Math.round(Math.random() * 100),
        recommendations: [
          'Try our guided meditation exercises',
          'Consider starting a daily journal',
          'Practice deep breathing exercises',
        ],
      };
      onComplete(result);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

      {question.type === 'scale' && (
        <div className="space-y-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Not at all</span>
            <span>Severely</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            onChange={(e) => handleAnswer(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      )}

      {question.type === 'choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}