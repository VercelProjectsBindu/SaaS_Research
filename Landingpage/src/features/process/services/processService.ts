import { fetchFromApi } from '@/services/apiClient';
import { ProcessData, LandingPageData } from '@/types/landing';

export async function getProcessData(): Promise<ProcessData> {
  return fetchFromApi<ProcessData>('/data/process');
}
