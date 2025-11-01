import React from 'react';
import SectionHeader from './SectionHeader';

const skillCategories = [
  {
    name: 'Core Technologies',
    skills: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript']
  },
  {
    name: 'Backend',
    skills: ['Spring Boot', 'Flask', 'Microservices', 'REST APIs']
  },
  {
    name: 'Frontend',
    skills: ['React.js', 'Tailwind CSS', 'Redux']
  },
  {
    name: 'Data & AI',
    skills: ['Generative AI', 'LangChain', 'Vector DBs', 'RAG']
  },
  {
    name: 'System Design',
    skills: ['Distributed Systems', 'Scalability', 'System Architecture']
  },
  {
    name: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
  },
  {
    name: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Cassandra', 'MongoDB', 'Redis']
  },
  {
    name: 'Core Skills',
    skills: ['DSA', 'Problem Solving', 'Machine Coding']
  }
];


const About = () => {
  return (
    <section id="about" className="py-24">
      <SectionHeader title="About Me" subtitle="My Background" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold text-white mb-4">Who I Am</h3>
          <p className="text-gray-300 text-lg mb-4 text-justify">
            Hello! I'm Aman, a Software Developer Engineer II and a proud graduate of IIIT-Hyderabad.
            My expertise lies in designing and building scalable, low-latency backend systems and distributed architectures.
          </p>
          <p className="text-gray-300 text-lg mb-6 text-justify">
            I'm a full-stack developer with a strong command of DSA, System Design, and a suite of modern technologies including Java, Spring Boot, React, and cloud-native tools. I also have hands-on experience in the Generative AI space, utilizing OpenAI GPT-4 and LangChain for document summarization, integrating vector databases for context querying and Retrieval-Augmented Generation (RAG), and deploying LLM-based services using Flask-based web applications.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map(category => (
              <div key={category.name} className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-cyan-400 font-medium mb-3">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-gray-700/50 text-gray-200 rounded-full text-sm border border-gray-600/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;