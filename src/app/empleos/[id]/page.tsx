import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { JobDetailView } from '@/components/jobs/JobDetailView';
import { JobPostingJsonLd } from '@/components/jobs/JobPostingJsonLd';

export const dynamic = 'force-dynamic';

interface JobDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  if (!job) {
    return {
      title: 'Oferta no encontrada',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/empleos/${job.id}`;

  return {
    title: `${job.title} en ${job.companyName} (${job.city}, ${job.zone})`,
    description: `Convocatoria de empleo: ${job.title} en ${job.companyName}. Ubicación: ${job.city} (${job.zone}). Jornada: ${job.workSchedule}. Modalidad: ${job.modality}. Postulación directa y gratuita.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${job.title} | ${job.companyName} (${job.city})`,
      description: job.description.substring(0, 160),
      url: canonicalUrl,
      type: 'article',
      publishedTime: new Date(job.publishedAt).toISOString(),
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { company: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      {/* Marcado estructurado Schema.org JobPosting para Google Jobs */}
      <JobPostingJsonLd
        job={{
          id: job.id,
          title: job.title,
          description: job.description,
          companyName: job.companyName,
          city: job.city,
          zone: job.zone,
          workSchedule: job.workSchedule,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          salaryCurrency: job.salaryCurrency,
          salaryPeriod: job.salaryPeriod,
          publishedAt: job.publishedAt,
          expiresAt: job.expiresAt,
          sourceUrl: job.sourceUrl,
        }}
      />

      <JobDetailView job={job} />
    </div>
  );
}
