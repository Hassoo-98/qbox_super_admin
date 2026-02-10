import {
  type TableColumnsType,
  Dropdown,
  Button,
  Typography,
  Avatar,
  type MenuProps,
  Flex,
  Select,
} from "antd"; 
import { NavLink } from "react-router-dom";
import type {
  ActivitylogTypes,
  AllBoxesTypes,
  staffType,
  HomerOwnerTypes,
  InstallmentType,
  RecentRequestType,
  VisibleType,
  AllPackagesTypes,
  QRHistoryTypes,
  subfileProps,
  SubscriptionType,
  RevenueType,
  ServiceProviderType,
  CityType,
  ServiceProviderColumnParams,
  AllPackageProviderType,
  DriverProviderType,
  SingleViewQRHistoryTableType,
  RolePermissionType,
  PayoutHistoryTypes,
  PayoutHistoryInvoiceTypes,
  PayoutHistorPackagesTypes,
  PayoutRequestTypes,
  PayoutRequestInvoiceTypes,
} from "../types";
import type { Installment } from "../api/types/admin";
import { statusColors } from "./statusColors";
import { t } from "i18next";
import type { HomeOwner } from "../types/AllQboxTypes";
const { Text } = Typography;

const installmentColumn = ({
  setVisible,
  t,
}: VisibleType): TableColumnsType<InstallmentType> => [
  {
    title: t("QBox ID"),
    dataIndex: "id",
  },
  {
    title: t("Homeowner Name"),
    dataIndex: "homeownerName",
  },
  {
    title: t("Short Address"),
    dataIndex: t("shortAddress"),
  },
  {
    title: t("City"),
    dataIndex: "city",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, row: InstallmentType) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(true);
                  }}
                >
                  {t("Installment Completed")}
                </NavLink>
              ),
              key: "1",
            },
            {
              label: (
                <NavLink to={`/installmentpending/viewdetail/${row?.key}`}>
                  {t("View HomeOwner Details")}
                </NavLink>
              ),
              key: "2",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const staffColumn = (
  setVisible: (v: boolean) => void,
  setEditItem: (item: staffType) => void,
  setStatusChanged: (v: boolean) => void,
  modals: any,
  setModals: any,
  tableSelectedIds: any,
  setTableSelectedIds: any,
  t: (key: string) => string,
): TableColumnsType<staffType> => [

  {
    title: t("Staff Name"),
    dataIndex: "name",
  },
  {
    title: t("Phone Number"),
    dataIndex: "phone_number",
  },
  {
    title: t("Email Address"),
    dataIndex: "email",
  },
  {
    title: t("Role"),
    dataIndex: "role",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (_status, row) => {
      const active = !!row.is_active;
      return (
        <Text
          className={`btnpill fs-12 ${active ? "success" : "inactive"}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            // open confirm modal and set the selected edit item so the confirm modal can toggle
            setStatusChanged(true);
            setEditItem(row);
          }}
        >
          {active ? t("Active") : t("Inactive")}
        </Text>
      );
    },
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, row: staffType) => {
      console.log("row:",row);
      return (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(true);
                    setEditItem(row);
                  }}
                >
                  {t("Edit")}
                </NavLink>
              ),
              key: "1",
            },
         {
              label: (
                 <NavLink
                   to="#"
                   onClick={(e) => {
                     e.preventDefault();
                     setModals((prev:any) => ({ ...prev, staffDelete: true }));
                     setTableSelectedIds((prev:any) => ({
                     ...prev,
                     staffSelectedId: row.id,
           }));
           }}
    >
      {t("Delete")}
    </NavLink>
  ),
  key: "2",
},
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setStatusChanged(true);
                    setEditItem(row);
                  }}
                >
                  {row.is_active ? t("InActive") : t("Active")}
                </NavLink>
              ),
              key: "3",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
      )
    },
  },
];

const activityColumn = (t: any): TableColumnsType<ActivitylogTypes> => [
  {
    title: t("Staff Name"),
    dataIndex: "staffname",
  },
  {
    title: t("Role"),
    dataIndex: "role",
  },
  {
    title: t("Action"),
    dataIndex: "action",
  },
  {
    title: t("Activity"),
    dataIndex: "activity",
  },
  {
    title: t("Date & Time"),
    dataIndex: "datetime",
  },
];

const recentColumn = (t: any): TableColumnsType<RecentRequestType> => [
  {
    title: t("QBox ID"),
    dataIndex: "qboxid",
  },
  {
    title: t("QBox Image"),
    dataIndex: "qboximage",
    render: (qboximage: string) => (
      <Avatar src={qboximage} size={50} shape="square" />
    ),
    width: 100,
  },
  {
    title: t("Homeowner Name"),
    dataIndex: "homeownername",
  },
  {
    title: t("Phone Number"),
    dataIndex: "phonenumber",
  },
  {
    title: t("City"),
    dataIndex: "city",
  },
  {
    title: t("Short Address"),
    dataIndex: "shortaddress",
  },
  {
    title: t("Requested Date"),
    dataIndex: "requestdate",
  },
];

export const dashboardInstallmentColumn = (
  t: any,
): TableColumnsType<Installment> => [
  {
    title: t("QBox ID"),
    dataIndex: "qbox_id",
  },
  {
    title: t("QBox Image"),
    dataIndex: "qbox_image",
    render: (qbox_image: string) => (
      <Avatar src={qbox_image} size={50} shape="square" />
    ),
    width: 100,
  },
  {
    title: t("Homeowner Name"),
    dataIndex: "homeowner_name",
  },
  {
    title: t("Phone Number"),
    dataIndex: "phone",
  },
  {
    title: t("City"),
    dataIndex: "city",
  },
  {
    title: t("Short Address"),
    dataIndex: "short_address",
  },
  {
    title: t("Requested Date"),
    dataIndex: "requested_date",
  },
];

const homeownersColumn = ({
  setItemToDelete,
  navigate,
  setDeleteItem,
  handleStatusClick,
  modals,
  setModals,
  tableSelectedIds,
  setTableSelectedIds,
  t,
}: {
  setItemToDelete: (item: HomerOwnerTypes) => void;
  navigate: (path: string) => void;
  setDeleteItem: (value: boolean) => void;
  handleStatusClick: (status: "active" | "inactive") => void;
  modals:any;
  setModals:any;
  tableSelectedIds:any;
  setTableSelectedIds:any;
  t: any;
}): TableColumnsType<HomeOwner> => [
  {
    title: t("ID"),
    dataIndex: "id",
  },
  {
    title: t("Homeowner Name"),
    dataIndex: "full_name",
  },
  {
  title: t("QBox ID"),
  render: (_, record: HomeOwner) =>
    record.qboxes && record.qboxes.length > 0
      ? record.qboxes.map(qbox => qbox.qbox_id).join(", ")
      : "-",
},
  {
    title: t("QBox Image"),
    dataIndex: "avatar",
    render: (avatar: string) => (
      <Avatar src={avatar} size={50} shape="square" />
    ),
    width: 100,
  },
  {
    title: t("Phone Number"),
    dataIndex: "phone_number",
  },
  {
    title: t("Email Address"),
    dataIndex: "email",
  },
  {
    title: t("Short Address"),
    dataIndex: ["address", "short_address"],
  },
  {
    title: t("City"),
    dataIndex: ["address", "city"],
  },
  {
    title: t("Total Deliveries"),
    dataIndex: "totaldliveries",
  },
  {
    title: t("Subscriptions Plan"),
    dataIndex: "subscriptionplane",
    render: (subscriptionplane: string) =>
      subscriptionplane === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Expired")}</Text>
      ),
  },
  {
    title: t("QBox Status"),
    dataIndex: "qboxstatus",
    render: (qboxstatus: string) =>
      qboxstatus === "online" ? (
        <Text className="btnpill fs-12 success">{t("Online")}</Text>
      ) : qboxstatus === "offline" ? (
        <Text className="btnpill fs-12 inactive">{t("Offline")}</Text>
      ) : (
        <Text className="btnpill fs-12 pending">{t("Error")}</Text>
      ),
  },
  {
    title: t("Account Status"),
    dataIndex: "status",
    render: (status: string) =>
      status==="active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Account Created On"),
    dataIndex: "date_joined",
    render: (date: string) => date?.split("T")[0],
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_, row: HomerOwnerTypes) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={()=>
              (
                setModals((prev:any)=>({...prev,homeOwnerStatus:true})),
                 setTableSelectedIds((perv:any)=>({...perv,homeOwnerSelectedId:row.id}))
              
              )
              }
            >
              {row.accountstatus === "active" ? t("Inactive") : t("Active")}
            </NavLink>
          ),
          key: "1",
        },
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/homeowners/homeownersdetails/" + row?.key);
              }}
            >
              {t("View")}
            </NavLink>
          ),
          key: "2",
        },
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setItemToDelete(row);
                setDeleteItem(true);
              }}
            >
              {t("Delete")}
            </NavLink>
          ),
          key: "3",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const allqboxesColumn = ({
  navigate,
}: {
  navigate: (path: string) => void;
}): TableColumnsType<AllBoxesTypes> => [
  {
    title: t("QBox ID"),
    dataIndex: "qbox_id",
  },
  {
    title: t("Homeowner Name"),
    dataIndex: "homeowner_name_snapshot",
  },
  {
    title: t("Short Address"),
    dataIndex: "short_address_snapshot",
  },
  {
    title: t("City"),
    dataIndex: "city_snapshot",
  },
  {
    title: t("QBox Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "online" ? (
        <Text className="btnpill fs-12 success">{t("Online")}</Text>
      ) : status === "offline" ? (
        <Text className="btnpill fs-12 inactive">{t("Offline")}</Text>
      ) : (
        <Text className="btnpill fs-12 pending">{t("Error")}</Text>
      ),
  },
  {
    title: t("Last Online"),
    dataIndex: "last_online",
  },
  {
    title: t("LED Indicator"),
    dataIndex: "led_indicator",
    render: (led_indicator: string) =>
      led_indicator === "green" ? (
        <Text className="btnpill fs-12 success">{t("Green")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Red")}</Text>
      ),
  },
  {
    title: t("Camera Status"),
    dataIndex: "camera_status",
    render: (camera_status: string) =>
      camera_status === "Working" ? (
        <Text className="btnpill fs-12 success">{t("Working")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Not Working")}</Text>
      ),
  },
  {
    title: t("Activation Date"),
    dataIndex: "activation_date",
    render: (date: string) => date?.split("T")[0],
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_, row: AllBoxesTypes) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/allqboxes/view/" + row?.key);
              }}
            >
              {t("View")}
            </NavLink>
          ),
          key: "1",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const allpackagesColumn = (
  { navigate }: { navigate: (path: string) => void },
  t: (key: string) => string,
): TableColumnsType<AllPackagesTypes> => [
  {
    title: t("Tracking ID"),
    dataIndex: "trackingid",
  },
  {
    title: t("Sender/Platform Name"),
    dataIndex: "senderplatformname",
  },
  {
    title: t("Service Provider"),
    dataIndex: "serviceprovider",
  },
  {
    title: t("Driver Name"),
    dataIndex: "drivername",
  },
  {
    title: t("QR Code"),
    dataIndex: "qrcode",
  },
  {
    title: t("Package Type"),
    dataIndex: "packagetype",
    render: (packagetype: string) =>
      packagetype === "incoming" ? (
        <Text className="btnpill fs-12 incoming">{t("Incoming")}</Text>
      ) : packagetype === "return" ? (
        <Text className="btnpill fs-12 return">{t("Return")}</Text>
      ) : (
        <Text className="btnpill fs-12 pending text-brown">{t("Send")}</Text>
      ),
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) => {
      const label = t(status); // use translated label
      const colorClass = statusColors[label];

      return (
        <Text
          className={`btnpill fs-12 text-white ${
            colorClass || "bg-default text-white"
          }`}
        >
          {label}
        </Text>
      );
    },
  },
  {
    title: t("Last Update"),
    dataIndex: "lastupdate",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_, row: AllPackagesTypes) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  "/allqboxes/view/qboxallpackages/detailview/" + row?.key,
                );
              }}
            >
              {t("View")}
            </NavLink>
          ),
          key: "1",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const qrhistoryColumn = (
  { navigate }: { navigate: (path: string) => void },
  t: any,
): TableColumnsType<QRHistoryTypes> => [
  {
    title: t("QR Code"),
    dataIndex: "qrcode",
  },
  {
    title: t("QR Name"),
    dataIndex: "qrname",
  },
  {
    title: t("Valid User"),
    dataIndex: "validuser",
  },
  {
    title: t("Timer"),
    dataIndex: "timer",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Created On"),
    dataIndex: "createdon",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_, row: QRHistoryTypes) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/allqboxes/view/singleviewqrhistory/" + row?.key);
              }}
            >
              {t("View")}
            </NavLink>
          ),
          key: "1",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const subscriptionColumn = (
  { setDownloadItem }: subfileProps,
  t: (key: string) => string,
): TableColumnsType<SubscriptionType> => [
  {
    title: t("Owner ID"),
    dataIndex: "ownerID",
  },
  {
    title: t("Home Owner Name"),
    dataIndex: "homeownerName",
  },
  {
    title: t("Amount"),
    dataIndex: "amount",
    render: (amount) => `${t("SAR")} ${amount}`,
  },
  {
    title: t("Payment Method"),
    dataIndex: "paymentMethod",
  },
  {
    title: t("Start Date"),
    dataIndex: "startDate",
  },
  {
    title: t("End Date"),
    dataIndex: "endDate",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Expired")}</Text>
      ),
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, _row: SubscriptionType) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDownloadItem();
                  }}
                >
                  {t("Download Invoice")}
                </NavLink>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const revenuesubColumn = (
  t: (key: string) => string,
): TableColumnsType<RevenueType> => [
  {
    title: t("Transaction ID"),
    dataIndex: "transactionID",
  },
  {
    title: t("Home Owner Name"),
    dataIndex: "homeownerName",
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalAmount",
    render: (totalAmount) => `${t("SAR")} ${totalAmount}`,
  },
  {
    title: t("Subscription Date"),
    dataIndex: "subscriptionDate",
  },
  {
    title: t("Payment Method"),
    dataIndex: "paymentMethod",
  },
];

const revenuecomColumn = (
  t: (key: string) => string,
): TableColumnsType<RevenueType> => [
  {
    title: t("Tracking ID"),
    dataIndex: "trackingID",
  },
  {
    title: t("Sender / Platform Name"),
    dataIndex: "senderplatformName",
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalAmount",
    render: (totalAmount) => `${t("SAR")} ${totalAmount}`,
  },
  {
    title: t("Delivery Date"),
    dataIndex: "deliveryDate",
  },
  {
    title: t("Payment Method"),
    dataIndex: "paymentMethod",
  },
];

const serviceproviderColumn = (
  {
    setVisible,
    setEditItem,
    navigate,
    setDeleteItem,
    setStatusChanged,
  }: ServiceProviderColumnParams,
  t: (key: string) => string,
): TableColumnsType<ServiceProviderType> => [
  {
    title: t("Provider Name"),
    dataIndex: "providerName",
    render: (providerName) => (
      <Flex align="center" gap={10}>
        <Avatar src={providerName?.img} size={35} />
        <Text>{providerName?.name}</Text>
      </Flex>
    ),
  },
  {
    title: t("Contact-Person Name"),
    dataIndex: "contactpersonName",
  },
  {
    title: t("Total Deliveries"),
    dataIndex: "totalDeliveries",
  },
  {
    title: t("Registered Drivers"),
    dataIndex: "regDrivers",
  },
  {
    title: t("Cities"),
    dataIndex: "cities",
    render: (cities: CityType[]) => (
      <Select
        mode="multiple"
        value={cities.map((city) => city.id.toString())}
        options={cities.map((city) => ({
          value: city.id.toString(),
          label: city.name,
        }))}
        maxTagCount={1}
        maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
        disabled
      />
    ),
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, row: ServiceProviderType) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/serviceproviders/view/" + row?.key);
                  }}
                >
                  {t("View")}
                </NavLink>
              ),
              key: "1",
            },
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(true);
                    setEditItem(row);
                  }}
                >
                  {t("Edit")}
                </NavLink>
              ),
              key: "2",
            },
            row?.status === "active"
              ? {
                  label: (
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setStatusChanged(true);
                      }}
                    >
                      {t("Active")}
                    </NavLink>
                  ),
                  key: "3",
                }
              : null,
            row?.status === "inactive"
              ? {
                  label: (
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setStatusChanged(true);
                      }}
                    >
                      {t("Inactive")}
                    </NavLink>
                  ),
                  key: "4",
                }
              : null,
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteItem(true);
                  }}
                >
                  {t("Delete")}
                </NavLink>
              ),
              key: "5",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const allpackageproviderColumn = (
  { navigate }: { navigate: (path: string) => void },
  t: (key: string) => string,
): TableColumnsType<AllPackageProviderType> => [
  {
    title: t("Tracking ID"),
    dataIndex: "trackingID",
  },
  {
    title: t("Sender/Merchant Name"),
    dataIndex: "senderName",
  },
  {
    title: t("Driver Name"),
    dataIndex: "driverName",
  },
  {
    title: t("QR Code"),
    dataIndex: "qrCode",
  },
  {
    title: t("Package Type"),
    dataIndex: "packageType",
    render: (packageType) =>
      packageType === "Incoming" ? (
        <Text className="btnpill sky-status fs-12">{t("Incoming")}</Text>
      ) : packageType === "Send" ? (
        <Text className="btnpill bg-light-yellow text-brown fs-12">
          {t("Send")}
        </Text>
      ) : (
        <Text className="btnpill inactive fs-12">{t("Return")}</Text>
      ),
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) => {
      const statusLabel = t(status);
      const statusClassMap: Record<string, string> = {
        "Shipment Created": "bg-shipment",
        "Out for Pickup": "bg-outpickup",
        "Pickup Completed": "bg-pickup-completed",
        "Out for Delivery": "bg-outdelivery",
        "Pickup Failed": "bg-pickup-failed",
        "Issue Logged": "bg-issue-logged",
        "Delivery Completed": "bg-delivery-completed",
        "Delivery Failed": "bg-delivery-failed",
      };

      const colorClass = statusClassMap[status] || "bg-default";

      return (
        <Text className={`btnpill fs-12 ${colorClass} text-white`}>
          {statusLabel}
        </Text>
      );
    },
  },
  {
    title: t("Last Update"),
    dataIndex: "lastUpdate",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, row: AllPackageProviderType) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      "/serviceproviders/view/allpackages/detailview/" +
                        row?.key,
                    );
                  }}
                >
                  {t("View")}
                </NavLink>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const driverproviderColumn = (
  { setStatusChanged }: { setStatusChanged: (value: boolean) => void },
  t: (key: string) => string,
): TableColumnsType<DriverProviderType> => [
  {
    title: t("Image"),
    dataIndex: "img",
    render: (img) => <Avatar src={img} size={40} />,
  },
  {
    title: t("Driver Name"),
    dataIndex: "driverName",
  },
  {
    title: t("Phone Number"),
    dataIndex: "phoneNumber",
  },
  {
    title: t("Email Address"),
    dataIndex: "emailAddress",
  },
  {
    title: t("Total Deliveries"),
    dataIndex: "totalDeliveries",
  },
  {
    title: t("Total issues logged"),
    dataIndex: "issuesLogged",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value: unknown, row: DriverProviderType) => (
      <Dropdown
        menu={{
          items: [
            row?.status === "active"
              ? {
                  label: (
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setStatusChanged(true);
                      }}
                    >
                      {t("Inactive")}
                    </NavLink>
                  ),
                  key: "1",
                }
              : null,
            row?.status !== "inactive"
              ? {
                  label: (
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setStatusChanged(true);
                      }}
                    >
                      {t("Active")}
                    </NavLink>
                  ),
                  key: "2",
                }
              : null,
          ].filter(Boolean),
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const provideractivityColumn = (
  t: (key: string) => string,
): TableColumnsType<any> => [
  {
    title: t("Date & Time"),
    dataIndex: "dateTime",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) => {
      const lower = status.toLowerCase();
      const isRed = lower.includes("failed") || lower.includes("expired");

      return isRed ? (
        <Text className="text-red">{t(status)}</Text>
      ) : (
        <Text>{t(status)}</Text>
      );
    },
  },
  {
    title: t("City"),
    dataIndex: "city",
  },
];

const singleviewqrhistorytableColumn = (
  { setVedioModal }: { setVedioModal: (value: boolean) => void },
  t: (key: string) => string,
): TableColumnsType<SingleViewQRHistoryTableType> => [
  {
    title: t("Driver Name"),
    dataIndex: "drivername",
  },
  {
    title: t("Locker Opened"),
    dataIndex: "lockeropened",
  },
  {
    title: t("Locker Closed"),
    dataIndex: "lockerclosed",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value, _row: SingleViewQRHistoryTableType) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setVedioModal(true);
              }}
            >
              {t("View Recording")}
            </NavLink>
          ),
          key: "1",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const rolepermissionColumn = (
  {
    setStatusChanged,
    setDeleteItem,
  }: {
    setStatusChanged: (value: boolean) => void;
    setDeleteItem: (value: boolean) => void;
  },
  t: (key: string) => string,
): TableColumnsType<RolePermissionType> => [
  {
    title: t("Role Name"),
    dataIndex: "rolename",
  },
  {
    title: t("Status"),
    dataIndex: "status",
    render: (status: string) =>
      status === "Active" ? (
        <Text className="btnpill fs-12 success">{t("Active")}</Text>
      ) : (
        <Text className="btnpill fs-12 inactive">{t("Inactive")}</Text>
      ),
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_, _row: RolePermissionType) => {
      const items: MenuProps["items"] = [
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {t("View Recording")}
            </NavLink>
          ),
          key: "1",
        },
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setStatusChanged(true);
              }}
            >
              {t("Active")}
            </NavLink>
          ),
          key: "2",
        },
        {
          label: (
            <NavLink
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setDeleteItem(true);
              }}
            >
              {t("Delete")}
            </NavLink>
          ),
          key: "3",
        },
      ];

      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button className="bg-transparent border-0 p-0">
            <img src="/assets/icons/dots.webp" alt="dots icon" width={16} />
          </Button>
        </Dropdown>
      );
    },
  },
];

const payouthistoryColumn = (
  { navigate }: { navigate: (path: string) => void },
  t: (key: string) => string,
): TableColumnsType<PayoutHistoryTypes> => [
  {
    title: t("Payout ID"),
    dataIndex: "payoutid",
  },
  {
    title: t("Total Packages"),
    dataIndex: "totalpackages",
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalamount",
  },
  {
    title: t("Date Range"),
    dataIndex: "daterange",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value, row: PayoutHistoryTypes) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      "/payouthistory/singleviewpayouthistory/" + row?.key,
                    );
                  }}
                >
                  {t("View Download Invoice")}
                </NavLink>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const payouthistoryinvoiceColumn = (
  t: (key: string) => string,
): TableColumnsType<PayoutHistoryInvoiceTypes> => [
  {
    title: t("Total Deliveries"),
    dataIndex: "totaldeliveries",
  },
  {
    title: t("Markup Value"),
    dataIndex: "markupvalue",
    render: (markupvalue) => `SAR ${markupvalue}`,
  },
  {
    title: t("Tax Fuel"),
    dataIndex: "taxfuel",
    render: (taxfuel) => `SAR ${taxfuel}`,
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalamount",
    render: (totalamount) => `SAR ${totalamount}`,
  },
  {
    title: t("Date Range"),
    dataIndex: "daterange",
  },
];

const payouthistorypackagesColumn = (
  t: (key: string) => string,
): TableColumnsType<PayoutHistorPackagesTypes> => [
  {
    title: t("Tracking ID"),
    dataIndex: "trackingid",
  },
  {
    title: t("Sender/Merchant Name"),
    dataIndex: "sendarname",
  },
  {
    title: t("Driver Name"),
    dataIndex: "drivername",
  },
  {
    title: t("Package Charges"),
    dataIndex: "packagecharges",
    render: (packagecharges) => `SAR ${packagecharges}`,
  },
  {
    title: t("Markup Value"),
    dataIndex: "markupvalues",
    render: (markupvalues) => `SAR ${markupvalues}`,
  },
  {
    title: t("Tax Fuel"),
    dataIndex: "taxfuel",
    render: (taxfuel) => `SAR ${taxfuel}`,
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalamount",
    render: (totalamount) => `SAR ${totalamount}`,
  },
  {
    title: t("Delivery Completed On"),
    dataIndex: "deliverydate",
  },
];

const payoutrequestColumn = (
  { navigate }: { navigate: (path: string) => void },
  t: (key: string) => string,
): TableColumnsType<PayoutRequestTypes> => [
  {
    title: t("Payout ID"),
    dataIndex: "payoutid",
  },
  {
    title: t("Merchant/Provider Name"),
    dataIndex: "merchantname",
    render: (_, row) => (
      <Flex align="center" gap={10}>
        <Avatar src={row?.img} size={35} />
        <Text>{row?.merchantname}</Text>
      </Flex>
    ),
  },
  {
    title: t("Package Charges"),
    dataIndex: "packagecharges",
  },
  {
    title: t("My Commission"),
    dataIndex: "mycomission",
  },
  {
    title: t("Provider Amount"),
    dataIndex: "provideramount",
  },
  {
    title: t("Requested Date"),
    dataIndex: "requestdate",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value, row: PayoutRequestTypes) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      "/payoutrequests/singleviewrequesthistory/" + row?.key,
                    );
                  }}
                >
                  {t("View")}
                </NavLink>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

const payoutrequestinvoiceColumn = (
  { setPaidModal }: { setPaidModal: (value: boolean) => void },
  t: (key: string) => string,
): TableColumnsType<PayoutRequestInvoiceTypes> => [
  {
    title: t("Total Deliveries"),
    dataIndex: "totaldeliveries",
  },
  {
    title: t("Total Packages Charges"),
    dataIndex: "totalpackagescharges",
    render: (totalpackagescharges) => `SAR ${totalpackagescharges}`,
  },
  {
    title: t("Markup & Values"),
    dataIndex: "markupvalue",
    render: (markupvalue) => `${markupvalue} %`,
  },
  {
    title: t("Total Provider Charges"),
    dataIndex: "totalprovidercharges",
    render: (totalprovidercharges) => `SAR ${totalprovidercharges}`,
  },
  {
    title: t("Tax Fuel"),
    dataIndex: "taxfuel",
    render: (taxfuel) => `${taxfuel} %`,
  },
  {
    title: t("Total Amount"),
    dataIndex: "totalamount",
    render: (totalamount) => `SAR ${totalamount}`,
  },
  {
    title: t("Date Range"),
    dataIndex: "daterange",
  },
  {
    title: t("Action"),
    key: "action",
    width: 100,
    render: (_value, _row: PayoutRequestInvoiceTypes) => (
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPaidModal(true);
                  }}
                >
                  {t("Mark as Paid")}
                </NavLink>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button className="bg-transparent border-0 p-0">
          <img
            src="/assets/icons/dots.webp"
            alt="dots icon"
            fetchPriority="high"
            width={16}
          />
        </Button>
      </Dropdown>
    ),
  },
];

export {
  installmentColumn,
  staffColumn,
  activityColumn,
  recentColumn,
  homeownersColumn,
  allqboxesColumn,
  allpackagesColumn,
  qrhistoryColumn,
  subscriptionColumn,
  revenuesubColumn,
  revenuecomColumn,
  serviceproviderColumn,
  allpackageproviderColumn,
  driverproviderColumn,
  provideractivityColumn,
  singleviewqrhistorytableColumn,
  rolepermissionColumn,
  payouthistoryColumn,
  payouthistoryinvoiceColumn,
  payouthistorypackagesColumn,
  payoutrequestColumn,
  payoutrequestinvoiceColumn,
};
