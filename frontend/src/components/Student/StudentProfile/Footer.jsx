import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>© {new Date().getFullYear()} Internspirit. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
