import React from 'react';
import SectionHeader from './SectionHeader';
import { MailIcon, PhoneIcon } from './icons';

const Contact = () => {
    return (
        <section id="contact" className="py-24">
            <SectionHeader title="Contact" subtitle="Get In Touch" />
            <div className="max-w-lg mx-auto text-center">
                <p className="text-lg text-gray-300 mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    Feel free to reach out to me.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a
                        href="mailto:amanmotwani0021@gmail.com"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-cyan-400 bg-gray-900 hover:bg-gray-800 transition-all duration-200"
                        data-interactive
                    >
                        <MailIcon className="w-5 h-5 mr-3" />
                        amanmotwani0021@gmail.com
                    </a>
                    <div
                        className="inline-flex items-center whitespace-nowrap justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-400 bg-gray-900 cursor-default"
                        data-interactive
                    >
                        <PhoneIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-gray-400 text-base font-medium">+91-8956572277</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;