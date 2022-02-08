import { PropsWithChildren } from 'react';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Typography = ({ children, as: Tag = 'p', className }: PropsWithChildren<Props>) => {
  return <Tag className={className}>{children}</Tag>;
};
