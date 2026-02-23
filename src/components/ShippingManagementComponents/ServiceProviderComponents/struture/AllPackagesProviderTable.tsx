import { Flex, Table, Form, Row, Col } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import type { AllPackageProviderType } from "../../../../types";
import { packageItem } from "../../../../shared";
import { allpackageproviderColumn, allpkgproviderData } from "../../../../data";
import { MyDatepicker, SearchInput, MySelect } from "../../../Forms";
import i18n from "../../../../sources/i18n";

type Props = {
  packagesData?: any[];
};

const AllPackagesProviderTable = ({ packagesData }: Props) => {
  const [form] = Form.useForm();
  const [selectedpackage, setselectedPackage] = useState<string>("");
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<[Dayjs, Dayjs] | undefined>(
    undefined,
  );

  const { t } = useTranslation();
  const packageOptions = packageItem(t).map((item) => ({
    id: item.key,
    name: item.label,
  }));

  const handlePkgChange = (value: any) => {
    setselectedPackage(value);
  };

  const isRTL = i18n.language === "ar";
  return (
    <>
      <Flex vertical gap={15} style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Flex vertical gap={15}>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xl={14} md={24} span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={24} md={24} lg={12}>
                    <SearchInput
                      placeholder={t("Search by Tracking ID")}
                      prefix={
                        <img
                          src="/assets/icons/search.png"
                          width={16}
                          alt="search icon"
                          fetchPriority="high"
                        />
                      }
                    />
                  </Col>
                  <Col span={24} lg={12}>
                    <MySelect
                      withoutForm
                      className="px-3 filter-bg fs-13 text-black"
                      options={packageOptions}
                      placeholder={t("Package Type")}
                      value={selectedpackage}
                      onChange={handlePkgChange}
                      allowClear
                      maxWidth={150}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24} md={24} xl={7}>
                <Flex justify="end" gap={10}>
                  <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder={[t("Start Year"), t("End Year")]}
                    value={selectedYear}
                    onChange={(dates: [Dayjs, Dayjs] | null) =>
                      setSelectedYear(dates ?? undefined)
                    }
                  />
                </Flex>
              </Col>
            </Row>
          </Form>
        </Flex>
        <Flex vertical gap={20}>
          <Table<AllPackageProviderType>
            size="large"
            columns={allpackageproviderColumn({ navigate }, t)}
            dataSource={
              Array.isArray(packagesData)
                ? packagesData.map((p: any, idx: number) => ({
                    key: p.id ?? p.pk ?? idx,
                    trackingID: p.tracking_id ?? p.trackingID ?? "",
                    senderName: p.merchant_name ?? p.senderName ?? "",
                    driverName: p.driver_name ?? p.driverName ?? "",
                    qrCode: p.qr_code ?? p.qrCode ?? "",
                    packageType: p.package_type ?? p.packageType ?? "",
                    status: p.status ?? p.shipment_status ?? "",
                    lastUpdate: p.last_update ?? p.lastUpdate ?? "",
                  }))
                : allpkgproviderData
            }
            className="pagination table-cs table"
            showSorterTooltip={false}
            scroll={{ x: 800 }}
            rowHoverable={false}
            pagination={false}
          />
        </Flex>
      </Flex>
    </>
  );
};

export { AllPackagesProviderTable };
