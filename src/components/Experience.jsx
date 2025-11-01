import React from 'react';
import SectionHeader from './SectionHeader';
import { experiences } from '../data/portfolio-data';

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <SectionHeader title="Experience" subtitle="My Professional Journey" />
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 transform -translate-x-1/2"></div>
        
        {experiences.map((job, index) => (
          <div key={index} className="mb-12 relative">
            <div className="md:flex items-center">
              <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-900"></div>
              
              <div className={`w-full md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-xl
                              ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                <h3 className="text-xl font-bold text-white">{job.role}</h3>
                <p className="text-cyan-400 font-semibold">{job.company}</p>
                <p className="text-gray-400 text-sm mt-1">{job.dates} · {job.location}</p>
                <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
                  {job.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-700 text-cyan-300 rounded-full font-medium text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;