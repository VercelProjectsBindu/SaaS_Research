import { fetchFromApi } from '@/services/apiClient';
import { FooterData, LandingPageData } from '@/types/landing';

export async function getFooterData(): Promise<FooterData> {
  return fetchFromApi<FooterData>('/data/footer');
}
