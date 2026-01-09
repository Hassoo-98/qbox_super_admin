import { Form, Input, Typography } from 'antd';
import './index.css';
import type { Rule } from 'antd/es/form';
import type { NamePath } from 'antd/es/form/interface';

interface MyInputProps {
  withoutForm?: boolean;
  name?: string;
  label?: string;
  tooltip?: string;
  type?: 'text' | 'password' | 'number';
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  required?: boolean;
  message?: string;
  value?: string;
  placeholder?: string;
  textArea?: boolean;
  oTp?: boolean;
  nolabel?: boolean;
  validator?: Rule;
  prefix?: string;
  autoFocus?: boolean;
  dependencies?: NamePath[];
   rules?: Rule[];
   suffix?: string;
   addonBefore?: string;
   addonAfter?: string;
}


export const MyInput:React.FC<MyInputProps> = ({withoutForm, name, label, tooltip, type, size, disabled, required, message, value, placeholder, textArea, oTp, nolabel=true, validator, ...props }) => {
    return (
        <>
            {
                withoutForm ?
                    textArea ?
                        <Input.TextArea
                            placeholder={placeholder || ''}
                            value={value || ''}
                            {...props}
                            className='custom-input fs-14'
                        /> :
                    type==='password' ?
                        <Input.Password
                            placeholder={placeholder || ''}
                            value={value || ''}
                            size={size || 'middle'}
                            disabled={disabled || false}
                            {...props}
                            className='custom-input fs-14'
                            />:
                        <Input
                            type={type || 'text'}
                            placeholder={placeholder || ''}
                            value={value || ''}
                            size={size || 'middle'}
                            disabled={disabled || false}
                            {...props}
                            className='custom-input fs-14'
                        />
                :
                <Form.Item
                    name={name}
                    label={<Typography.Text className='fs-14 fw-400'>{label}</Typography.Text>}
                    tooltip={tooltip || null}
                    className='custom-input fs-14 otp-cs'
                    rules={validator ? [
                        {
                            required: required,
                            message: message,
                        },
                        validator
                    ] : [
                        {
                            required: required,
                            message: message,
                        },
                    ]}
                >
                    {
                        textArea ?
                            <Input.TextArea
                                placeholder={placeholder || ''}
                                value={value || ''}
                                {...props}
                                disabled={disabled || false}
                            /> :
                            oTp ?
                            <Input.OTP 
                                value={value || ''}
                                {...props}
                                disabled={disabled || false}
                            /> :
                        type==='password' ?
                            <Input.Password
                                placeholder={placeholder || ''}
                                value={value || ''}
                                size={size || 'middle'}
                                disabled={disabled || false}
                                {...props}
                                />:
                            <Input
                                type={type || 'text'}
                                placeholder={placeholder || ''}
                                value={value || ''}
                                size={size || 'middle'}
                                disabled={disabled || false}
                                {...props}
                            />
                    }
                </Form.Item>

            }
        </>
    )
}