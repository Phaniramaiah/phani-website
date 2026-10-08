import { defineField, defineType } from 'sanity';
import { motionLevels, themeNames } from '../content/types';

const themeTitles = {
  ember: 'Ember (orange and lime)',
  ocean: 'Ocean (cyan and blue)',
  violet: 'Violet (purple and pink)',
  emerald: 'Emerald (green and gold)',
} as const;

const motionTitles = {
  full: 'Full: reveals, spotlight, aurora, counters',
  subtle: 'Subtle: reveals and counters only',
  off: 'Off: no animation',
} as const;

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'theme',
      title: 'Colour theme',
      type: 'string',
      initialValue: 'ember',
      options: {
        list: themeNames.map((value) => ({ value, title: themeTitles[value] })),
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'motion',
      title: 'Animation level',
      type: 'string',
      description: 'Visitors who ask their OS for reduced motion always get "Off".',
      initialValue: 'full',
      options: {
        list: motionLevels.map((value) => ({ value, title: motionTitles[value] })),
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
