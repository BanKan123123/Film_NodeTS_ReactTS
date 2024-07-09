import { Modal } from 'antd';
import React from 'react';
import { ModalCommon } from '../../../common/interface/common.interface';

const ModalDeleteFilm: React.FC<ModalCommon> = (props: ModalCommon) => {
    return (
        <>
            <Modal title={props.title} open={props.openModal}>
                <h3>Are you sure want to delete film {props.title}</h3>
            </Modal>
        </>
    );
};

export default ModalDeleteFilm;
