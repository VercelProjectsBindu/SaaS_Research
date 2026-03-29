import { fetchFromApi } from '@/services/apiClient';
import { HeroData, LandingPageData, FeatureCard } from '@/types/landing';

export interface HeroFullData {
  content: HeroData;
  cards: FeatureCard[];
}

export async function getHeroData(): Promise<HeroFullData> {
  const [content, cards] = await Promise.all([
    fetchFromApi<HeroData>('/data/hero'),
    fetchFromApi<FeatureCard[]>('/data/featureCards')
  ]);
  
  return { content, cards };
}
