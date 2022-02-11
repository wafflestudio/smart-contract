import { ChangeEventHandler } from 'react';

import classNames from 'classnames';

import styles from './input.module.scss';

interface Props {
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ className, value, onChange }: Props) => {
  return <input className={classNames(className, styles.input)} value={value} onChange={onChange} />;
};
