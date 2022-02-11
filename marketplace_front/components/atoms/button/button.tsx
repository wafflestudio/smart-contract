import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import styles from './button.module.scss';

interface Props {
  className?: string;
  onClick: () => void;
}

export const Button = ({ children, onClick, className }: PropsWithChildren<Props>) => {
  return (
    <button onClick={onClick} className={classNames(className, styles.button)}>
      {children}
    </button>
  );
};
