import React from 'react';
import ApplicantCard from '../../components/Recruiter/Applicants/ApplicantCard'

function App() {
  return (
    <div className="bg-white min-h-screen">
      {/* Heading Div with Background */}
      <div className="bg-blue-600 text-white p-4 w-full">
        <h1 className="text-3xl font-bold text-center">
          Applicant List
        </h1>
      </div>

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl p-4">
          {/* Applicant Cards */}
          <ApplicantCard />
        </div>
      </div>
    </div>
  );
}

export default App;
