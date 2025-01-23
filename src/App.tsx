import React, { useState } from 'react';
import { Header } from './components/Header';
import { MentalHealthScreening } from './components/MentalHealthScreening';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { JournalSection } from './components/JournalSection';
import type { ScreeningResult, JournalEntry, User } from './types';

function App() {
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(null);
  const [activeSection, setActiveSection] = useState<'screening' | 'exercises' | 'journal'>('screening');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email: email,
    });
  };

  const handleSignup = async (email: string, password: string) => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email: email,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleScreeningComplete = (result: ScreeningResult) => {
    setScreeningResult(result);
  };

  const handleJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        user={user}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-8">
          {activeSection === 'screening' && (
            <section id="screening">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Mental Health Screening</h2>
              <MentalHealthScreening onComplete={handleScreeningComplete} />
              
              {screeningResult && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Your Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">Stress Level</p>
                      <p className="text-2xl font-bold text-purple-900">{screeningResult.stress}%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">Anxiety Level</p>
                      <p className="text-2xl font-bold text-blue-900">{screeningResult.anxiety}%</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">Mood Score</p>
                      <p className="text-2xl font-bold text-green-900">{screeningResult.mood}%</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {screeningResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-700">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeSection === 'exercises' && (
            <section id="exercises">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Wellness Exercises</h2>
              <ExerciseLibrary />
            </section>
          )}

          {activeSection === 'journal' && (
            <section id="journal">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Reflection Journal</h2>
              <JournalSection entries={journalEntries} onNewEntry={handleJournalEntry} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;