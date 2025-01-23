import React, { useState } from 'react';
import type { UserPreferences } from '../types';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

export function PreferencesForm({ onSubmit }: PreferencesFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    subjects: [],
    learningStyle: {
      visual: 50,
      auditory: 50,
      reading: 50,
      kinesthetic: 50,
    },
    difficulty: 'intermediate',
    goals: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subjects</label>
            <select
              multiple
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                setPreferences(prev => ({ ...prev, subjects: selected }));
              }}
            >
              <option value="mathematics">Mathematics</option>
              <option value="programming">Programming</option>
              <option value="science">Science</option>
              <option value="languages">Languages</option>
              <option value="history">History</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Visual Learning</label>
            <input
              type="range"
              min="0"
              max="100"
              value={preferences.learningStyle.visual}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                learningStyle: {
                  ...prev.learningStyle,
                  visual: parseInt(e.target.value)
                }
              }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={preferences.difficulty}
              onChange={(e) => setPreferences(prev => ({ ...prev, difficulty: e.target.value as any }))}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
      >
        Update Preferences
      </button>
    </form>
  );
}