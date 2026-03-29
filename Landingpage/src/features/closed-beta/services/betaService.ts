import { fetchFromApi } from '@/services/apiClient';
import { BetaData, LandingPageData } from '@/types/landing';

export async function getBetaData(): Promise<BetaData> {
  return fetchFromApi<BetaData>('/data/beta');
}
