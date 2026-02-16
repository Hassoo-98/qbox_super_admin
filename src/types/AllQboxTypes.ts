
// Homeowners Types 
export interface GetAllHomeownersParams {
  search: string,
  is_active: string,
  is_verified: string,
  ordering: string,
  page: number,
  limit: number
}

export interface Address {
  short_address: string;
  city: string;
  district: string;
  street: string;
  postal_code: string;
  building_number: string;
  secondary_building_number: string | null;
}

export interface QBox {
  id: string;
  qbox_id: string;
  homeowner_name_snapshot: string;
  short_address_snapshot: string;
  city_snapshot: string;
  status: string;
  led_indicator: string;
  camera_status: string;
  last_online: string | null;
  activation_date: string;
  qbox_image: string;
}

export interface HomeOwner {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  secondary_phone_number: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  address: Address;
  installation_location_preference: string;
  installation_access_instruction: string;
  installation_qbox_image_url: string;
  is_active: boolean;
  date_joined: string;
  qboxes: QBox[];
}

export interface HomeOwnersData {
  items: HomeOwner[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
export interface GetAllHomeOwnersResponse {
  success: boolean;
  statusCode: number;
  data: HomeOwnersData;
  message: string;
}

export interface GetSingleOrDeleteOrStatusResponse {
  success: boolean;
  statusCode: number;
  data: HomeOwner;
  message: string;
}

// Packages Interfaces 

export interface PackageParams {
  search: string;
  ordering: string;
  page: number;
  limit: number;
}

export interface PackageDetails {
  id: number;
  package_type: string;
  package_size: string;
  package_weight: string;
  summary: string;
}

export interface PackageItem {
  id: string;
  qbox: string;
  tracking_id: string;
  merchant_name: string;
  service_provider: string;
  driver_name: string;
  qr_code: string;
  package_type: "Incoming" | "Send" | "Return";
  outgoing_status: string | null;
  city: string;
  shipment_status: string;
  last_update: string;
  created_at: string;
  details: PackageDetails;
}

export interface PackagesData {
  items: PackageItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface GetAllPackagesResponse {
  success: boolean;
  statusCode: number;
  data: PackagesData;
  message: string;
}
export interface CrudPackageResponse {
  success: boolean;
  statusCode: number;
  data: PackageItem;
  message: string;
}

export interface AllPackagesTableProps {
  packagesData: PackageItem[];
}

// Qbox Interfaces 

export interface QboxParams {
  search: string;
  ordering: string;
  page: number;
  limit: number;
}

export interface QboxItem {
  id: string;
  qbox_id: string;
  homeowner: string;
  homeowner_name_snapshot: string;
  short_address_snapshot: string;
  city_snapshot: string;
  status: string;
  led_indicator: string;
  camera_status: string;
  last_online: string;
  activation_date: string;
  qbox_image: string;
  created_at: string;
  updated_at: string;
  packages: PackageItem[];
}

export interface QboxData {
  items: QboxItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface GetAllQboxResponse {
  success: boolean;
  statusCode: number;
  data: QboxData;
  message: string;
}

export interface CrudQboxResponse {
  success: boolean;
  statusCode: number;
  data: QboxItem;
  message: string;
}

export interface PromotionParams{
 search: string,
 promo_type:string,
 is_active:boolean,
 merchant_provider:string,
 page:number,
 page_size:number,
}

export interface PromotionItem {
  id?: string,
  code?: string,
  title: string,
  description: string,
  promo_type: "Flat" | "Percentage",
  value?: string,
  user_limit: string,
  merchant_name: string,
  merchant_img_url?: string,
  is_active: boolean,
  start_date: string,
  end_date: string,
}

export interface PromotionData {
  items: PromotionItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface GetAllPromotionResponse{
  success: boolean;
  statusCode: number;
  data: PromotionData;
  message: string;
}
export interface CrudPromotionResponse{
  success: boolean;
  statusCode: number;
  data: PromotionItem;
  message: string;
}