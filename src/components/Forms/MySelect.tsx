import { Form, Select, Typography } from "antd";
import type { SelectProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.css";

interface OptionType {
  id: string | number;
  name: string;
}

interface MySelectProps extends Omit<SelectProps, "options" | "value"> {
  withoutForm?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  mode?: "multiple" | "tags";
  disabled?: boolean;
  required?: boolean;
  message?: string;
  value?: string | string[] | number | number[] | null;
  options?: OptionType[];
  className?: string;
  error?: string;
  maxWidth?: number | string;
}

export const MySelect: React.FC<MySelectProps> = ({
  withoutForm,
  placeholder,
  name,
  label,
  mode,
  disabled = false,
  required = false,
  message,
  value,
  options = [],
  className = "",
  error,
  maxWidth,
  ...props
}) => {
  return withoutForm ? (
    <Select
      maxTagCount="responsive"
      className={`select without-form-select w-100 ${className}`}
      style={{ maxWidth }}
      value={value}
      mode={mode}
      suffixIcon={<DownOutlined />}
      disabled={disabled}
      {...props}
      placeholder={placeholder}
    >
      {options.map((opt) => (
        <Select.Option value={opt.id} key={opt.id}>
          {opt.name}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Form.Item
      name={name}
      label={
        label ? (
          <Typography.Text className="fs-14 fw-400">{label}</Typography.Text>
        ) : null
      }
      rules={required ? [{ required, message }] : []}
      help={error}
      className="custom-select"
    >
      <Select
        value={value}
        mode={mode}
        disabled={disabled}
        maxTagCount="responsive"
        style={{ maxWidth }}
        {...props}
        placeholder={placeholder}
      >
        {options.map((opt) => (
          <Select.Option value={opt.id} key={opt.id}>
            {opt.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
