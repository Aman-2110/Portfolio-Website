import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let f_x = 0, f_y = 0;
    let pos_x = 0, pos_y = 0;

    // This loop runs every frame to "follow" the cursor
    const loop = () => {
      f_x += (pos_x - f_x) * 0.12; // Follower speed
      f_y += (pos_y - f_y) * 0.12;
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${f_x - 12}px, ${f_y - 12}px)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos_x - 2}px, ${pos_y - 2}px)`;
      }
      requestAnimationFrame(loop);
    };
    
    // Update target position
    const setMousePos = (e) => {
      pos_x = e.clientX;
      pos_y = e.clientY;
    };

    window.addEventListener('mousemove', setMousePos);
    loop(); // Start the animation loop

    // Check for interactive elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-interactive]')) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-interactive]')) {
        setIsHovering(false);
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', setMousePos);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {/* Main dot */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-opacity duration-200
                    ${isHovering ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Follower circle */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out
                    ${isHovering 
                      ? 'w-10 h-10 bg-white/20 border-white' // Grow effect
                      : 'border-2 border-cyan-400' // Default state
                    }`}
      />
    </>
  );
};

export default CustomCursor;