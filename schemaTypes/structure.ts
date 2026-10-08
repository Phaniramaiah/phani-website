import type { StructureResolver } from 'sanity/structure';

const hiddenTypes = new Set([
  'siteSettings',
  'profile',
  'stat',
  'certification',
  'achievement',
  'skillGroup',
  'experience',
  'project',
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Profile')
        .id('profile')
        .child(S.document().schemaType('profile').documentId('profile')),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('stat').title('Highlight stats'),
      S.documentTypeListItem('certification').title('Certifications'),
      S.documentTypeListItem('achievement').title('Achievements'),
      S.documentTypeListItem('skillGroup').title('Skill groups'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('project').title('Projects'),
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId() ?? '')),
    ]);
