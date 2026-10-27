export interface JobForSchema {
  id: string;
  title: string;
  description: string;
  companyName: string;
  city: string;
  zone?: string;
  workSchedule: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;
  salaryPeriod?: string | null;
  publishedAt: Date | string;
  expiresAt?: Date | string | null;
  sourceUrl?: string | null;
}

export function buildJobPostingJsonLd(job: JobForSchema) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Mapear horario de trabajo a Schema.org employmentType
  let employmentType = 'FULL_TIME';
  if (job.workSchedule === 'Medio Tiempo') employmentType = 'PART_TIME';
  if (job.workSchedule === 'Por Horas') employmentType = 'OTHER';
  if (job.title.toLowerCase().includes('pasantía') || job.title.toLowerCase().includes('pasante')) {
    employmentType = 'INTERN';
  }

  const publishedDate = new Date(job.publishedAt).toISOString().split('T')[0];
  
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.description,
    'identifier': {
      '@type': 'PropertyValue',
      'name': job.companyName,
      'value': job.id,
    },
    'datePosted': publishedDate,
    'employmentType': employmentType,
    'hiringOrganization': {
      '@type': 'Organization',
      'name': job.companyName,
      ...(job.sourceUrl ? { 'sameAs': job.sourceUrl } : {}),
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': job.city,
        'addressRegion': 'La Paz',
        'addressCountry': 'BO',
        ...(job.zone ? { 'streetAddress': job.zone } : {}),
      },
    },
  };

  // Fecha de vencimiento si existe
  if (job.expiresAt) {
    schema['validThrough'] = new Date(job.expiresAt).toISOString();
  }

  // Salario únicamente si está disponible y es válido
  if (job.salaryMin && job.salaryMin > 0) {
    schema['baseSalary'] = {
      '@type': 'MonetaryAmount',
      'currency': job.salaryCurrency || 'BOB',
      'value': {
        '@type': 'QuantitativeValue',
        'value': job.salaryMin,
        ...(job.salaryMax ? { 'maxValue': job.salaryMax } : {}),
        'unitText': job.salaryPeriod === 'Por hora' ? 'HOUR' : 'MONTH',
      },
    };
  }

  return schema;
}
