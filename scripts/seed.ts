import { createClient } from '@sanity/client';
import { portfolioContent } from '../content/portfolio';
import type {
  Achievement,
  Certification,
  Experience,
  PipelineStage,
  Project,
  SkillGroup,
  Stat,
} from '../content/types';

type PipelineWrite = {
  _key: string;
  label: string;
  detail: string;
};

type SanityDocument = {
  _id: string;
  _type: string;
} & Record<string, unknown>;

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing ${name}. Add it to .env before seeding Sanity.`);
  }

  return value.trim();
};

const pipelineDocuments = (stages: readonly PipelineStage[]): PipelineWrite[] =>
  stages.map((stage) => ({
    _key: stage.id,
    label: stage.label,
    detail: stage.detail,
  }));

const statDocument = (entry: Stat): SanityDocument => ({
  _id: entry.id,
  _type: 'stat',
  value: entry.value,
  label: entry.label,
  detail: entry.detail,
  order: entry.order,
});

const certificationDocument = (entry: Certification): SanityDocument => ({
  _id: entry.id,
  _type: 'certification',
  name: entry.name,
  issuer: entry.issuer,
  issued: entry.issued,
  expires: entry.expires,
  credentialUrl: entry.credentialUrl,
  order: entry.order,
});

const achievementDocument = (entry: Achievement): SanityDocument => ({
  _id: entry.id,
  _type: 'achievement',
  title: entry.title,
  impact: entry.impact,
  icon: entry.icon,
  tools: [...entry.tools],
  order: entry.order,
});

const skillDocument = (group: SkillGroup): SanityDocument => ({
  _id: group.id,
  _type: 'skillGroup',
  title: group.title,
  blurb: group.blurb,
  icon: group.icon,
  order: group.order,
  skills: [...group.skills],
});

const experienceDocument = (role: Experience): SanityDocument => ({
  _id: role.id,
  _type: 'experience',
  company: role.company,
  role: role.role,
  location: role.location,
  start: role.start,
  end: role.end,
  current: role.current,
  summary: role.summary,
  highlights: [...role.highlights],
  order: role.order,
});

const projectDocument = (item: Project): SanityDocument => ({
  _id: item.id,
  _type: 'project',
  title: item.title,
  client: item.client,
  role: item.role,
  summary: item.summary,
  engine: item.engine,
  ...(item.siteUrl ? { siteUrl: item.siteUrl } : {}),
  environment: [...item.environment],
  responsibilities: [...item.responsibilities],
  pipeline: pipelineDocuments(item.pipeline),
  order: item.order,
});

const documents = (): SanityDocument[] => {
  const { profile, settings } = portfolioContent;

  return [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      theme: settings.theme,
      motion: settings.motion,
    },
    {
      _id: 'profile',
      _type: 'profile',
      name: profile.name,
      role: profile.role,
      eyebrow: profile.eyebrow,
      statement: profile.statement,
      summary: profile.summary,
      email: profile.email,
      phone: profile.phone,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
      location: profile.location,
      company: profile.company,
      tenure: profile.tenure,
      educationDegree: profile.educationDegree,
      educationSchool: profile.educationSchool,
      educationYear: profile.educationYear,
      strengths: [...profile.strengths],
    },
    ...portfolioContent.stats.map(statDocument),
    ...portfolioContent.certifications.map(certificationDocument),
    ...portfolioContent.achievements.map(achievementDocument),
    ...portfolioContent.skillGroups.map(skillDocument),
    ...portfolioContent.experience.map(experienceDocument),
    ...portfolioContent.projects.map(projectDocument),
  ];
};

const main = async (): Promise<void> => {
  const client = createClient({
    projectId: requireEnv('SANITY_STUDIO_PROJECT_ID'),
    dataset: process.env.SANITY_STUDIO_DATASET?.trim() || 'production',
    apiVersion: process.env.VITE_SANITY_API_VERSION?.trim() || '2026-10-08',
    token: requireEnv('SANITY_API_WRITE_TOKEN'),
    useCdn: false,
  });

  const payload = documents();

  for (const document of payload) {
    await client.createOrReplace(document);
  }

  console.info(`Seeded ${payload.length} portfolio documents.`);
};

const run = async (): Promise<void> => {
  try {
    await main();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Seed failed';
    console.error(message);
    process.exitCode = 1;
  }
};

void run();
