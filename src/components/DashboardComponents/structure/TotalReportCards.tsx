// src/components/TotalReportCards.tsx
import React from "react";
import { getTotalrecordsData, type CardItem } from "../../../data";
import { Card, Col, Row, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../sources/i18n";
const { Text, Title } = Typography;

interface TotalReportCardsProps {
  totalrecordsData?: CardItem[];
}

const TotalReportCards: React.FC<TotalReportCardsProps> = () => {
   const isRTL = i18n.language === "ar";
   
    
  const {t} = useTranslation();
  const totalrecordsData=getTotalrecordsData(t);
  return (
   <div className="w-100"  style={{ direction: isRTL ? "rtl" : "ltr" }}>
 <Row gutter={[14, 24]} className="h-100">
      {totalrecordsData.map((item) => (
        <Col key={item.id} span={24} sm={24} md={12} lg={6}>
          <Card className="card-bg h-100 border-gray card-cs">
            <Flex gap={8} align="center">
              {item.icon && <img src={item.icon} width={45} alt={item.subtitle} />}
              <Flex vertical>
                <Title level={5} className="m-0">{t('SAR')} {item.title}</Title>
                <Text className="fs-13 text-gray">{t(item.subtitle)}</Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
   </div>
  );
};

export { TotalReportCards };
