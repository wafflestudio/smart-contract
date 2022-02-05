import { Typography } from '../../atom/typography/typography';

interface Props {
  title: string;
  content: string;
}

export const PageTitle = ({ title, content }: Props) => {
  return (
    <>
      <Typography as={'h1'} variant={'title'}>
        {title}
      </Typography>
      <Typography>{content}</Typography>
    </>
  );
};
