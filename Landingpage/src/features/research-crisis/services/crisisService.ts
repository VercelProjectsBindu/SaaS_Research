import { fetchFromApi } from '@/services/apiClient';
import { CrisisData, LandingPageData } from '@/types/landing';

export async function getCrisisData(): Promise<CrisisData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.crisis;
}
