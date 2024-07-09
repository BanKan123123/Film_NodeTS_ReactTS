import React, { useState } from 'react';
import { ModalCommon } from '../interface/common.interface';
import { Modal, Button } from 'antd';

const ModalComponents: React.FC<ModalCommon> = (props: ModalCommon) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.title}
            </Button>
            <Modal title={props.title} open={isModalOpen} onCancel={handleCancel}>
                <props.body />
            </Modal>
        </>
    );
};

export default ModalComponents;
