import { Typography } from '../../atoms/typography/typography';
import { MintButton } from '../../molecules/mint-button/mint-button';

import styles from './create-token.module.scss';

export const CreateToken = () => {
  return (
    <section className={styles.wrapper}>
      <Typography as="h3">토큰 만들기</Typography>
      <Typography className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </Typography>
      <MintButton className={styles.mintbutton} />
    </section>
  );
};
