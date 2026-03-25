import { fetchFromApi } from '@/services/apiClient';
import { FooterData, LandingPageData } from '@/types/landing';

export async function getFooterData(): Promise<FooterData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.footer;
}
