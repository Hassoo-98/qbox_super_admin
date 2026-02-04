export interface HomeOwner {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  status: "active" | "inactive";
  qbox_id?: string;
  [key: string]: any;
}

export interface Installment {
  id: number;
  qbox_id: string;
  qbox_image: string;
  homeowner_name: string;
  phone_number: string;
  city: string;
  short_address: string;
  request_date: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
