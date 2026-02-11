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
  key: number;
  homeownername: string;
  qboxid: string;
  shortaddress: string;
  city: string;
  qboxstatus: "online" | "offline" | "error";
  lastonline: string;
  ledindicator: "green" | "red";
  camerastatus: "working" | "notworking";
  activationdate: string;
  phonenumber: string;
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
  key: number;
  trackingid: string;
  img: string;
  senderplatformname: string;
  serviceprovider: string;
  drivername: string;
  qrcode: string;
  packagetype: "incoming" | "send" | "return";
  status: string;
  lastupdate: string;
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
  id: number;
  name: string;
  is_approved: boolean;
  business_registration_number: string;
  contact_person_name: string;
  phone_number: string;
  email: string;
  operating_cities: string[];
  settlement_cycle_days: number;
  markup_type: string;
  markup_value: string;
  first_kg_charge: string;
  additional_kg_charge: string;
  fuel_surcharge_percentage: string;
  fuel_surcharge_enabled: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceProviderColumnParams = {
  setVisible: (value: boolean) => void;
  setEditItem: (item: ServiceProviderType) => void;
  navigate: (path: string) => void;
  setStatusChanged: (value: number) => void;
  setDeleteItem: (value: number) => void;
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