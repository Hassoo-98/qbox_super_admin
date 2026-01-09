import type { SubscriptionType } from "../Type"

const subscriptionDate: SubscriptionType[] = [
    {
        key: 1,
        ownerID: "256505",
        homeownerName: "Fahd Bakir",
        amount: "150",
        paymentMethod: "Apple Pay",
        startDate: "26/02/2020",
        endDate: "26/02/2020",
        status: "active",
    },
    {
        key: 2,
        ownerID: "256509",
        homeownerName: "Mohammed Darwish",
        amount: "150",
        paymentMethod: "STC Pay",
        startDate: "27/02/2020",
        endDate: "27/02/2020",
        status: "active",
    },
    {
        key: 3,
        ownerID: "256505",
        homeownerName: "Zuhair Hafeez",
        amount: "150",
        paymentMethod: "Apple Pay",
        startDate: "26/02/2020",
        endDate: "26/02/2020",
        status: "expired",
    },
]

const revenuesubData = [
    {
        key: 1,
        transactionID: "256505",
        homeownerName: "Fahd Bakir",
        totalAmount: "150",
        subscriptionDate: "26/02/2020",
        paymentMethod: "Stripe",
    },
    {
        key: 2,
        transactionID: "256509",
        homeownerName: "Mohammed Darwish",
        totalAmount: "150",
        subscriptionDate: "27/02/2020",
        paymentMethod: "Stripe",
    },
    {
        key: 3,
        transactionID: "256505",
        homeownerName: "Fahd Bakir",
        totalAmount: "150",
        subscriptionDate: "28/02/2020",
        paymentMethod: "Stripe",
    },
]

const revenuecomData = [
    {
        key: 1,
        trackingID: "256505",
        senderplatformName: "Fahd Bakir",
        totalAmount: "150",
        deliveryDate: "26/02/2020",
        paymentMethod: "Stripe",
    },
    {
        key: 2,
        trackingID: "256509",
        senderplatformName: "Mohammed Darwish",
        totalAmount: "150",
        deliveryDate: "27/02/2020",
        paymentMethod: "Stripe",
    },
    {
        key: 3,
        trackingID: "256505",
        senderplatformName: "Fahd Bakir",
        totalAmount: "150",
        deliveryDate: "28/02/2020",
        paymentMethod: "Stripe",
    },
]

export {subscriptionDate,revenuesubData,revenuecomData}