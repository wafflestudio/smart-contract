import classNames from 'classnames';

import { FLAVOR_COLOR_MAP } from '../../../library/flavor';
import { Waffle1155, Waffle721 } from '../../../library/utils';

import styles from './waffle-721-display.module.scss';

interface Props {
  token: Waffle721;
  setOpenToken: (t: Waffle721 | Waffle1155 | null) => void;
  className?: string;
}

export const WaffleDisplay = ({ token, setOpenToken, className }: Props) => {
  return (
    <div
      className={classNames(className, styles.waffle)}
      style={{
        gridTemplateRows: token.ver.join('fr ') + 'fr',
        gridTemplateColumns: token.hor.join('fr ') + 'fr',
      }}
    >
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={styles.waffleBlock}
            style={{
              backgroundColor: FLAVOR_COLOR_MAP[token.flavor],
            }}
            onClick={() => setOpenToken(token)}
          />
        ))}
    </div>
  );
};
