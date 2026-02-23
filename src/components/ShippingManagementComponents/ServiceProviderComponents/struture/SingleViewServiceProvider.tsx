import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Spin, Tabs, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BreadCrumb } from '../../../PageComponents'
import { useState, useEffect } from 'react'
import { ServiceProviderService } from '../../../../services/serviceProvider.service'
import { BasicInformationProvider } from './BasicInformationProvider'
import { AllPackagesProviderTable } from './AllPackagesProviderTable'
import { DriversTable } from './DriversTable'

const { Text, Title } = Typography
const SingleViewServiceProvider = () => {
    const {t,i18n} = useTranslation();
     const isArabic = i18n.language === "ar";
    const navigate = useNavigate()
    const { id } = useParams()
    const [details, setDetails] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [activeKey, setActiveKey] = useState('1');

    const fetchDetails = async (providerId?: string | undefined) => {
        if (!providerId) return;
        setLoading(true);
        try {
            const res: any = await ServiceProviderService.getSingleServiceProvider(Number(providerId));

            // normalize response: backend may return { data: { items: [...] } } or { data: {...} }
            let provider: any = null;
            if (res?.data?.items && Array.isArray(res.data.items)) {
                provider = res.data.items[0];
            } else if (res?.data && !res?.data?.items) {
                provider = res.data;
            } else if (res?.data) {
                provider = res.data;
            } else {
                provider = res;
            }

            // map backend fields to the UI's expected mock shape
            const resolveImage = (p: any) => {
                if (!p) return null;
                return (
                    p.img || p.logo || p.image || p.profile_image || p.logo_url || p.image_url || p.profile?.img || p.logo?.url || p.image?.url || null
                );
            };

            const mapped = {
                key: provider?.id ?? Number(providerId),
                providerName: { img: resolveImage(provider), name: provider?.name ?? provider?.provider_name },
                contactpersonName: provider?.contact_person_name ?? provider?.contactpersonName,
                totalDeliveries: (provider as any)?.total_deliveries ?? (provider as any)?.totalDeliveries,
                regDrivers: (provider as any)?.registered_drivers ?? undefined,
                cities: (provider?.operating_cities || provider?.cities || []).map((c: any) => (typeof c === 'string' || typeof c === 'number' ? { id: c, name: c } : { id: c.id ?? c.pk ?? c.value, name: c.name ?? c.label ?? c }) ),
                status: provider?.is_active || provider?.is_approved ? 'active' : 'inactive',
                // keep full provider for other components if needed
                _raw: provider,
            }

            setDetails(mapped); 
        } catch (err) {
            console.error('Failed fetching provider details', err);
        } finally {
            setLoading(false);
        }
    }
    // console.log(details);

    const onChange = (key:string) => {
        setActiveKey(key);
    };

    useEffect(() => {
        fetchDetails(id);
    }, [id]);
    const items = [
        {
            key: '1',
            label: t("Basic Information"),
            children: <BasicInformationProvider details={details} />
        },
        {
            key: '2',
            label: t("All Packages"),
            children: <AllPackagesProviderTable packagesData={details?._raw?.packages ?? details?._raw?.data?.packages} />
        },
        {
            key: '3',
            label: t("Drivers"),
            children: <DriversTable driversData={details?._raw?.drivers ?? details?._raw?.data?.drivers} />
        },
    ];

    const currentContent = items.find((item) => item.key === activeKey)?.children;

    return (
        <Flex vertical gap={10}>
            <BreadCrumb 
                items={[
                    {title:t('Business Management')},
                    {title:t('Service Providers'), to:'/serviceproviders'},
                    {title: `${details?.contactpersonName}` }
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Spin spinning={loading}>
                    <Flex vertical gap={30}>
                        <Flex gap={10} align="center" >
                            <Flex gap={10} align="center">
                                <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/serviceproviders")}>
                                    {isArabic ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                                </Button>
                                <Avatar src={details?.providerName?.img} size={40}/>
                                
                                <Title level={5} className="fw-500 m-0">{details?.contactpersonName}</Title>
                                
                            </Flex>
                            <Flex gap={5}>
                                {
                                    details?.status === 'active' ? (
                                        <Text className='sm-pill radius-12 fs-12 success'>Active</Text>
                                    ) : (
                                        <Text className='sm-pill radius-12 fs-12 inactive'>Inactive</Text>
                                    )
                                }                        
                            </Flex>
                        </Flex>
                        <Tabs defaultActiveKey="1" 
                            items={items.map(({ key, label }) => ({
                                key,
                                label,
                            }))} 
                            onChange={onChange}
                            className='tab-fill'
                        />

                        {currentContent}
                    </Flex>
                </Spin>
            </Card>
        </Flex>
    )
}

export {SingleViewServiceProvider}