import { fetchFromApi } from '@/services/apiClient';
import { NavigationData, LandingPageData } from '@/types/landing';

export async function getNavigationData(): Promise<NavigationData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.navigation;
}
