// src/components/TotalReportCards.tsx
import React from "react";
import { totalrecordsData, type CardItem } from "../../../data";
import { Card, Col, Row, Typography, Flex } from "antd";

const { Text, Title } = Typography;

interface TotalReportCardsProps {
  totalrecordsData?: CardItem[];
}

const TotalReportCards: React.FC<TotalReportCardsProps> = () => {
  return (
   <div className="w-100">
 <Row gutter={[14, 24]} className="h-100">
      {totalrecordsData.map((item) => (
        <Col key={item.id} span={24} sm={24} md={12} lg={6}>
          <Card className="card-bg h-100 border-gray card-cs">
            <Flex gap={8} align="center">
              {item.icon && <img src={item.icon} width={45} alt={item.subtitle} />}
              <Flex vertical>
                <Title level={5} className="m-0">SAR {item.title}</Title>
                <Text className="fs-13 text-gray">{item.subtitle}</Text>
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
