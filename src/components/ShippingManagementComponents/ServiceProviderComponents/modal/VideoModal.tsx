import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Form, Modal, Typography } from 'antd'
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../sources/i18n';

interface props {
    visible: boolean;
    onClose: () => void;
}


const { Title } = Typography;

const VideoModal: React.FC<props> = ({ visible, onClose }) => {
    const {t}=useTranslation()
    const [form] = Form.useForm();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (visible) {
            video?.play().catch(() => {});
        } else {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    }, [visible]);
   
        const isRTL = i18n.language === "ar";

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
               style={{ direction: isRTL ? "rtl" : "ltr" }}
        
            centered
            width={600}
            footer={
                <Button 
                    type="primary" 
                    className="btnsave border-0 text-white bg-slate-blue w-100" 
                    onClick={() => form.submit()}
                >
                    {t("Download")}
                </Button>
            }
        >
            <Flex vertical gap={10}>
                
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t("SB-A1-001 (Super Market)")}
                    </Title>
                    <Button onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex>
                <video 
                    ref={videoRef}
                    width="100%" 
                    height="auto"
                    muted 
                    controls
                    playsInline
                >
                    <source 
                        src="/assets/images/mov_bbb.mp4"
                        type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                </video>
                
            </Flex>

            <Divider className='my-2 bg-light-brand' />
        </Modal>
    );
};

export { VideoModal };
