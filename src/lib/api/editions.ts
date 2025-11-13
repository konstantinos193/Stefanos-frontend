import { apiClient } from './client';

export interface EditionCategory {
  id: string;
  title: {
    gr: string;
    en: string;
  };
  description: {
    gr: string;
    en: string;
  };
  count: number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'gray';
}

export interface CategoriesResponse {
  success: boolean;
  data: EditionCategory[];
}

export const editionsApi = {
  async getCategoriesWithCounts(): Promise<CategoriesResponse> {
    return apiClient.get('/editions/categories/summary');
  },
};

