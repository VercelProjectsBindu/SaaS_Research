import { fetchFromApi } from '@/services/apiClient';
import { HeroData, LandingPageData, FeatureCard } from '@/types/landing';

export interface HeroFullData {
  content: HeroData;
  cards: FeatureCard[];
}

export async function getHeroData(): Promise<HeroFullData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return {
    content: data.hero,
    cards: data.featureCards
  };
}
