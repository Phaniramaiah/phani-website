import { defineField, defineType } from 'sanity';
import { iconOptions } from './iconOptions';

export const skillGroup = defineType({
  name: 'skillGroup',
  title: 'Skill group',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: iconOptions, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'blurb' },
  },
});
