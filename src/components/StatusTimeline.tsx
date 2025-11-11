import React from 'react';
import { Check, Clock, X, AlertCircle } from 'lucide-react';

interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  date?: string;
  description?: string;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
}

export function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex gap-4">
            {/* Icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-success-100 text-success-600'
                    : step.status === 'current'
                    ? 'bg-primary-100 text-primary-600'
                    : step.status === 'rejected'
                    ? 'bg-error-100 text-error-600'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                {step.status === 'completed' && <Check className="w-5 h-5" />}
                {step.status === 'current' && <Clock className="w-5 h-5" />}
                {step.status === 'rejected' && <X className="w-5 h-5" />}
                {step.status === 'pending' && <AlertCircle className="w-5 h-5" />}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-16 ${
                    step.status === 'completed' ? 'bg-success-200' : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4
                className={`m-0 mb-1 ${
                  step.status === 'completed'
                    ? 'text-success-700'
                    : step.status === 'current'
                    ? 'text-primary-700'
                    : step.status === 'rejected'
                    ? 'text-error-700'
                    : 'text-neutral-500'
                }`}
              >
                {step.label}
              </h4>
              {step.date && (
                <small className="text-neutral-500">{step.date}</small>
              )}
              {step.description && (
                <p className="mt-2 text-neutral-600">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
