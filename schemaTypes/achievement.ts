import { defineField, defineType } from 'sanity';
import { iconOptions } from './iconOptions';

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'impact', title: 'Impact', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: iconOptions, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'impact' },
  },
});
