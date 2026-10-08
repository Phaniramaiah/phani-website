import { defineField, defineType } from 'sanity';

const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'issuer', title: 'Issuer', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'issued',
      title: 'Issued (YYYY-MM)',
      type: 'string',
      validation: (rule) => rule.required().regex(monthPattern, { name: 'year-month' }),
    }),
    defineField({
      name: 'expires',
      title: 'Expires (YYYY-MM)',
      type: 'string',
      description: 'Leave empty if the certification does not expire.',
      validation: (rule) => rule.regex(monthPattern, { name: 'year-month' }),
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'issuer' },
  },
});
