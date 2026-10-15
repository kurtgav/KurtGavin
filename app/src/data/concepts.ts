import { confidentialProjects } from './portfolio';

export const concepts = confidentialProjects.map(project => ({
  slug: project.slug,
  title: project.title,
  description: project.description,
  image: `/projects/${project.slug}.png`,
}));

export type Concept = (typeof concepts)[number];
