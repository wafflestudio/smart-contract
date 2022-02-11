import classNames from 'classnames';

import styles from './mint-button.module.scss';

interface Props {
  className?: string;
  onClick: () => void;
}

export const MintButton = ({ className, onClick }: Props) => {
  return (
    <button className={classNames(className, styles.mintButton)} onClick={onClick}>
      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </button>
  );
};
