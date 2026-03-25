import { fetchFromApi } from '@/services/apiClient';
import { ProcessData, LandingPageData } from '@/types/landing';

export async function getProcessData(): Promise<ProcessData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.process;
}
