import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-10-08';

export const hasSanityProject = projectId.trim().length > 0;

export const sanityClient: SanityClient | null = hasSanityProject
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export const portfolioQuery = `{
  "settings": *[_type == "siteSettings"][0]{ theme, motion },
  "profile": *[_type == "profile"][0]{
    name, role, eyebrow, statement, summary, email, phone, githubUrl, linkedinUrl,
    "photoUrl": photo.asset->url,
    location, company, tenure, educationDegree, educationSchool, educationYear, strengths
  },
  "stats": *[_type == "stat"] | order(order asc) {
    "id": _id, value, label, detail, order
  },
  "certifications": *[_type == "certification"] | order(order asc) {
    "id": _id, name, issuer, issued, expires, credentialUrl, order
  },
  "achievements": *[_type == "achievement"] | order(order asc) {
    "id": _id, title, impact, icon, tools, order
  },
  "skillGroups": *[_type == "skillGroup"] | order(order asc) {
    "id": _id, title, blurb, icon, order, skills
  },
  "experience": *[_type == "experience"] | order(order asc) {
    "id": _id, company, role, location, start, end, current, summary, highlights, order
  },
  "projects": *[_type == "project"] | order(order asc) {
    "id": _id, title, client, role, summary, engine, siteUrl, environment, responsibilities, order,
    pipeline[]{ "id": _key, label, detail }
  }
}`;
