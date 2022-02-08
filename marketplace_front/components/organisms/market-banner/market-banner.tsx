import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const MarketBanner = ({ className }: Props) => {
  return (
    <section className={classNames(className)}>
      <Link href={'/market'}>마켓 보러가기</Link>
    </section>
  );
};
