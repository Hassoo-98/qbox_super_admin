import { Form, TimePicker, DatePicker, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface MyDatepickerProps {
  withoutForm?: boolean;
  name?: string | (string | number)[];
  label?: string;
  disabled?: boolean;
  required?: boolean;
  message?: string;
  value?: string | Dayjs | [Dayjs, Dayjs];
  rangePicker?: boolean;
  placeholder?: string | [string, string];
  datePicker?: boolean;
  [key: string]: any;
}

export const MyDatepicker: React.FC<MyDatepickerProps> = ({
  withoutForm,
  name,
  label,
  disabled,
  required,
  message,
  value,
  rangePicker,
  placeholder,
  datePicker,
  ...props
}) => {
  return (
    <>
      {
        withoutForm ?
          (
            datePicker ?
              <DatePicker
                disabled={disabled || false}
                value={value ? dayjs(value as string) : undefined}
                format={'YYYY-MM-DD'}
                {...props}
                className={'fs-14 without-timeinput w-100'}
                placeholder={placeholder as string}
              />
              :
              rangePicker ?
                <DatePicker.RangePicker
                  disabled={disabled || false}
                  value={value as [Dayjs, Dayjs]}
                  {...props}
                  className='fs-14 without-timeinput w-100'
                  placeholder={placeholder as [string, string]}
                />
                :
                <TimePicker
                  disabled={disabled || false}
                  placeholder={placeholder as string}
                  format='HH:mm A'
                  {...props}
                  className='fs-14 without-timeinput w-100'
                />
          )
          :
          <Form.Item
            name={name}
            label={<Typography.Text className='fs-14 fw-400'>{label}</Typography.Text>}
            rules={[
              {
                required,
                message,
              },
            ]}
            className='custom-input fs-14'
          >
            {
              datePicker ?
                <DatePicker
                  disabled={disabled || false}
                  value={value ? dayjs(value as string) : undefined}
                  {...props}
                  className='w-100'
                  placeholder={placeholder as string}
                />
                :
                rangePicker ?
                  <DatePicker.RangePicker
                    disabled={disabled || false}
                    value={value as [Dayjs, Dayjs]}
                    {...props}
                    className='w-100'
                    placeholder={placeholder as [string, string]}
                  /> :
                  <TimePicker
                    disabled={disabled || false}
                    value={dayjs((value as string) || '00:00')}
                    format='HH:mm A'
                    placeholder={placeholder as string}
                    {...props}
                    className='w-100'
                  />
            }
          </Form.Item>
      }
    </>
  )
}