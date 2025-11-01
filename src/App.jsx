import React, { useState, useEffect, useRef } from 'react';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import { ChatbotFAB, ChatbotModal } from './components/Chatbot';
import { experiences, projects } from './data/portfolio-data';
// Create the portfolio context string from the data constants
const portfolioContext = `
About Aman Motwani:
- Software Developer Engineer II and graduate of IIIT-Hyderabad (M.Tech, 8.35 CGPA).
- Expertise: Designing scalable, low-latency backend systems, distributed architectures, and full-stack applications.
- Skills: DSA, System Design, Java, Spring Boot, React, Python, ML, cloud-native technologies, Generative AI, LangChain, Vector DBs, Kubernetes.
- Driven by solving complex problems and optimizing system performance at scale.
- Generative AI Experience:
  - Used OpenAI GPT-4 and LangChain for document summaries (70% length reduction).
  - Integrated a vector database for RAG, achieving sub-second query response and 20% accuracy improvement.
  - Deployed LLM services into production via a Flask-based web application.

Aman's Professional Experience:

${experiences.map(job => `
- Role: ${job.role}
  Company: ${job.company}
  Dates: ${job.dates}
  Location: ${job.location}
  Key Points:
  ${job.points.map(point => `  - ${point}`).join('\n')}
  Skills: ${job.skills.join(', ')}
`).join('\n')}

Aman's Projects:

${projects.map(project => `
- Project: ${project.title}
  Description: ${project.description}
  GitHub: ${project.github || 'Not specified'}
  Tags: ${project.tags.join(', ')}
`).join('\n')}
`;


export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };
  
  // State for chatbot modal
  const [isChatOpen, setIsChatOpen] = useState(false);

  // State for manual navigation
  const [manualNav, setManualNav] =useState(false);
  
  const handleSetActiveSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref.current) {
      setManualNav(true); // Disable observer logic temporarily
      setActiveSection(sectionId);
      ref.current.scrollIntoView({ behavior: 'smooth' });
      
      // Re-enable observer logic after scroll
      setTimeout(() => {
        setManualNav(false);
      }, 1000); // 1s timeout
    }
  };
  
  // Effect for scroll-spy
  useEffect(() => {
    if (manualNav) return; // Don't update if user just clicked

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observerCallback = (entries) => {
      if (manualNav) return; // Double check
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [manualNav]); // Re-run when manualNav changes


  return (
    <div className="bg-black text-gray-100 font-sans cursor-none selection:bg-cyan-400">
      <CustomCursor />
      <Navbar activeSection={activeSection} setActiveSection={handleSetActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRefs.home} id="home">
          <Home setActiveSection={handleSetActiveSection} />
        </div>
        <div ref={sectionRefs.about} id="about">
          <About />
        </div>
        <div ref={sectionRefs.experience} id="experience">
          <Experience />
        </div>
        <div ref={sectionRefs.projects} id="projects">
          <Projects />
        </div>
        <div ref={sectionRefs.contact} id="contact">
          <Contact />
        </div>
      </main>
      
      <Footer />
      
      {/* Render Chatbot components */}
      <ChatbotFAB onClick={() => setIsChatOpen(true)} />
      <ChatbotModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        portfolioContext={portfolioContext}
      />
    </div>
  );
}

