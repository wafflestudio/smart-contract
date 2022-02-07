import styles from './waffle-display.module.scss';
import { Flavor, FLAVOR_COLOR_MAP } from '../../../library/flavor';
import classNames from 'classnames';

interface Props {
  hor: [number, number, number];
  ver: [number, number, number];
  flavor: Flavor;
  className?: string;
}

export const WaffleDisplay = ({ hor, ver, flavor, className }: Props) => {
  return (
    <div
      className={classNames(className, styles.waffle)}
      style={{
        gridTemplateRows: ver.join('fr ') + 'fr',
        gridTemplateColumns: hor.join('fr ') + 'fr',
      }}
    >
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={styles.waffleBlock}
            style={{
              backgroundColor: FLAVOR_COLOR_MAP[flavor],
            }}
          />
        ))}
    </div>
  );
};
