import Modal from 'react-modal';
import styles from './modal.module.scss';
import { useState } from 'react';

export const BuyModal = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button className={styles.modalButton} onClick={() => setCreateModalOpen(true)}></button>
      <Modal
        isOpen={isCreateModalOpen}
        style={{
          content: {
            width: 700,
            height: 400,
            margin: 'auto',
            border: '5px solid #b58259',
            background: 'bisque',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            padding: '20px',
          },
        }}
        onRequestClose={() => {
          setCreateModalOpen(false);
        }}
      >
        구매할 토큰 정보: 춘식이
        <br />
        토큰 판매자 address: <br />
        가격:
        <br /> <button className={styles.smallButton}>↵</button>
      </Modal>
    </div>
  );
};
