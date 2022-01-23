import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Header } from 'app/components/Commons';
import { WAFFLE_TOKEN_ADDRESS, WAFFLE_TOKEN_ABI } from 'config';
import { WAFFLE_FLAVORS, WAFFLE_COLORS } from 'types';
import { useHistory } from 'react-router-dom';
import { useMainSlice } from './slice';
import { useDispatch } from 'react-redux';

export function MainPage() {
  const { actions } = useMainSlice();
  const dispatch = useDispatch();
  const history = useHistory();
  const [account, setAccount] = useState<string>('');
  const [waffleToken, setWaffleToken] = useState<Contract | null>(null);
  const [waffles, setWaffles] = useState<Waffle[]>([]);

  async function loadAccount() {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545'); // local
    const accounts = await web3.eth.requestAccounts();
    // const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    return web3;
  }

  async function loadWaffles(web3: Web3) {
    const waffleTkn = new web3.eth.Contract(
      WAFFLE_TOKEN_ABI as AbiItem[],
      WAFFLE_TOKEN_ADDRESS,
    );
    setWaffleToken(waffleTkn);
    dispatch(actions.setContract(waffleTkn));
    // Then we get total number of contacts for iteration
    // TODO: 하드코딩된 부분 없애기
    const newWFTKs = await Promise.all(
      Array(36)
        .fill(0)
        .map((_, i) => waffleTkn.methods.idToWaffle(i).call()),
    );
    setWaffles(wftks => [...wftks, ...newWFTKs]);
  }

  useEffect(() => {
    async function load() {
      const w3 = await loadAccount();
      loadWaffles(w3);
    }
    load();
    return () => {
      setAccount('');
      setWaffles([]);
      setWaffleToken(null);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Waffle Tokens</title>
        <meta name="description" content="WaffleToken Main Page" />
      </Helmet>
      <Container>
        <Account draggable="true">logged in as {account}</Account>
        <Header />
        <TokenList>
          {waffles
            .filter(value => value.name !== '')
            .map((waffle, index) => (
              <TokenListRow
                key={`${waffle.name}-${index}`}
                onClick={e => {
                  e.preventDefault();
                  console.log(index);
                  history.push(`/waffle/${index}`);
                }}
                flavor={waffle.flavor}
              >
                <h4>{waffle.name}</h4>
                <span>
                  <B>Flavor: </B>
                  {WAFFLE_FLAVORS[waffle.flavor]}
                </span>
              </TokenListRow>
            ))}
        </TokenList>
      </Container>
    </>
  );
}

const Account = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: white;
  background-color: burlywood;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TokenList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const TokenListRow = styled.div<{ flavor: string }>`
  cursor: pointer;
  flex-flow: column;
  text-align: center;
  width: 33%;
  min-height: 25vh;
  border: solid 0.1vh blanchedalmond;
  float: left;
  background-color: ${props => WAFFLE_COLORS[props.flavor]};
  opacity: 90%;
  color: #5b4131;

  ${({ flavor }) =>
    flavor === '1' &&
    `
    color: #F3E5AB;
  `}
`;

const B = styled.b``;
