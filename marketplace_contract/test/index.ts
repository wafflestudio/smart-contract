import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ethers as etherjs } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { asset, encodeAbi, ERC721, ERC20 } from "./util/index";

describe("WaffleExchange", function () {
  let waffleExchange: Contract;
  let nftProxy: Contract;
  let erc20Proxy: Contract;
  let exchangeAdmin: SignerWithAddress;
  let orderMaker: SignerWithAddress;
  let ordertkaer: SignerWithAddress;

  let fee: number;

  beforeEach(async () => {
    nftProxy = await (
      await ethers.getContractFactory("NftTransferProxy")
    ).deploy();

    erc20Proxy = await (
      await ethers.getContractFactory("ERC20TransferProxy")
    ).deploy();

    fee = 30;
    waffleExchange = await (
      await ethers.getContractFactory("WaffleExchange")
    ).deploy(nftProxy.address, erc20Proxy.address, fee);

    [exchangeAdmin, orderMaker, ordertkaer] = await ethers.getSigners();
  });
  it("Should return exchange fee dominator once it's deployed", async function () {
    const exchangeFee = await waffleExchange.getExchangeFee();
    expect(fee).to.equal(exchangeFee);
  });
  it("Should return regsistered order with maker asset & taker asset", async function () {
    const testErc721 = await (
      await ethers.getContractFactory("TestERC721")
    ).deploy("testName", "testSymbol");

    testErc721.mint(orderMaker.address, 1, "");

    const testErc20 = await (
      await ethers.getContractFactory("TestERC20")
    ).deploy("testNameToken", "testSymbolToken");

    const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 1), 1);
    const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 100);

    // registerOrder() 의 Return 값을 받을 순 없다. Transaction 정보만 받을 수 있다.
    const txReceipt = await waffleExchange.registerOrder(
      orderMaker.address,
      makeAsset,
      takeAsset
    );

    const registeredOrder = await waffleExchange.orderByMaker(
      orderMaker.address
    );

    const registeredOrderMakerAsset = {
      assetType: {
        assetClass: registeredOrder.makerAsset.assetType.assetClass,
        data: registeredOrder.makerAsset.assetType.data,
      },
      value: registeredOrder.makerAsset.value.toNumber(),
    };

    const registeredOrderTakerAsset = {
      assetType: {
        assetClass: registeredOrder.takerAsset.assetType.assetClass,
        data: registeredOrder.takerAsset.assetType.data,
      },
      value: registeredOrder.takerAsset.value.toNumber(),
    };

    expect(makeAsset).to.eql(registeredOrderMakerAsset);
    expect(takeAsset).to.eql(registeredOrderTakerAsset);
  });
  it("Should return proxy addresses once it's initilaized or changed", async function () {
    // TODO : proxy 정보를 불러오는 함수를 추가해야 합니다
  });
});
