import React from "react";
import {
  Row,
  Col,
  Flex,
  Image,
  Typography,
  Form,
  Checkbox,
  Button,
} from "antd";
import { MyInput } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { message } from "antd";
import "./Login.css";

const { Text, Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {login,isLoggingIn}=useAuth();
  const onFinish=(values:any)=>{
    login(values,{
      onSuccess:()=>{
        message.success("User login successfully")
        navigate("/")
      },
      onError:(error:any)=>{
        message.error(error.message || "Login Failed")
      }
    })
  }

  return (
    <div className="p-30">
    
      <div className="container">
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} className="login-left-side">
            <div className="form-inner">
              <Flex justify={i18n.language === "en" ? "start" : "end"}>
                <Button
                  className="text-brand border-brand"
                  aria-labelledby="Arrow left"
                  shape="circle"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeftOutlined />
                </Button>
              </Flex>

              <div className="logo">
                <img
                  src="/assets/images/logo.png"
                  style={{ height: "70px" }}
                  alt="Logo"
                />
              </div>
              <Title level={3}>{t("Welcome Back")}</Title>
              <Paragraph className="text-grey fs-16">
                {t(
                  "Please Sign in to access your system and manage platform activities.",
                )}
              </Paragraph>
              <Form
                layout="vertical"
                form={form}
                requiredMark={false}
                className="mt-3"
                onFinish={onFinish}
              
              >
                <MyInput
                  label={t("Email Address")}
                  name="email"
                  type={"text"}
                  required
                  message={t("Please Enter Email Address")}
                  placeholder={t("Enter Email Address")}
                  className="bg-grey"
                />
                <MyInput
                  label={t("Password")}
                  type="password"
                  name="password"
                  required
                  message={t("Please Enter Password")}
                  placeholder={t("Enter Password")}
                  className="bg-grey"
                />
                <Flex justify="space-between" className="mb-3">
                  <Checkbox>{t("Remember Me")}</Checkbox>
                  <NavLink to={"/forget-password"} className="fs-13 text-brand">
                    {t("Forget Password?")}
                  </NavLink>
                </Flex>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="btn bg-brand fs-16 mt-2"
                  loading={isLoggingIn}
                  block
                  // loading={isPending}
                >
                  {t("Sign In")}
                </Button>
                <Flex justify="center" className="mt-1">
                  <Paragraph className="fs-14">
                    {t("Create an account?")}{" "}
                    <NavLink to={"/signup"} className={"text-brand"}>
                      {t("Sign Up")}
                    </NavLink>
                  </Paragraph>
                </Flex>
              </Form>
            </div>
          </Col>
          <Col xs={0} sm={0} md={0} lg={12} className="login-right-side">
            <Flex vertical gap={50} align="center" className="h-100">
              <Image src="/assets/images/dashboard.png" preview={false} />
              <Flex vertical gap={5}>
                <Title className="m-0 text-white" level={3}>
                  {t("Clinic Control at Your Fingertips")}
                </Title>
                <Text className="m-0 text-white fs-16">
                  {t(
                    "Access smart dashboards, patient insights, and tools to grow your clinic with ease.",
                  )}
                </Text>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { LoginPage };
