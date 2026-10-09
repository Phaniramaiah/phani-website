import { portfolioContent } from '../../content/portfolio';
import {
  isIconName,
  isMotionLevel,
  isThemeName,
  type SiteSettings,
  type Achievement,
  type Certification,
  type Experience,
  type PortfolioContent,
  type Profile,
  type Project,
  type SkillGroup,
  type Stat,
} from '../../content/types';
import { portfolioQuery, sanityClient } from './client';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;

const readBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback;

const readNumber = (value: unknown, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const readPhotoUrl = (value: unknown, fallback: string): string => {
  const url = readString(value, '');
  return url.startsWith('https://cdn.sanity.io/') ? `${url}?w=800&h=800&fit=crop&auto=format` : fallback;
};

const readStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
};

const readProfile = (value: unknown, fallback: Profile): Profile => {
  if (!isRecord(value)) {
    return fallback;
  }

  return {
    name: readString(value.name, fallback.name),
    role: readString(value.role, fallback.role),
    eyebrow: readString(value.eyebrow, fallback.eyebrow),
    statement: readString(value.statement, fallback.statement),
    summary: readString(value.summary, fallback.summary),
    email: readString(value.email, fallback.email),
    phone: readString(value.phone, fallback.phone),
    githubUrl: readString(value.githubUrl, fallback.githubUrl),
    linkedinUrl: readString(value.linkedinUrl, fallback.linkedinUrl),
    photoUrl: readPhotoUrl(value.photoUrl, fallback.photoUrl),
    location: readString(value.location, fallback.location),
    company: readString(value.company, fallback.company),
    tenure: readString(value.tenure, fallback.tenure),
    educationDegree: readString(value.educationDegree, fallback.educationDegree),
    educationSchool: readString(value.educationSchool, fallback.educationSchool),
    educationYear: readString(value.educationYear, fallback.educationYear),
    strengths: readStringList(value.strengths).length > 0 ? readStringList(value.strengths) : fallback.strengths,
  };
};

const readStat = (value: unknown): Stat | null => {
  if (!isRecord(value)) {
    return null;
  }

  const statValue = readString(value.value, '');
  const label = readString(value.label, '');

  if (statValue.length === 0 || label.length === 0) {
    return null;
  }

  return {
    id: readString(value.id, label),
    value: statValue,
    label,
    detail: readString(value.detail, ''),
    order: readNumber(value.order, 0),
  };
};

const readCertification = (value: unknown): Certification | null => {
  if (!isRecord(value)) {
    return null;
  }

  const name = readString(value.name, '');
  const issuer = readString(value.issuer, '');

  if (name.length === 0 || issuer.length === 0) {
    return null;
  }

  const credentialUrl = readString(value.credentialUrl, '');

  return {
    id: readString(value.id, name),
    name,
    issuer,
    issued: readString(value.issued, ''),
    expires: readString(value.expires, ''),
    credentialUrl: credentialUrl.startsWith('https://') ? credentialUrl : '',
    order: readNumber(value.order, 0),
  };
};

const readAchievement = (value: unknown): Achievement | null => {
  if (!isRecord(value)) {
    return null;
  }

  const title = readString(value.title, '');
  const impact = readString(value.impact, '');

  if (title.length === 0 || impact.length === 0) {
    return null;
  }

  return {
    id: readString(value.id, title),
    title,
    impact,
    icon: isIconName(value.icon) ? value.icon : 'cloud',
    tools: readStringList(value.tools),
    order: readNumber(value.order, 0),
  };
};

const readSkillGroup = (value: unknown): SkillGroup | null => {
  if (!isRecord(value)) {
    return null;
  }

  const title = readString(value.title, '');
  const skills = readStringList(value.skills);

  if (title.length === 0 || skills.length === 0) {
    return null;
  }

  return {
    id: readString(value.id, title),
    title,
    blurb: readString(value.blurb, ''),
    icon: isIconName(value.icon) ? value.icon : 'cloud',
    order: readNumber(value.order, 0),
    skills,
  };
};

const readExperience = (value: unknown): Experience | null => {
  if (!isRecord(value)) {
    return null;
  }

  const company = readString(value.company, '');
  const highlights = readStringList(value.highlights);

  if (company.length === 0 || highlights.length === 0) {
    return null;
  }

  return {
    id: readString(value.id, company),
    company,
    role: readString(value.role, ''),
    location: readString(value.location, ''),
    start: readString(value.start, ''),
    end: readString(value.end, ''),
    current: readBoolean(value.current, false),
    summary: readString(value.summary, ''),
    highlights,
    order: readNumber(value.order, 0),
  };
};

const readProject = (value: unknown): Project | null => {
  if (!isRecord(value)) {
    return null;
  }

  const title = readString(value.title, '');
  const responsibilities = readStringList(value.responsibilities);
  const environment = readStringList(value.environment);
  const pipeline = Array.isArray(value.pipeline)
    ? value.pipeline.flatMap((stage, index) => {
        if (!isRecord(stage)) {
          return [];
        }

        const label = readString(stage.label, '');
        const detail = readString(stage.detail, '');

        if (label.length === 0 || detail.length === 0) {
          return [];
        }

        return [
          {
            id: readString(stage.id, `${label}-${index}`),
            label,
            detail,
          },
        ];
      })
    : [];

  if (title.length === 0 || responsibilities.length === 0) {
    return null;
  }

  const siteUrl = readString(value.siteUrl, '');

  return {
    id: readString(value.id, title),
    title,
    client: readString(value.client, ''),
    role: readString(value.role, ''),
    summary: readString(value.summary, ''),
    engine: readString(value.engine, 'CI/CD'),
    ...(siteUrl.length > 0 ? { siteUrl } : {}),
    environment,
    responsibilities,
    pipeline,
    order: readNumber(value.order, 0),
  };
};

const byOrder = (left: { order: number }, right: { order: number }): number => left.order - right.order;

const readSettings = (value: unknown, fallback: SiteSettings): SiteSettings => {
  if (!isRecord(value)) {
    return fallback;
  }

  return {
    theme: isThemeName(value.theme) ? value.theme : fallback.theme,
    motion: isMotionLevel(value.motion) ? value.motion : fallback.motion,
  };
};

export const mergePortfolio = (payload: unknown): PortfolioContent => {
  if (!isRecord(payload)) {
    return portfolioContent;
  }

  const stats = Array.isArray(payload.stats)
    ? payload.stats.flatMap((item) => {
        const entry = readStat(item);
        return entry ? [entry] : [];
      })
    : [];

  const certifications = Array.isArray(payload.certifications)
    ? payload.certifications.flatMap((item) => {
        const entry = readCertification(item);
        return entry ? [entry] : [];
      })
    : [];

  const achievements = Array.isArray(payload.achievements)
    ? payload.achievements.flatMap((item) => {
        const entry = readAchievement(item);
        return entry ? [entry] : [];
      })
    : [];

  const skillGroups = Array.isArray(payload.skillGroups)
    ? payload.skillGroups.flatMap((item) => {
        const group = readSkillGroup(item);
        return group ? [group] : [];
      })
    : [];

  const experience = Array.isArray(payload.experience)
    ? payload.experience.flatMap((item) => {
        const role = readExperience(item);
        return role ? [role] : [];
      })
    : [];

  const projects = Array.isArray(payload.projects)
    ? payload.projects.flatMap((item) => {
        const project = readProject(item);
        return project ? [project] : [];
      })
    : [];

  return {
    settings: readSettings(payload.settings, portfolioContent.settings),
    profile: readProfile(payload.profile, portfolioContent.profile),
    stats: stats.length > 0 ? stats.sort(byOrder) : portfolioContent.stats,
    achievements: achievements.length > 0 ? achievements.sort(byOrder) : portfolioContent.achievements,
    certifications:
      certifications.length > 0 ? certifications.sort(byOrder) : portfolioContent.certifications,
    skillGroups: skillGroups.length > 0 ? skillGroups.sort(byOrder) : portfolioContent.skillGroups,
    experience: experience.length > 0 ? experience.sort(byOrder) : portfolioContent.experience,
    projects: projects.length > 0 ? projects.sort(byOrder) : portfolioContent.projects,
  };
};

export const loadPortfolio = async (): Promise<PortfolioContent> => {
  if (!sanityClient) {
    return portfolioContent;
  }

  const payload = await sanityClient.fetch<unknown>(portfolioQuery);
  return mergePortfolio(payload);
};
