import { useTokenList } from './token-list.queries';

export const TokenList = () => {
  const { data: tokenList } = useTokenList();

  console.log(tokenList);

  return (
    <ul>
      {tokenList?.map((item, i) => (
        <li key={i}>
          {item.name} <br />
          {item.flavor}
        </li>
      ))}
    </ul>
  );
};
