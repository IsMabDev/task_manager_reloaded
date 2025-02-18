import api from "../../../utils/api/api";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/categories');
    if(response.data.length >0) return response.data  
    else return []
} catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw the error for the component to handle
  }
};

export interface Category {
  id: number;
  title: string;
  description?: string;
  userId:number;
  createAt?: Date;
  isDefault: boolean;
  color?: string;
}

export interface categoriesByTitle {
  [title: string]: Category[];
}