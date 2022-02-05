import { useTokenList } from './token-list.queries';

export const TokenList = () => {
  const { data: tokenList } = useTokenList();

  console.log(tokenList);

  return null;
};
