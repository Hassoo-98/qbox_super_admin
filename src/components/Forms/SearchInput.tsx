import React from 'react';
import { Form, Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import type { PasswordProps } from 'antd/es/input/Password';
import type { Rule } from 'antd/es/form';
import './index.css';

// TextAreaProps se prefix hata diya
type TextAreaOnlyProps = Omit<TextAreaProps, 'prefix'>;

// Input/Password props me prefix allowed
type InputOrPasswordProps = Omit<InputProps, 'prefix'> & Partial<PasswordProps> & { prefix?: React.ReactNode };

interface SearchInputProps {
  withoutForm?: boolean;
  name?: string;
  label?: string;
  tooltip?: string;
  type?: 'text' | 'password';
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  required?: boolean;
  message?: string;
  value?: string;
  placeholder?: string;
  textArea?: boolean;
  validator?: Rule;
  alt?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  prefix?: React.ReactNode; // ✅ Allowed for Input/Password
  inputProps?: InputOrPasswordProps;
  textAreaProps?: TextAreaOnlyProps;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  withoutForm,
  name,
  tooltip,
  type = 'text',
  size = 'middle',
  disabled = false,
  required = false,
  message,
  value,
  placeholder,
  textArea,
  validator,
  prefix,
  inputProps,
  textAreaProps,
}) => {
  return (
    <>
      {withoutForm ? (
        textArea ? (
          <Input.TextArea
            placeholder={placeholder || ''}
            value={value || ''}
            {...textAreaProps}
            disabled={disabled}
            className="searchinputno"
          />
        ) : type === 'password' ? (
          <Input.Password
            placeholder={placeholder || ''}
            value={value || ''}
            size={size}
            disabled={disabled}
            prefix={prefix}
            {...inputProps}
            className="searchinputno"
          />
        ) : (
          <Input
            placeholder={placeholder || ''}
            value={value || ''}
            size={size}
            disabled={disabled}
            prefix={prefix}
            {...inputProps}
            className="searchinputno"
          />
        )
      ) : (
        <Form.Item
          name={name}
          tooltip={tooltip}
          rules={
            validator
              ? [
                  { required, message },
                  validator,
                ]
              : [{ required, message }]
          }
          className="custom-input1 fs-14 m-0"
        >
          {textArea ? (
            <Input.TextArea
              placeholder={placeholder || ''}
              value={value || ''}
              {...textAreaProps}
              disabled={disabled}
            />
          ) : type === 'password' ? (
            <Input.Password
              placeholder={placeholder || ''}
              value={value}
              size={size}
              disabled={disabled}
              prefix={prefix}
              {...inputProps}
            />
          ) : (
            <Input
              placeholder={placeholder || ''}
              value={value}
              size={size}
              disabled={disabled}
              prefix={prefix}
              {...inputProps}
            />
          )}
        </Form.Item>
      )}
    </>
  );
};
