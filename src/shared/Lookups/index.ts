const statusItems = (t: any) => [
  { key: "active", label: t("Active") },
  { key: "inactive", label: t("InActive") },
];

const staffrole = (t: any) => [
  {
    id: 1,
    name: t("Supervisor"),
  },
  {
    id: 2,
    name: t("Admin"),
  },
  {
    id: 3,
    name: t("Agent"),
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
