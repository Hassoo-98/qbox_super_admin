import type { AllPackageProviderType, DriverProviderType, ProviderActiviteType, ServiceProviderType } from "../Type";

const serviceproviderData:ServiceProviderType[] = [
    {
        key: 1,
        providerName: { img: '/assets/images/1.webp', name: 'Dambase' },
        contactpersonName: "Fahd Bakir",
        totalDeliveries: 12,
        regDrivers: 6,
        cities: [
            { id: 1, name: 'Riyadh' },
            { id: 2, name: 'Makkah' },
            { id: 3, name: 'Jeddah' },
        ],
        status: 'active'
    },
    {
        key: 2,
        providerName: { img: '/assets/images/2.webp', name: 'TransGo Express' },
        contactpersonName: "Saleh Al-Harbi",
        totalDeliveries: 7,
        regDrivers: 3,
        cities: [
            { id: 1, name: 'Riyadh' },
            { id: 4, name: 'Taif' },
        ],
        status: 'inactive'
    },
    {
        key: 3,
        providerName: { img: '/assets/images/3.webp', name: 'FastTrack Logistics' },
        contactpersonName: "Ayman Al-Zahrani",
        totalDeliveries: 18,
        regDrivers: 10,
        cities: [
            { id: 2, name: 'Makkah' },
            { id: 3, name: 'Jeddah' },
        ],
        status: 'active'
    },
];


const allpkgproviderData:AllPackageProviderType[] = [
    {
        key: 1,
        trackingID:'DVW5-VR0',
        img: '/assets/images/1.webp',
        senderName:'Smart Serve Providers',
        driverName:'Zain Sheikh',
        qrCode:'CODE_93',
        packageType:'Incoming',
        status: 'Shipment Created',
        lastUpdate:'06/15/21 11:00am',
    },
    {
        key: 2,
        trackingID:'TNX1-NV0',
        img: '/assets/images/2.webp',
        senderName:'Smart Serve Providers',
        driverName:'Sami Khan',
        qrCode:'ITF',
        packageType:'Send',
        status: 'Out for Pickup',
        lastUpdate:'06/15/21 11:00am',
    },
    {
        key: 3,
        trackingID:'PNW1-VQ8',
        img: '/assets/images/3.webp',
        senderName:'Smart Serve Providers',
        driverName:'Imran Khan',
        qrCode:'CODE_128',
        packageType:'Send',
        status: 'Pickup Completed',
        lastUpdate:'06/15/21 11:00am',
    },
    {
        key: 4,
        trackingID:'PVF1-NX8',
        img: '/assets/images/1.webp',
        senderName:'Smart Serve Providers',
        driverName:'Ibrahim Malik',
        qrCode:'CODE_39',
        packageType:'Return',
        status: 'Out for Delivery',
        lastUpdate:'06/15/21 11:00am',
    },
    {
        key: 5,
        trackingID:'9NV1-VR0',
        img: '/assets/images/2.webp',
        senderName:'Smart Serve Providers',
        driverName:'Farhan Ali',
        qrCode:'EAN_8',
        packageType:'Return',
        status: 'Pickup Failed',
        lastUpdate:'06/15/21 11:00am',
    },
    {
        key: 6,
        trackingID:'SNF4-NF8',
        img: '/assets/images/3.webp',
        senderName:'Smart Serve Providers',
        driverName:'Anas Raza',
        qrCode:'UPC_E',
        packageType:'Incoming',
        status: 'Issue Logged',
        lastUpdate:'08/01/21 9:02am',
    },
    {
        key: 7,
        trackingID:'CNR1-NB8',
        img: '/assets/images/1.webp',
        senderName:'Smart Serve Providers',
        driverName:'Hassan Ahmed',
        qrCode:'DATA_MATRIX',
        packageType:'Send',
        status: 'Delivery Completed',
        lastUpdate:'08/01/21 9:02am',
    },
    {
        key: 8,
        trackingID:'SV_0-NB8',
        img: '/assets/images/2.webp',
        senderName:'Smart Serve Providers',
        driverName:'Qasim Khan',
        qrCode:'EAN_13',
        packageType:'Return',
        status: 'Delivery Failed',
        lastUpdate:'08/01/21 9:02am',
    },
];


const driverproviderData:DriverProviderType[] = [
    {
        key: 1,
        img:'/assets/images/1.webp',
        driverName:'Zain Sheikh',
        phoneNumber:'+966 324 464 232',
        emailAddress:'maikelnai@icloud.com',
        totalDeliveries: 1,
        issuesLogged: 1,
        status:'active',
    },
    {
        key: 2,
        img:'/assets/images/2.webp',
        driverName:'Mohammed Darwish',
        phoneNumber:'+966 324 464 232',
        emailAddress:'michiel@comcast.net',
        totalDeliveries: 12,
        issuesLogged: 12,
        status:'inactive',
    },
    {
        key: 3,
        img:'/assets/images/3.webp',
        driverName:'Zubair Sheikh',
        phoneNumber:'+966 324 464 232',
        emailAddress:'paulv@sbcglobal.net',
        totalDeliveries: 1,
        issuesLogged: 1,
        status:'active',
    },
];


const provideractivitiesData:ProviderActiviteType[]= [
    {
        key: 1,
        dateTime:'07/19/21 12:36pm',
        status:'Shipment Created',
        city:'Asr',
    },
    {
        key: 2,
        dateTime:'07/19/21 12:36pm',
        status:'QR Expired',
        city:'Riyadh',
    },
    {
        key: 3,
        dateTime:'08/01/21 9:02am',
        status:'Out for Delivery',
        city:'Jeddah',
    },
    {
        key: 4,
        dateTime:'07/19/21 12:36pm',
        status:'Delivery Failed',
        city:'Riyadh',
    },
    {
        key: 5,
        dateTime:'07/19/21 12:36pm',
        status:'Call to homeowner',
        city:'Riyadh',
    },
    {
        key: 6,
        dateTime:'07/19/21 12:36pm',
        status:'Pickup Failed',
        city:'Jeddah',
    },
    {
        key: 7,
        dateTime:'07/19/21 12:36pm',
        status:'QR Expired',
        city:'Riyadh',
    },
];


export {serviceproviderData,allpkgproviderData,driverproviderData,provideractivitiesData}