import React from 'react';
import { ExternalLink, Clock, Tag } from 'lucide-react';
import type { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {resource.imageUrl && (
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{resource.title}</h3>
          <span className={`px-2 py-1 rounded text-sm ${
            resource.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {resource.difficulty}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600">{resource.description}</p>
        
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          {resource.duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{resource.duration}</span>
            </div>
          )}
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            <span>{resource.type}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800"
        >
          Learn More <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}