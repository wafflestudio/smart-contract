import { PropsWithChildren } from 'react';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  className?: string;
}

export const Typography = ({
  as: Tag = 'p',
  variant = 'body',
  children,
  className,
}: PropsWithChildren<Props>) => {
  return <Tag className={className}>{children}</Tag>;
};
