import React from "react";
import { Form, Input, Button, Card, Flex, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLogin } from "../../api/hooks";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const onFinish = (values: any) => {
    login(values, {
      onSuccess: (data) => {
        messageApi.success("Login successful!");
        // Typically you'd save the token here
        localStorage.setItem("token", data.token || "");
        navigate("/");
      },
      onError: (error: any) => {
        messageApi.error(error.message || "Login failed");
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Flex
        align="center"
        justify="center"
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #1d39c4 0%, #001529 100%)",
        }}
      >
        <Card
          style={{
            width: 400,
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            border: "none",
          }}
        >
          <Flex vertical align="center" gap={10} style={{ marginBottom: 30 }}>
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              style={{ width: 120, marginBottom: 10 }}
            />
            <Title level={3} style={{ margin: 0 }}>
              Welcome Back
            </Title>
            <Text type="secondary">Please enter your details to login</Text>
          </Flex>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Email"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Password"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isPending}
                style={{
                  borderRadius: 8,
                  height: 45,
                  fontSize: 16,
                  fontWeight: 600,
                  background: "#1d39c4",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export { LoginPage };
