export interface ItemsPagination<T> {
  currentPage: number;
  limit: number;
  list: T[];
  pages: number;
}

export interface User {
  id: number;
  familyId: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  createdAt: string;
}
