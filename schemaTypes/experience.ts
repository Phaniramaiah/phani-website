import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'start', title: 'Start', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'end', title: 'End', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'current', title: 'Current role', type: 'boolean', initialValue: false }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
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
    select: { title: 'company', subtitle: 'role' },
  },
});
