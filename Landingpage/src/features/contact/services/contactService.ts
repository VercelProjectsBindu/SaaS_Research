import { fetchFromApi } from '@/services/apiClient';
import { ContactData, LandingPageData } from '@/types/landing';

export async function getContactData(): Promise<ContactData> {
  const data = await fetchFromApi<LandingPageData>('/data');
  return data.contact;
}
