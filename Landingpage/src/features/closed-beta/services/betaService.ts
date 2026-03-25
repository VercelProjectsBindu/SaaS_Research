import { fetchFromApi } from '@/services/apiClient';
import { BetaData, LandingPageData } from '@/types/landing';

export async function getBetaData(): Promise<BetaData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.beta;
}
