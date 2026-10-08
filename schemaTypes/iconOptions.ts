import { iconNames } from '../content/types';

export const iconOptions: { title: string; value: string }[] = iconNames.map((name) => ({
  title: name.charAt(0).toUpperCase() + name.slice(1),
  value: name,
}));
