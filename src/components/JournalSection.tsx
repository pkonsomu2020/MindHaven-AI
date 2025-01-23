import React, { useState } from 'react';
import { Calendar, Smile } from 'lucide-react';
import type { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
  onNewEntry: (entry: JournalEntry) => void;
}

export function JournalSection({ entries, onNewEntry }: Props) {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      content,
      tags: content.match(/#\w+/g)?.map(tag => tag.slice(1)) || [],
    };
    onNewEntry(newEntry);
    setContent('');
    setMood(5);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">New Journal Entry</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>😔</span>
            <span>😊</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write your thoughts
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="How was your day? Use #tags to categorize your entry..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Entry
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Previous Entries</h3>
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smile className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600">{entry.mood}/10</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{entry.content}</p>
            
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}