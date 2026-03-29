import { fetchFromApi } from '@/services/apiClient';
import { NavigationData, LandingPageData } from '@/types/landing';

export async function getNavigationData(): Promise<NavigationData> {
  return fetchFromApi<NavigationData>('/data/navigation');
}
