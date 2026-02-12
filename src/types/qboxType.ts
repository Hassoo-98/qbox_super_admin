export interface VisibleType {
  setVisible: (visible: boolean) => void;
  t: any;
}
export interface InstallmentType {
  key: number;
  id: string;
  img?: string;
  homeownerName: string;
  shortAddress: string;
  city: string;
  status?: string;
  email?: string;
  phoneNumber?: string;
  district?: string;
  street?: string;
  postalCode?: string;
  building?: string;
  secondaryNumber?: string;
  idType?: string;
  preLocation?: string;
  instruction?: string;
}

export interface ActivitylogTypes {
  key: number;
  staffname: string;
  role: string;
  action: string;
  activity: string;
  datetime: string;
}

export interface RecentRequestType {
  key: number;
  qboxid: string;
  qboximage: string;
  homeownername: string;
  phonenumber: string;
  city: string;
  shortaddress: string;
  requestdate: string;
}

export interface HomerOwnerTypes {
  key: number;
  id: string;
  homeownername: string;
  qboxid: string;
  qboximage: string;
  phonenumber: string;
  email: string;
  shortaddress: string;
  city: string;
  totaldliveries: string;
  subscriptionplane: "active" | "expired";
  qboxstatus: "online" | "offline" | "error";
  accountstatus: "active" | "inactive";
  createdon: string;
  district: string;
  street: string;
  postalcode: string;
  building: string;
  secondarynumber: string;
  idtypenumber: string;
  preferdlocation: string;
  instruction: string;
}

export interface AllBoxesTypes {
  id: number;
  qbox_id:string;
  homeowner: string;
  homeowner_name_snapshot:string;
  short_address_snapshot:string;
  city_snapshot: string;
  shortaddress: string;
  city: string;
  status: "Online" | "Offline" | "Error";
  last_online: string;
  led_indicator: "Green" | "Red";
  camera_status: "Working" | "Notworking";
  activation_date: string;
}
export interface staffType {
  key: number;
  id: string;
  staffName: string;
  name: string;
  phoneNumber: string;
  phone_number: string;
  email: string;
  role: string;
  status: string;
  is_active: boolean;
}

export interface AllPackagesTypes {
  id: number;
  tracking_id: string;
  img: string;
  merchant_name: string;
  service_provider: string;
  driver_name: string;
  qr_code: string;
  package_type: "Incoming" | "Send" | "Return";
  shipment_status:string,
  status: string;
  last_update: string;
}

export interface QRHistoryTypes {
  key: number;
  qrcode: string;
  qrname: string;
  validuser: string;
  timer: string;
  status: "active" | "inactive";
  createdon: string;
}

export interface PayoutHistoryTypes {
  key: number;
  payoutid: string;
  totalpackages: string;
  totalamount: string;
  daterange: string;
}

export interface PayoutHistoryInvoiceTypes {
  key: number;
  totaldeliveries: string;
  markupvalue: string;
  taxfuel: string;
  totalamount: string;
  daterange: string;
}
export interface PayoutHistorPackagesTypes {
  key: number;
  trackingid: string;
  sendarname: string;
  drivername: string;
  packagecharges: string;
  markupvalues: string;
  taxfuel: string;
  totalamount: string;
  deliverydate: string;
}

export interface PayoutRequestTypes {
  key: number;
  payoutid: string;
  img: string;
  merchantname: string;
  packagecharges: string;
  mycomission: string;
  provideramount: string;
  requestdate: string;
}
export interface PayoutRequestInvoiceTypes {
  key: number;
  totaldeliveries: string;
  totalpackagescharges: string;
  markupvalue: string;
  totalprovidercharges: string;
  taxfuel: string;
  totalamount: string;
  daterange: string;
}
// setting page type
export type SettingData = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  whatsappNumber: string;
};

export interface EditSettingsModalProps {
  edititem: SettingData | null;
  onClose: () => void;
  visible: boolean;
}

// subscription types

export type SubscriptionType = {
  key: number;
  ownerID: string;
  homeownerName: string;
  amount: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
  status: string;
};

export type DownloadType = {
  id?: number;
  url?: string;
  fileName?: string;
};

export type subfileProps = {
  setDownloadItem: (item?: DownloadType) => void;
};

export type RevenueType = {
  key: number;
  transactionID?: string;
  trackingID?: string;
  senderplatformName?: string;
  homeownerName?: string;
  totalAmount?: string;
  subscriptionDate?: string;
  deliveryDate?: string;
  paymentMethod?: string;
};

// shipping management
// service providerwha
export type ProviderNameData = {
  name: string;
  img: string;
};

export type CityType = {
  id: number;
  name: string;
};

export type ServiceProviderType = {
  key: number;
  providerName: ProviderNameData;
  contactpersonName: string;
  totalDeliveries: number;
  regDrivers: number;
  cities: CityType[];
  status: "active" | "inactive";
};

export type ServiceProviderColumnParams = {
  setVisible: (value: boolean) => void;
  setEditItem: (item: ServiceProviderType) => void;
  navigate: (path: string) => void;
  setStatusChanged: (value: boolean) => void;
  setDeleteItem: (value: boolean) => void;
};

export type AllPackageProviderType = {
  key: number;
  trackingID: string;
  img?: string;
  senderName: string;
  driverName: string;
  qrCode: string;
  packageType: string;
  status: string;
  lastUpdate: string;
};

export type DriverProviderType = {
  key: number;
  img: string;
  driverName: string;
  phoneNumber: string;
  emailAddress: string;
  totalDeliveries: number;
  issuesLogged: number;
  status: "active" | "inactive";
};

export type ProviderActiviteType = {
  key: number;
  dateTime: string;
  status: string;
  city: string;
};

export interface SingleViewQRHistoryTableType {
  key: number;
  drivername: string;
  lockeropened: string;
  lockerclosed: string;
  status: string;
}

export interface RolePermissionType {
  key: number;
  rolename: string;
  status: string;
}

export interface ApiError {
status: number;
code: string;
message: string;
errors?: Record<string, string>;
}