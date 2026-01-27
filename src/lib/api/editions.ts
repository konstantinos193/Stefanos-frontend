import { apiClient } from './client';

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true;

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

const mockCategories: EditionCategory[] = [
  {
    id: 'premium',
    title: {
      gr: 'Premium Έκδοση',
      en: 'Premium Edition',
    },
    description: {
      gr: 'Πλήρης πρόσβαση σε όλες τις λειτουργίες',
      en: 'Full access to all features',
    },
    count: 15,
    icon: '⭐',
    color: 'purple',
  },
  {
    id: 'standard',
    title: {
      gr: 'Standard Έκδοση',
      en: 'Standard Edition',
    },
    description: {
      gr: 'Βασικές λειτουργίες',
      en: 'Basic features',
    },
    count: 25,
    icon: '📘',
    color: 'blue',
  },
  {
    id: 'basic',
    title: {
      gr: 'Basic Έκδοση',
      en: 'Basic Edition',
    },
    description: {
      gr: 'Απλές λειτουργίες',
      en: 'Simple features',
    },
    count: 30,
    icon: '📗',
    color: 'green',
  },
  {
    id: 'enterprise',
    title: {
      gr: 'Enterprise Έκδοση',
      en: 'Enterprise Edition',
    },
    description: {
      gr: 'Για μεγάλες επιχειρήσεις',
      en: 'For large businesses',
    },
    count: 8,
    icon: '🏢',
    color: 'orange',
  },
];

export const editionsApi = {
  async getCategoriesWithCounts(): Promise<CategoriesResponse> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        success: true,
        data: mockCategories,
      };
    }

    return apiClient.get('/editions/categories/summary');
  },
};

