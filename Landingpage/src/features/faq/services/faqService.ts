import { fetchFromApi } from '@/services/apiClient';
import { FaqData, LandingPageData } from '@/types/landing';

export async function getFaqData(): Promise<FaqData> {
  return fetchFromApi<FaqData>('/data/faq');
}
