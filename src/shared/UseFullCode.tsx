// const toArabicDigits = (number:number) => {
//   return number;
//   const arabicNumbers = {
//     0: "٠",
//     1: "١",
//     2: "٢",
//     3: "٣",
//     4: "٤",
//     5: "٥",
//     6: "٦",
//     7: "٧",
//     8: "٨",
//     9: "٩",
//   };

//   return number
//     .toString()
//     .split("")
//     .map(d => arabicNumbers[d] ?? d)
//     .join("");
// };

const subscriptionTitle = (t: (key: string) => string) => {
  const title = t("SUBSCRIPTION & REVENUE");
  const formatted =
    title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  return formatted;
};

const shippingTitle = (t: (key: string) => string) => {
  const title = t("SHIPPING MANAGEMENT");
  const formatted =
    title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  return formatted;
};


export {subscriptionTitle,shippingTitle}