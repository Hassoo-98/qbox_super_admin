import React, { useState } from "react";
import { PlusOutlined, MinusCircleFilled } from "@ant-design/icons";
import { Upload, Form, Flex, message } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import type { FormInstance } from "antd/es/form";

const { Dragger } = Upload;

type SingleFileUploadProps = {
  multiple?: boolean;
  name: string;
  required?: boolean;
  message?: string;
  form: FormInstance;
  label?: string | null;
  title?: string;
  align?: "start" | "center" | "end" | "flex-start" | "flex-end";
  width?: number;
  height?: number;
  onUpload?: (file: RcFile | RcFile[]) => Promise<void>;
  className?: string;
};

const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  multiple = false,
  name,
  required,
  message: errorMessage,
  form,
  label,
  title,
  onUpload,
  align = "center",
  width = 150,
  height = 150,
  className,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = async (info) => {
    let newFileList = [...info.fileList];

    // Validate file type only if multiple
    if (multiple) {
      const validFiles = newFileList.filter((file) =>
        allowedTypes.includes(file.type || "")
      );

      if (validFiles.length !== newFileList.length) {
        message.error("Only PNG, JPG, JPEG, and WEBP images are allowed.");
      }

      newFileList = validFiles;
    }

    // If not multiple — only keep the last file
    if (!multiple) {
      newFileList = newFileList.slice(-1);
    }

    setFileList(newFileList);

    // Extract RcFile(s)
    const files = multiple
      ? newFileList
          .map((file) => file.originFileObj)
          .filter((f): f is RcFile => !!f)
      : (newFileList[0]?.originFileObj as RcFile | null) || null;

    // Update form value
    form.setFieldsValue({ [name]: files });

    // Uploading — check if onUpload exists
    try {
      if (onUpload) {
        if (multiple) {
          await onUpload(files as RcFile[]);
        } else if (files) {
          await onUpload(files as RcFile);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleRemove = (file: UploadFile) => {
    const updated = fileList.filter((f) => f.uid !== file.uid);
    setFileList(updated);

    const files = multiple
      ? updated.map((f) => f.originFileObj).filter((f): f is RcFile => !!f)
      : null;

    form.setFieldsValue({ [name]: files });
  };

  return (
    <Form.Item
      name={name}
      label={label ? label : null}
      rules={[
        {
          required,
          message: errorMessage,
        },
      ]}
      className={`m-0 w-100 ${className}`}
    >
      <Flex vertical align={align} className="w-100">
        {(multiple || fileList.length === 0) && (
          <Dragger
            name="file"
            multiple={multiple}
            showUploadList={false}
            customRequest={({ onSuccess }) => {
              setTimeout(() => onSuccess?.("ok"), 300);
            }}
            onChange={handleChange}
            fileList={fileList}
            className="upload-d"
          >
            {(fileList.length === 0 || multiple) && (
              <Flex
                vertical
                gap={5}
                align="center"
                justify="center"
                className="upload-flex"
              >
                <PlusOutlined className="fs-16" />
                <p className="ant-upload p-0 m-0 text-black">{title}</p>
              </Flex>
            )}
          </Dragger>
        )}

        {fileList.length > 0 && (
          <Flex vertical gap={10} align={align} className="w-100 mt-2">
            {fileList.map((file) => {
              const isImage =
                file.type?.startsWith("image/") ||
                /\.(png|jpe?g|gif|webp)$/i.test(file.name);

              const preview =
                file.thumbUrl ||
                (file.originFileObj
                  ? URL.createObjectURL(file.originFileObj)
                  : "");

              return (
                <Flex key={file.uid} align="center" gap={10} justify={align}>
                  {isImage ? (
                    <img
                      src={preview}
                      alt={file.name}
                      style={{ maxWidth: `${width}px`, maxHeight: `${height}px`, width: "auto", height: "auto" }}
                      className="object-contain radius-12"
                    />
                  ) : (
                    <img
                      src="/assets/icons/file.png"
                      alt="file-icon"
                      width={24}
                      className="pt-1"
                    />
                  )}

                  <MinusCircleFilled
                    className="text-red cursor delete-btn fs-18"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(file);
                    }}
                  />
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Form.Item>
  );
};

export { SingleFileUpload };
