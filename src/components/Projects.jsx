import React from 'react';
import SectionHeader from './SectionHeader';
import { projects } from '../data/portfolio-data';
import { GithubIcon } from './icons';

const ProjectCard = ({ title, description, github, tags }) => (
  <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-900/50">
    <div className="p-6 flex-grow">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{description}</p>
    </div>
    <div className="p-6 pt-0">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-700 text-cyan-300 rounded-full font-medium text-xs">
            {tag}
          </span>
        ))}
      </div>
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          data-interactive
        >
          View on GitHub
          <GithubIcon className="w-5 h-5 ml-2" />
        </a>
      )}
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <SectionHeader title="Projects" subtitle="My Work" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;