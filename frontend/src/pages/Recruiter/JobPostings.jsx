import React from 'react';
import JobPostCard from '../../components/Recruiter/JobPosting/JobPostCard';

export default function JobPostings() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-gray-800">Job Postings</h1>
      <JobPostCard />
      {/* You can add more <JobPostCard /> as needed */}
    </div>
  );
}
