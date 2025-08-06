'use client';
import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useAuthState, useAuthActions } from '@/providers/auth-providers';

interface EditProfileModalProps {
    open: boolean;
    onClose: () => void;
}

const UpdateProfileModal = ({ open, onClose }: EditProfileModalProps) => {
    const [form] = Form.useForm();
    const { profile } = useAuthState();
    const { updateDeveloperProfile } = useAuthActions();

    useEffect(() => {
        if (profile) {
            form.setFieldsValue(profile);
        }
    }, [profile, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            updateDeveloperProfile(values);
            onClose();
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            okText="Save"
            cancelText="Cancel"
            title="Edit Profile"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input style={{color:"black"}}/>
                </Form.Item>
                <Form.Item
                    label="Surname"
                    name="surname"
                    rules={[{ required: true, message: 'Please enter your surname' }]}
                >
                    <Input style={{color:"black"}}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateProfileModal;
