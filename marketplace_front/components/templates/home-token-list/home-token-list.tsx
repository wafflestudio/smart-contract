import classNames from 'classnames';

import { Typography } from '../../atoms/typography/typography';

import styles from './home-token-list.module.scss';

import { useState } from 'react';
import Modal from 'react-modal';

interface Props {
  className?: string;
}

export const HomeTokenList = ({ className }: Props) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <section className={classNames(className, styles.wrapper)}>
      <Typography as="h1">내 토큰</Typography>
      <Typography className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <div className={styles.previewList}>
        <div>
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
            Token Name: 춘식이
            <br />
            Seller Address: <br />
            Price: 0eth
            <br /> <button className={styles.smallButton}>↵</button>
          </Modal>
        </div>
        <img className={styles.preview} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        <button className={styles.modalButton} onClick={() => setCreateModalOpen(true)}></button>

        <img className={styles.preview} src="https://cdn.worldvectorlogo.com/logos/gitlab.svg" />
        <button className={styles.modalButton} onClick={() => setCreateModalOpen(true)}></button>

        <img
          className={styles.preview}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png"
        />
        <button className={styles.modalButton} onClick={() => setCreateModalOpen(true)}></button>
      </div>
    </section>
  );
};
