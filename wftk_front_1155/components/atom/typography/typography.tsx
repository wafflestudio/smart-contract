import { PropsWithChildren } from 'react';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
}

export const Typography = ({
  as: Tag = 'p',
  variant = 'body',
  children,
}: PropsWithChildren<Props>) => {
  return <Tag>{children}</Tag>;
};
