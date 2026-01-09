import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Upload, Form, Typography, Flex, Avatar, Image, message } from "antd";
import type { UploadFile, UploadChangeParam } from "antd/es/upload/interface";
const { Dragger } = Upload;

interface UploadSingleFileProps {
  multiple?: boolean;
  name: string;
  required: boolean;
  validationMessage: string;
  form: any;
  label: string;
  title: string;
  onUpload: (file: File) => Promise<void>;
  align?: string;
  className?: string;
  labelimg?: string;
}

const UploadSingleFile: React.FC<UploadSingleFileProps> = ({
  multiple = false,
  name,
  required,
  validationMessage,
  form,
  label,
  title,
  onUpload,
  align = "center",
  className = "upload-d",
  labelimg = "/assets/icons/export.webp",
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    let newFileList = [...info.fileList];

    if (!multiple) {
      newFileList = newFileList.slice(-1);
    }

    setFileList(newFileList);

    const files = multiple
      ? (newFileList
          .map((file) => file.originFileObj)
          .filter(Boolean) as File[])
      : newFileList[0]?.originFileObj || null;
    form.setFieldsValue({ [name]: files });
    try {
      if (multiple) {
        // upload all files in parallel
        await Promise.all((files as File[]).map((file) => onUpload(file)));
      } else {
        if (files) await onUpload(files as File);
      }
      // You can show success message or update UI here if needed
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed");
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);

    const files = multiple
      ? (newFileList.map((f) => f.originFileObj).filter(Boolean) as File[])
      : null;
    form.setFieldsValue({ [name]: files || null });
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required,
          message: validationMessage,
        },
      ]}
      className="m-0 w-100"
    >
      <Flex vertical align={align} className="w-100">
        {(multiple || fileList.length === 0) && (
          <Dragger
            name="file"
            multiple={multiple}
            showUploadList={false}
            customRequest={({  onSuccess }) => {
              setTimeout(() => {
                onSuccess?.("ok");
              }, 1000);
            }}
            fileList={fileList}
            onChange={handleChange}
            onDrop={(e) => console.log("Dropped files", e.dataTransfer.files)}
            className={className}
          >
            {fileList.length === 0 || multiple ? (
              <Flex
                vertical
                align="center"
                justify="center"
                className="upload-flex"
              >
                <Image
                  src={labelimg}
                  width={24}
                  height={24}
                  alt="image icon"
                  fetchPriority="high"
                />
                <p className="ant-upload p-0 m-0 text-black">{title}</p>
              </Flex>
            ) : null}
          </Dragger>
        )}
        {fileList.length > 0 && (
          <div className="w-100">
            {fileList.map((file) => (
              <Flex
                key={file.uid}
                justify="space-between"
                className="w-100 p-2 mt-2 radius-4 bg-light-gray"
                gap={4}
              >
                <Flex align="center" gap={10} className="w-100">
                  <Avatar
                    src={
                      file.thumbUrl || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : '')
                    }
                    size={34}
                  />
                  <Flex vertical align="flex-start">
                    <Typography.Text className="text-gray fs-12">
                      {file.name.slice(0, 20)}
                      {file.name.length > 20 ? "..." : ""}
                    </Typography.Text>
                    <Typography.Text className="fs-12">
                      {(file.size ? (file.size / 1024 / 1024).toFixed(1) : '0')} MB
                    </Typography.Text>
                  </Flex>
                </Flex>
                <CloseOutlined
                  className="text-red cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(file);
                  }}
                />
              </Flex>
            ))}
          </div>
        )}
      </Flex>
    </Form.Item>
  );
};

export { UploadSingleFile };
