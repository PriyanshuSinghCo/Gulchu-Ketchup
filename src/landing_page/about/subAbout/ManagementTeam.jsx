import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Mr. Praveen Kumar Singh',
    role: 'Founder & Managing Director',
    image: '/director.jpg',
    linkedin: 'https://linkedin.com/in/praveen-kumar',
    email: 'praveen@example.com',
    bio: 'Praveen brings 20+ years of agro-industrial experience and leads with a vision of innovation and trust.',
  },
  {
    name: 'Ms. XYZ',
    role: 'Head of Marketing',
    image: '/richa.jpg',
    linkedin: 'https://linkedin.com/in/richa-sharma',
    email: 'richa@example.com',
    bio: 'Richa drives brand storytelling and growth marketing strategies that elevate Gulchu globally.',
  },
  {
    name: 'Mr. Banrakash',
    role: 'Operations Manager',
    image: '/sandeep.jpg',
    linkedin: 'https://linkedin.com/in/sandeep-verma',
    email: 'sandeep@example.com',
    bio: 'Sandeep oversees supply chain and production operations with a strong focus on quality and efficiency.',
  },
];

function ManagementTeam() {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className=" px-6 py-16 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Our Management Team</h2>
        <p className="text-lg text-gray-600 mb-12">
          Meet the passionate minds behind Kaushik Agro Food — driving innovation, quality, and trust across every product.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>

              {/* Hover Email */}
              <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition ">
                {member.email}
              </p>

              {/* Social Icons */}
              <div className="mt-4 flex justify-center space-x-4 text-xl text-gray-600">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="hover:text-blue-700" />
                </a>
                <a href={`mailto:${member.email}`}>
                  <FaEnvelope className="hover:text-red-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="text-center mt-6">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow"
              />
              <h3 className="text-2xl font-bold mb-1">{selectedMember.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{selectedMember.role}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedMember.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ManagementTeam;
