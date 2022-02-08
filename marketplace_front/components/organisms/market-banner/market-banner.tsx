import classNames from 'classnames';

interface Props {
  className?: string;
}

export const MarketBanner = ({ className }: Props) => {
  return <section className={classNames(className)}>마켓 보러가기</section>;
};
