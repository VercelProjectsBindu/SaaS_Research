import { fetchFromApi } from '@/services/apiClient';
import { ContactData, LandingPageData } from '@/types/landing';

export async function getContactData(): Promise<ContactData> {
  return fetchFromApi<ContactData>('/data/contact');
}
