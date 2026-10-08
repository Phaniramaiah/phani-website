import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? '1f4wfto1',
    dataset: process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production',
  },
  studioHost: 'phani-kumar',
});
