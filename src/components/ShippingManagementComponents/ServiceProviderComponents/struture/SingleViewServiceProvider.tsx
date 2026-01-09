import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Tabs, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BreadCrumb } from '../../../PageComponents'
import { serviceproviderData } from '../../../../data'
import { useState } from 'react'
import { BasicInformationProvider } from './BasicInformationProvider'
import { AllPackagesProviderTable } from './AllPackagesProviderTable'
import { DriversTable } from './DriversTable'

const { Text, Title } = Typography
const SingleViewServiceProvider = () => {
    const {t,i18n} = useTranslation();
     const isArabic = i18n.language === "ar";
    const navigate = useNavigate()
    const { id } = useParams()
    const details = serviceproviderData?.find((list)=>list?.key === Number(id))
    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key:string) => {
        setActiveKey(key);
    };
    const items = [
        {
            key: '1',
            label: t("Basic Information"),
            children: <BasicInformationProvider details={details} />
        },
        {
            key: '2',
            label: t("All Packages"),
            children: <AllPackagesProviderTable />
        },
        {
            key: '3',
            label: t("Drivers"),
            children: <DriversTable />
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
            </Card>
        </Flex>
    )
}

export {SingleViewServiceProvider}