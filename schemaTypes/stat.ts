import { defineField, defineType } from 'sanity';

export const stat = defineType({
  name: 'stat',
  title: 'Highlight stat',
  type: 'document',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required().max(8) }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'detail', title: 'Detail', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
});
