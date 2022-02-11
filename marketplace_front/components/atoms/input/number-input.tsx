import { ChangeEventHandler } from 'react';

import classNames from 'classnames';

import styles from './input.module.scss';

interface Props {
  className?: string;
  value: number;
  min: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const NumberInput = ({ className, value, min, onChange }: Props) => {
  return <input className={classNames(className, styles.input)} type="number" min={min} value={value} onChange={onChange} />;
};
