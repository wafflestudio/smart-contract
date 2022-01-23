/**
 *
 * WafflePage
 *
 */
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Header } from 'app/components/Commons';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { selectContract } from 'app/pages/MainPage/slice/selectors';
import { Contract } from 'web3-eth-contract';
import { WAFFLE_TOKEN_ABI, WAFFLE_TOKEN_ADDRESS } from 'config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { useMainSlice } from '../MainPage/slice';
import { WAFFLE_COLORS } from 'types';

interface MatchParams {
  id: string;
}
export interface Props extends RouteComponentProps<MatchParams> {}

export const WafflePage = memo((props: Props) => {
  const { actions: mainActions } = useMainSlice();
  const dispatch = useDispatch();
  const contract = useSelector(selectContract);

  const [waffle, setWaffle] = useState<Waffle | null>(null);
  const [horizontals, setHorizontals] = useState<string[]>([]);
  const [verticals, setVerticals] = useState<string[]>([]);

  async function loadAccount() {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545'); // local
    const accounts = await web3.eth.requestAccounts();
    // const accounts = await web3.eth.getAccounts();
    dispatch(mainActions.setAccount(accounts[0]));
    return web3;
  }

  async function loadWaffles(web3: Web3) {
    const waffleTkn = new web3.eth.Contract(
      WAFFLE_TOKEN_ABI as AbiItem[],
      WAFFLE_TOKEN_ADDRESS,
    );
    dispatch(mainActions.setContract(waffleTkn));
  }

  useEffect(() => {
    async function loadingFallback() {
      const w3 = await loadAccount();
      loadWaffles(w3);
    }
    async function fetch() {
      const tokenId = Number(props.match.params.id) * 3;
      if (contract) {
        const waffle = await contract.methods.idToWaffle(tokenId).call();
        const hor = await contract.methods.showHorizontals(tokenId).call();
        const ver = await contract.methods.showVerticals(tokenId).call();
        console.log(waffle);
        setWaffle(waffle);
        setHorizontals(hor);
        setVerticals(ver);
      } else {
        loadingFallback();
      }
    }
    fetch();
  }, [contract]);

  return (
    <div>
      <Header />

      <Div>
        {waffle && (
          <WaffleWrapper flavor={waffle.flavor}>
            <HorizontalLine index={horizontals[0]} />
            <HorizontalLine index={horizontals[1]} />
            <VerticalLine index={verticals[0]} />
            <VerticalLine index={verticals[1]} />
          </WaffleWrapper>
        )}
      </Div>
    </div>
  );
});

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  justify-content: center;
  align-items: center;
`;
const WaffleWrapper = styled.div<{ flavor: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => WAFFLE_COLORS[props.flavor]};
`;

const HorizontalLine = styled.div<{ index: string }>`
  position: relative;
  background-color: burlywood;
  height: 10px;
  top: ${props => (100 / 8) * Number(props.index)}vh;
`;
const VerticalLine = styled.div<{ index: string }>`
  position: absolute;
  background-color: burlywood;
  width: 10px;
  height: 95vh;
  left: ${props => (100 / 8) * Number(props.index)}vw;
`;
