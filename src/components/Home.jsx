import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const Home = ({ setActiveSection }) => {
  const [tagline, setTagline] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Using useRef to hold taglines array to avoid re-creation on re-renders
  const taglinesRef = useRef([
    "Software Engineer",
    "IIIT-H Graduate",
    "Passionate Problem Solver",
    "Quick Learner",
  ]);

  useEffect(() => {
    const handleTyping = () => {
      const taglines = taglinesRef.current;
      const i = loopNum % taglines.length;
      const fullText = taglines[i];

      setTagline(
        isDeleting
          ? fullText.substring(0, tagline.length - 1)
          : fullText.substring(0, tagline.length + 1)
      );

      setTypingSpeed(isDeleting ? 20 : 150);

      if (!isDeleting && tagline === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && tagline === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [tagline, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center py-20">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Hi, I'm <span className="text-cyan-400">Aman Motwani</span>
        </h1>
        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 h-8">
          <span className="pr-1">{tagline}</span>
          <span className="border-r-2 border-cyan-400 animate-pulse" style={{ animationDuration: '0.8s' }}></span>
        </p>
        <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
          M.Tech from IIIT-Hyderabad (8.35 CGPA). Proficient in Java, Python, and C++. 
          Passionate about Data Structures, Algorithms, Mathematics, and System Design.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveSection('projects')}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-cyan-400 hover:bg-cyan-500 transition-all duration-200"
            data-interactive
          >
            View Projects
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className="px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-cyan-400 bg-gray-900 hover:bg-gray-800 transition-all duration-200"
            data-interactive
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;