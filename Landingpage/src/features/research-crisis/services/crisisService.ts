import { fetchFromApi } from '@/services/apiClient';
import { CrisisData, LandingPageData } from '@/types/landing';

export async function getCrisisData(): Promise<CrisisData> {
  return fetchFromApi<CrisisData>('/data/crisis');
}
