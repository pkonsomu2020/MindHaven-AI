import React from 'react';
import { Clock, Heart, BookOpen, Activity } from 'lucide-react';
import type { Exercise } from '../types';

const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Morning Mindfulness Meditation',
    type: 'meditation',
    duration: '10 minutes',
    description: 'Start your day with a calm and focused mind through this guided meditation session.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    benefits: ['Reduced anxiety', 'Improved focus', 'Better emotional regulation'],
  },
  {
    id: '2',
    title: 'Deep Breathing Exercise',
    type: 'breathing',
    duration: '5 minutes',
    description: 'A simple but effective breathing technique to reduce stress and promote relaxation.',
    imageUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80',
    benefits: ['Stress relief', 'Lower heart rate', 'Better oxygen flow'],
  },
  {
    id: '3',
    title: 'Gratitude Journaling',
    type: 'journaling',
    duration: '15 minutes',
    description: 'Practice gratitude through guided journaling prompts to improve mental well-being.',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
    benefits: ['Increased positivity', 'Better self-awareness', 'Improved mood'],
  },
];

export function ExerciseLibrary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img
            src={exercise.imageUrl}
            alt={exercise.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              {exercise.type === 'meditation' && <Heart className="w-5 h-5 text-purple-600" />}
              {exercise.type === 'breathing' && <Activity className="w-5 h-5 text-blue-600" />}
              {exercise.type === 'journaling' && <BookOpen className="w-5 h-5 text-green-600" />}
              <span className="text-sm font-medium capitalize text-gray-600">{exercise.type}</span>
            </div>

            <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
            <p className="text-gray-600 mb-4">{exercise.description}</p>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4" />
              <span>{exercise.duration}</span>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <button className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Start Exercise
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}