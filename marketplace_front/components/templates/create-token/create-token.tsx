import { useState } from 'react';

import Modal from 'react-modal';

import { Typography } from '../../atoms';
import { MintButton } from '../../molecules';
import { CreateTokenModalContent } from '../../organisms/create-token-modal-content/create-token-modal-content';

import styles from './create-token.module.scss';

export const CreateToken = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className={styles.wrapper}>
        <Typography as="h3">토큰 만들기</Typography>
        <Typography className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Typography>
        <MintButton className={styles.mintbutton} onClick={() => setModalOpen(true)} />
      </section>
      <Modal
        style={{ overlay: { zIndex: 9 } }}
        className={styles.modal}
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <CreateTokenModalContent close={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};
