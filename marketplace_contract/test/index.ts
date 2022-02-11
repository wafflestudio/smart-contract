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
  let orderTaker: SignerWithAddress;

  let fee: number;

  beforeEach(async () => {
    [exchangeAdmin, orderMaker, orderTaker] = await ethers.getSigners();

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

  describe("WaffleExchange function test",function(){
    it("Should return exchange fee denominator once it's deployed", async function () {
      const exchangeFee = await waffleExchange.getExchangeFee();
      expect(fee).to.equal(exchangeFee);
    });
    it("Should return registered order with maker asset & taker asset", async function () {
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

      const registeredOrderMakeAsset = {
        assetType: {
          assetClass: registeredOrder.makeAsset.assetType.assetClass,
          data: registeredOrder.makeAsset.assetType.data,
        },
        value: registeredOrder.makeAsset.value.toNumber(),
      };
  
      const registeredOrderTakeAsset = {
        assetType: {
          assetClass: registeredOrder.takeAsset.assetType.assetClass,
          data: registeredOrder.takeAsset.assetType.data,
        },
        value: registeredOrder.takeAsset.value.toNumber(),
      };
  
      expect(makeAsset).to.eql(registeredOrderMakeAsset);
      expect(takeAsset).to.eql(registeredOrderTakeAsset);
  
      const orders = await waffleExchange.getOrders();
  
      expect(orders.length).to.gt(0);
  
      const lastInOrderListMakeAsset = {
        assetType: {
          assetClass: orders[orders.length - 1].makeAsset.assetType.assetClass,
          data: orders[orders.length - 1].makeAsset.assetType.data,
        },
        value: orders[orders.length - 1].makeAsset.value.toNumber(),
      };
  
      const lastInOrderListTakeAsset = {
        assetType: {
          assetClass: orders[orders.length - 1].takeAsset.assetType.assetClass,
          data: orders[orders.length - 1].takeAsset.assetType.data,
        },
        value: orders[orders.length - 1].takeAsset.value.toNumber(),
      };
  
      expect(makeAsset).to.eql(lastInOrderListMakeAsset);
      expect(takeAsset).to.eql(lastInOrderListTakeAsset);
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

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset,
          takeAsset
      );

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset);
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

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset,
          takeAsset
      );

      const insufficientTakeAsset = asset(ERC20, encodeAbi(testErc20.address), 1);

      await expect(
          waffleExchange.matchOrder(orderTaker.address, 1, insufficientTakeAsset)
      ).to.be.revertedWith("takeAsset should match");
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

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

      await waffleExchange.registerOrder(
        orderMaker.address,
        makeAsset,
        takeAsset
      );

      const insufficientTakeAsset = asset(ERC20, encodeAbi(testErc20.address), 1);

      await expect(
        waffleExchange.matchOrder(orderTaker.address, 1, insufficientTakeAsset)
      ).to.be.revertedWith("takerAsset should match");
    });
    it("Should match order several orders", async function () {
      const testErc721 = await (
          await ethers.getContractFactory("TestERC721")
      ).deploy("testName", "testSymbol");

      testErc721.mint(orderMaker.address, 7, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 7);

      testErc721.mint(orderMaker.address, 8, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 8);

      const testErc20 = await (
          await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset1 = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset1 = asset(ERC20, encodeAbi(testErc20.address), 5);

      const makeAsset2 = asset(ERC721, encodeAbi(testErc721.address, 8), 1);
      const takeAsset2 = asset(ERC20, encodeAbi(testErc20.address), 5);

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset1,
          takeAsset1
      );

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset2,
          takeAsset2
      );

      waffleExchange.matchOrder(orderTaker.address, 1, takeAsset1);
      waffleExchange.matchOrder(orderTaker.address, 2, takeAsset2);
    });
    it("Should match order fail insufficient allowance", async function () {
      const testErc721 = await (
        await ethers.getContractFactory("TestERC721")
      ).deploy("testName", "testSymbol");

      testErc721.mint(orderMaker.address, 7, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 7);

      testErc721.mint(orderMaker.address, 8, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 8);

      const testErc20 = await (
        await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset1 = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset1 = asset(ERC20, encodeAbi(testErc20.address), 5);

      const makeAsset2 = asset(ERC721, encodeAbi(testErc721.address, 8), 1);
      const takeAsset2 = asset(ERC20, encodeAbi(testErc20.address), 6);

      await waffleExchange.registerOrder(
        orderMaker.address,
        makeAsset1,
        takeAsset1
      );

      await waffleExchange.registerOrder(
        orderMaker.address,
        makeAsset2,
        takeAsset2
      );

      waffleExchange.matchOrder(orderTaker.address, 1, takeAsset1);

      waffleExchange.matchOrder(orderTaker.address, 2, takeAsset2);
    });
    it("Should cancle order success with correct maker asset and taker asset", async function(){
      const testErc721 = await (
          await ethers.getContractFactory("TestERC721")
      ).deploy("testName", "testSymbol");

      testErc721.mint(orderMaker.address, 7, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 7);

      const testErc20 = await (
          await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset,
          takeAsset
      );

      await waffleExchange.connect(orderMaker).cancelOrder(orderMaker.address, 1);
    });
    it("Should cancel order fail with incorrect sender", async function(){
      const testErc721 = await (
          await ethers.getContractFactory("TestERC721")
      ).deploy("testName", "testSymbol");

      testErc721.mint(orderMaker.address, 7, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 7);

      const testErc20 = await (
          await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 10);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 10);

      await waffleExchange.registerOrder(
          orderMaker.address,
          makeAsset,
          takeAsset
      );

      await expect(
          await waffleExchange.connect(orderTaker).cancelOrder(orderMaker.address, 1)
      ).to.be.revertedWith("message sender should be maker of the order");
    });

  });

  describe("WaffleExchangeProxy test",function() {
    it("Should return proxy addresses once it's initilaized or changed", async function () {
      // TODO : proxy 정보를 불러오는 함수를 추가해야 합니다


    });
  });

});
