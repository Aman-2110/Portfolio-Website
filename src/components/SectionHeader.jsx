import React from 'react';

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">{subtitle}</h2>
    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">{title}</p>
  </div>
);

export default SectionHeader;