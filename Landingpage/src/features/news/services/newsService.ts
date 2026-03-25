import { fetchFromApi } from '@/services/apiClient';
import { NewsData, LandingPageData } from '@/types/landing';

export async function getNewsData(): Promise<NewsData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.news;
}
