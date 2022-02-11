import { PropsWithChildren } from 'react';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onClick?: () => void;
}

export const Typography = ({ children, as: Tag = 'p', className, onClick }: PropsWithChildren<Props>) => {
  return (
    <Tag className={className} onClick={onClick}>
      {children}
    </Tag>
  );
};
