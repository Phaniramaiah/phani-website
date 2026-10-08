import type { ReactElement } from 'react';
import { sectionIds } from '../content/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { useEffectiveMotion, useReveal, useSiteAppearance, useSpotlight } from './hooks/useMotion';
import { usePortfolio } from './hooks/usePortfolio';
import { About } from './components/About';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Skills } from './components/Skills';
import { Stats } from './components/Stats';
import { Work } from './components/Work';

export const App = (): ReactElement => {
  const { content, source, unavailableMessage } = usePortfolio();
  const active = useActiveSection(sectionIds);
  const motion = useEffectiveMotion(content.settings.motion);
  const animate = motion !== 'off';
  const labels = content.skillGroups.flatMap((group) => group.skills);
  useSiteAppearance(content.settings, motion);
  useReveal(motion, source);
  useSpotlight(motion);

  return (
    <div className="page" data-content={source}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Header active={active} githubUrl={content.profile.githubUrl} linkedinUrl={content.profile.linkedinUrl} />
      <main>
        <Hero animate={animate} certifications={content.certifications} profile={content.profile} />
        <Stats animate={animate} stats={content.stats} />
        <Marquee labels={labels} />
        <About profile={content.profile} />
        <Skills groups={content.skillGroups} strengths={content.profile.strengths} />
        <Certifications certifications={content.certifications} />
        <Achievements achievements={content.achievements} />
        <Experience roles={content.experience} />
        <Work projects={content.projects} />
        <Contact profile={content.profile} />
      </main>
      <Footer profile={content.profile} />
      {unavailableMessage.length > 0 ? (
        <p className="sanity-note" role="status">
          Showing the portfolio bundled with this site.
          {import.meta.env.DEV ? ` ${unavailableMessage}` : ''}
        </p>
      ) : null}
    </div>
  );
};
