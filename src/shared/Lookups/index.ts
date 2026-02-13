const statusItems = (t: any) => [
  { key: "approved", label: t("Approved") },
  { key: "rejected", label: t("Rejected") },
];
const staffrole = (t: any) => [
  {
    id: "supervisor",
    value: t("supervisor"),
  },
  
  {
    id: "agent",
    value: t("agent"),
  },
];


const statusItemnew = (t: any) => [
  { key: "active", label: t("Active") },
  { key: "expired", label: t("Expired") },
];

const citiesOp = (t: any) => [
  {
    id: 1,
    name: t("Riyadh"),
  },
  {
    id: 2,
    name: t("Makkah"),
  },
  {
    id: 3,
    name: t("Jeddah"),
  },
  {
    id: 4,
    name: t("Taif"),
  },
];

const markuptypeOp = (t: any) => [
  {
    id: 1,
    name: t("Fixed"),
  },
  {
    id: 2,
    name: t("Percentage"),
  },
];

const packageItem = (t: any) => [
  {
    key: "incoming",
    label: t("Incoming"),
  },
  {
    key: "send",
    label: t("Send"),
  },
  {
    key: "return",
    label: t("Return"),
  },
];
export {
  statusItems,
  staffrole,
  statusItemnew,
  citiesOp,
  markuptypeOp,
  packageItem,
};
