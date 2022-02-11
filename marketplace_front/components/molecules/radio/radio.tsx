import { Key } from 'react';

import classNames from 'classnames';

import styles from './radio.module.scss';

interface Props<T> {
  options: { label: string; value: T }[];
  name?: string;
  className?: string;
  value: T | null;
  setValue: (e: T) => void;
}

export const Radio = <T extends Key>({ options, name, className, value, setValue }: Props<T>) => {
  return (
    <ul className={classNames(className, styles.wrapper)}>
      {options.map((item) => (
        <li key={item.value}>
          <label>
            {item.label}
            <input name={name} type="radio" checked={value === item.value} onChange={() => setValue(item.value)} />
          </label>
        </li>
      ))}
    </ul>
  );
};
