import type { PayoutHistorPackagesTypes, PayoutHistoryInvoiceTypes, PayoutHistoryTypes, PayoutRequestInvoiceTypes, PayoutRequestTypes } from "../types";

const payouthistoryData:PayoutHistoryTypes[] =  [
    {
        key:1,
        payoutid:'AB6543',
        totalpackages:'23',
        totalamount:'12421',
        daterange:'11/02/2025 - 11/03/2025'
    },
    {
        key:2,
        payoutid:'SS1234',
        totalpackages:'07',
        totalamount:'95312',
        daterange:'11/02/2025 - 11/03/2025'
    },
    {
        key:3,
        payoutid:'TR4321',
        totalpackages:'05',
        totalamount:'63286',
        daterange:'11/02/2025 - 11/03/2025'
    },
    {
        key:4,
        payoutid:'AB6543',
        totalpackages:'23',
        totalamount:'12421',
        daterange:'11/02/2025 - 11/03/2025'
    },
    {
        key:5,
        payoutid:'SS1234',
        totalpackages:'07',
        totalamount:'95312',
        daterange:'11/02/2025 - 11/03/2025'
    },
    {
        key:6,
        payoutid:'TR4321',
        totalpackages:'05',
        totalamount:'63286',
        daterange:'11/02/2025 - 11/03/2025'
    }
]

const payouthistoryinvoiceData:PayoutHistoryInvoiceTypes[] =  [
    {
        key:1,
        totaldeliveries:'30',
        markupvalue:'3244',
        taxfuel:'4322',
        totalamount:'3640',
        daterange:'11/02/2025 - 11/03/2025'
    }
]

const payouthistorypackagesData:PayoutHistorPackagesTypes[] =  [
    {
        key:1,
        trackingid:'DVW5-VR0',
        sendarname:'Fahd Bakir',
        drivername:'Zain Sheikh',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
     {
        key:2,
        trackingid:'TNX1-NV0',
        sendarname:'Mohammed Darwish',
        drivername:'Sami Khan',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
     {
        key:3,
        trackingid:'PNW1-VQ8',
        sendarname:'Zuhair Hafeez',
        drivername:'Imran Khan',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
      {
        key:4,
        trackingid:'DVW5-VR0',
        sendarname:'Fahd Bakir',
        drivername:'Zain Sheikh',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
     {
        key:5,
        trackingid:'TNX1-NV0',
        sendarname:'Mohammed Darwish',
        drivername:'Sami Khan',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
     {
        key:6,
        trackingid:'PNW1-VQ8',
        sendarname:'Zuhair Hafeez',
        drivername:'Imran Khan',
        packagecharges:'25',
        markupvalues:'653',
        taxfuel:'45',
        totalamount:'899',
        deliverydate:'11/02/2025 - 11/03/2025'
    },
]

const payoutrequestData:PayoutRequestTypes[] = [
    {
       key:1,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
    {
       key:2,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
    {
       key:3,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
    {
       key:4,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
    {
       key:5,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
    {
       key:6,
       payoutid:'AB305',
        img:'/assets/images/1.webp',
        merchantname:'Treequote',
        packagecharges:'160',
        mycomission:'1',
        provideramount:'150',
        requestdate:'11/02/2025 11:00 am'
    },
]

const payoutrequestinvoiceData:PayoutRequestInvoiceTypes[] =  [
    {
        key:1,
        totaldeliveries:'30',
        totalpackagescharges:'3244',
        markupvalue:'40',
        totalprovidercharges:'3640',
        taxfuel:'40',
        totalamount:'200',
        daterange:'11/02/2025 - 11/03/2025'
    }
]
export{
    payouthistoryData,
    payouthistoryinvoiceData,
    payouthistorypackagesData,
    payoutrequestData,
    payoutrequestinvoiceData
}