import { Row, Col, Form, Space, Typography, Switch } from "antd";
import type { FormInstance } from "antd/es/form";
import { useState, useEffect } from "react";
import { MyDatepicker } from "../Forms";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";


const { Text } = Typography;

interface TimeFormProps {
    dayKey: string;
    title: string;
    form: FormInstance;
    editactive?: boolean;
}

interface TimeField {
    fromTime: Dayjs | null;
    toTime: Dayjs | null;
}

const TimeForm: React.FC<TimeFormProps> = ({ dayKey, title, form, editactive }) => {
    const { t } = useTranslation();
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(dayKey !== "Friday");

    const isEditable = editactive ?? true;

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };

    useEffect(() => {
        const fields: TimeField[] = form.getFieldValue(dayKey) || [];
        if (fields.length === 0) {
            form.setFieldsValue({ [dayKey]: [{ fromTime: null, toTime: null }] });
        }
    }, [dayKey, form]);

    return (
        <Form.List name={dayKey}>
            {(fields) => (
                <Space direction="vertical" className="w-100 mb-3">
                    <Row gutter={[16, 16]} className="mb-3" align="middle">
                        <Col lg={6} md={24} sm={24} xs={24}>
                            <Space align="center" size={10}>
                                <Switch
                                    size="small"
                                    checked={isSwitchOn}
                                    onChange={handleSwitchChange}
                                />
                                <Text className="fw-500">{title}</Text>
                            </Space>
                        </Col>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            {fields.map(({ key, name }) => (
                                <Row key={key} gutter={[16, 16]} align="middle" className="mb-1">
                                    {isSwitchOn ? (
                                        <>
                                            <Col xs={24} sm={24} md={12} lg={12}>
                                                <MyDatepicker
                                                    withoutForm
                                                    name={[name, "fromTime"]}
                                                    placeholder={t("From")}
                                                    required
                                                    message={t("Please enter from time")}
                                                    disabled={!isEditable}
                                                    value={form.getFieldValue([dayKey, name, "fromTime"])}
                                                    use12Hours
                                                    format="h:mm A"
                                                />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12}>
                                                <MyDatepicker
                                                    withoutForm
                                                    name={[name, "toTime"]}
                                                    placeholder={t("To")}
                                                    required
                                                    message={t("Please enter to time")}
                                                    disabled={!isEditable}
                                                    value={form.getFieldValue([dayKey, name, "toTime"])}
                                                    use12Hours
                                                    format="h:mm A"
                                                />
                                            </Col>
                                        </>
                                    ) : (
                                        <Col span={24}>
                                            <Space className="offday w-100" size={5} align="center">
                                                <img
                                                    src="/assets/icons/off.webp"
                                                    width={20}
                                                    alt="not allow icon"
                                                    fetchPriority="high"
                                                />
                                                <Text italic className="text-gray">
                                                    {t("Day Off")}
                                                </Text>
                                            </Space>
                                        </Col>
                                    )}
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </Space>
            )}
        </Form.List>
    );
};

export { TimeForm };
