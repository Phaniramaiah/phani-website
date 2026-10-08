import type { SchemaTypeDefinition } from 'sanity';
import { achievement } from './achievement';
import { certification } from './certification';
import { experience } from './experience';
import { profile } from './profile';
import { project } from './project';
import { siteSettings } from './siteSettings';
import { skillGroup } from './skillGroup';
import { stat } from './stat';

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  profile,
  stat,
  certification,
  achievement,
  skillGroup,
  experience,
  project,
];
