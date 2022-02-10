import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { asset, encodeAbi, ERC721, ERC20 } from "./util/index";

describe("WaffleExchange", function () {
  let waffleExchange: Contract;
  let nftProxy: Contract;
  let erc20Proxy: Contract;
  let exchangeAdmin: SignerWithAddress;
  let orderMaker: SignerWithAddress;
  let ordertaker: SignerWithAddress;

  let fee: number;

  beforeEach(async () => {
    [exchangeAdmin, orderMaker, ordertaker] = await ethers.getSigners();

    nftProxy = await (await ethers.getContractFactory("NftTransferProxy"))
      .connect(exchangeAdmin)
      .deploy();

    erc20Proxy = await (await ethers.getContractFactory("ERC20TransferProxy"))
      .connect(exchangeAdmin)
      .deploy();

    fee = 30;

    waffleExchange = await (await ethers.getContractFactory("WaffleExchange"))
      .connect(exchangeAdmin)
      .deploy(nftProxy.address, erc20Proxy.address, fee);

    await nftProxy.connect(exchangeAdmin).__TransferProxy_init();
    await erc20Proxy.connect(exchangeAdmin).__ERC20TransferProxy_init();

    await nftProxy.connect(exchangeAdmin).addOperator(waffleExchange.address);
    await erc20Proxy.connect(exchangeAdmin).addOperator(waffleExchange.address);
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
  it("Should match order success with correct maker asset and taker asset", async function () {
    const testErc721 = await (
      await ethers.getContractFactory("TestERC721")
    ).deploy("testName", "testSymbol");

    testErc721.mint(orderMaker.address, 7, "");
    testErc721.connect(orderMaker).approve(nftProxy.address, 7);

    const testErc20 = await (
      await ethers.getContractFactory("TestERC20")
    ).deploy("waffleCoin", "waffle");

    testErc20.mint(ordertaker.address, 1000);
    testErc20.connect(ordertaker).approve(erc20Proxy.address, 10);

    const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
    const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

    await waffleExchange.registerOrder(
      orderMaker.address,
      makeAsset,
      takeAsset
    );

    await waffleExchange.matchOrder(ordertaker.address, 1, takeAsset);
  });
  it("Should match order reverted with incorrect maker asset and taker asset", async function () {
    const testErc721 = await (
      await ethers.getContractFactory("TestERC721")
    ).deploy("testName", "testSymbol");

    testErc721.mint(orderMaker.address, 7, "");
    testErc721.connect(orderMaker).approve(nftProxy.address, 7);

    const testErc20 = await (
      await ethers.getContractFactory("TestERC20")
    ).deploy("waffleCoin", "waffle");

    testErc20.mint(ordertaker.address, 1000);
    testErc20.connect(ordertaker).approve(erc20Proxy.address, 10);

    const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
    const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

    await waffleExchange.registerOrder(
      orderMaker.address,
      makeAsset,
      takeAsset
    );

    const insufficientTakeAsset = asset(ERC20, encodeAbi(testErc20.address), 1);

    await expect(
      waffleExchange.matchOrder(ordertaker.address, 1, insufficientTakeAsset)
    ).to.be.revertedWith("takerAsset should match");
  });
  it("Should return proxy addresses once it's initilaized or changed", async function () {
    // TODO : proxy 정보를 불러오는 함수를 추가해야 합니다
  });
});
