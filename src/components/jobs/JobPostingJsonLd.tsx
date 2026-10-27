import React from 'react';
import { buildJobPostingJsonLd, JobForSchema } from '@/lib/seo';

export const JobPostingJsonLd: React.FC<{ job: JobForSchema }> = ({ job }) => {
  const schema = buildJobPostingJsonLd(job);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
