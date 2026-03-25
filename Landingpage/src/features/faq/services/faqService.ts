import { fetchFromApi } from '@/services/apiClient';
import { FaqData, LandingPageData } from '@/types/landing';

export async function getFaqData(): Promise<FaqData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.faq;
}
