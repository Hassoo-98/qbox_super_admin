import { useState } from 'react';
import { Card, Divider, Flex, Typography, Select } from 'antd';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { ModuleTopHeading } from '../../PageComponents';

const { Text } = Typography;

const SubscriptionRateBarChart = () => {
const [, setSelectedYear] = useState("2025");
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        plotOptions: {
        bar: {
            borderRadius: 2,
            barHeight: '80%',
        },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#000' } },
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: { style: { colors: '#000' } },
        },
        fill: { opacity: 1 },
        grid: { show: true },
        colors: [ '#efefef'],
        legend: { show: false },
    };

    const chartSeries = [
        {
            name: 'Current Stock',
            data: [20, 40, 60, 45, 75, 90, 55,20, 40, 60, 45, 75, ],
        }
    ];

  return (
    <Card className='radius-12 border-light-gray card-shadow card-cs'>
        <Flex justify='space-between'>
            <Flex vertical>
            <Text className='fs-14'>Supscription Rate</Text>
            <ModuleTopHeading name='300'/>
        </Flex>
        <Select
          defaultValue="2025"
          style={{ width: 100 }}
          onChange={(value) => setSelectedYear(value)}
          options={[
            { value: "2025", label: "2025" },
            { value: "2024", label: "2024" },
            { value: "2023", label: "2023" },
          ]}
        />
        </Flex>
        <Divider className='mb-0' />
        <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={300}
            width="100%"
            className='bar-width'
        />
    </Card>
  );
};

export { SubscriptionRateBarChart };
