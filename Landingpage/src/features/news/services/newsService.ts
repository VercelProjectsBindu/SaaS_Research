import { fetchFromApi } from '@/services/apiClient';
import { NewsData, LandingPageData } from '@/types/landing';

export async function getNewsData(): Promise<NewsData> {
  return fetchFromApi<NewsData>('/data/news');
}
