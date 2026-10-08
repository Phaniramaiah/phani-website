import { useEffect, useState } from 'react';
import { portfolioContent } from '../../content/portfolio';
import type { PortfolioContent } from '../../content/types';
import { sanityClient } from '../sanity/client';
import { loadPortfolio } from '../sanity/loadPortfolio';

export type PortfolioSource = 'local' | 'sanity';

type PortfolioState = {
  content: PortfolioContent;
  source: PortfolioSource;
  unavailableMessage: string;
};

export const usePortfolio = (): PortfolioState => {
  const [content, setContent] = useState<PortfolioContent>(portfolioContent);
  const [source, setSource] = useState<PortfolioSource>('local');
  const [unavailableMessage, setUnavailableMessage] = useState<string>('');

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (!sanityClient) {
        return;
      }

      try {
        const next = await loadPortfolio();
        setContent(next);
        setSource('sanity');
        setUnavailableMessage('');
      } catch (error: unknown) {
        const reason = error instanceof Error ? error.message : 'Sanity request failed';
        setContent(portfolioContent);
        setSource('local');
        setUnavailableMessage(reason);
      }
    };

    void run();
  }, []);

  return { content, source, unavailableMessage };
};
