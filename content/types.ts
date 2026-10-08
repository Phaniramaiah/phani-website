export const iconNames = [
  'cloud',
  'pipeline',
  'container',
  'shield',
  'code',
  'chart',
  'server',
  'layers',
] as const;

export type IconName = (typeof iconNames)[number];

export type PipelineStage = {
  id: string;
  label: string;
  detail: string;
};

export type Profile = {
  name: string;
  role: string;
  eyebrow: string;
  statement: string;
  summary: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  photoUrl: string;
  location: string;
  company: string;
  tenure: string;
  educationDegree: string;
  educationSchool: string;
  educationYear: string;
  strengths: readonly string[];
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  detail: string;
  order: number;
};

export type Achievement = {
  id: string;
  title: string;
  impact: string;
  icon: IconName;
  tools: readonly string[];
  order: number;
};

export const themeNames = ['ember', 'ocean', 'violet', 'emerald'] as const;
export type ThemeName = (typeof themeNames)[number];

export const motionLevels = ['full', 'subtle', 'off'] as const;
export type MotionLevel = (typeof motionLevels)[number];

export const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === 'string' && (themeNames as readonly string[]).includes(value);

export const isMotionLevel = (value: unknown): value is MotionLevel =>
  typeof value === 'string' && (motionLevels as readonly string[]).includes(value);

export type SiteSettings = {
  theme: ThemeName;
  motion: MotionLevel;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialUrl: string;
  order: number;
};

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  icon: IconName;
  order: number;
  skills: readonly string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
  highlights: readonly string[];
  order: number;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  role: string;
  summary: string;
  environment: readonly string[];
  responsibilities: readonly string[];
  pipeline: readonly PipelineStage[];
  order: number;
};

export type PortfolioContent = {
  profile: Profile;
  stats: readonly Stat[];
  settings: SiteSettings;
  achievements: readonly Achievement[];
  certifications: readonly Certification[];
  skillGroups: readonly SkillGroup[];
  experience: readonly Experience[];
  projects: readonly Project[];
};

export const isIconName = (value: unknown): value is IconName =>
  typeof value === 'string' && iconNames.some((icon) => icon === value);
