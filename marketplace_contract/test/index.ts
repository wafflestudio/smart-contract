import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { asset, encodeAbi, ERC1155, ERC721, ERC20 } from "./util/index";

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
    it("Should match order success erc1155 and erc20",async function () {
      const testErc1155 = await (
        await ethers.getContractFactory("TestERC1155")
      ).deploy("testERC1155");

      testErc1155.mint(orderMaker.address, 11, 55, []);
      testErc1155.connect(orderMaker).setApprovalForAll(nftProxy.address,true);

      const testErc20 = await (
        await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 100);

      const makeAsset = asset(ERC1155, encodeAbi(testErc1155.address, 11), 10);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 100);

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

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset1);
      await waffleExchange.matchOrder(orderTaker.address, 2, takeAsset2);
    });
    it("Should match order faile insufficient allownce", async function () {
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

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset1);

      await expect(
        waffleExchange.matchOrder(orderTaker.address, 2, takeAsset2)
      ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
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
        waffleExchange.connect(orderTaker).cancelOrder(orderMaker.address, 1)
      ).to.be.revertedWith("message sender should be maker of the order");
    });

  });

  describe("Fee test",function(){
    it("Check owner and amount of token after matchorder, fee not appect situation (take value less then fee)", async function () {
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

      expect(await testErc721.connect(orderMaker).ownerOf(7)).to.eql(orderMaker.address);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(1000);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(0);

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset);

      //10 - (10/fee) = 10 - (10/30) = 10

      const maker_taken = 10;

      expect(await testErc721.connect(orderTaker).ownerOf(7)).to.eql(orderTaker.address);
      expect(await (await testErc20.connect(orderMaker).balanceOf(orderMaker.address)).toNumber()).to.eql(maker_taken);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(1000-maker_taken);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(0);
    });

    it("Check owner and amount of token after matchorder, fee appect situation (take value greater then fee)", async function () {
      const testErc721 = await (
        await ethers.getContractFactory("TestERC721")
      ).deploy("testName", "testSymbol");

      testErc721.mint(orderMaker.address, 7, "");
      testErc721.connect(orderMaker).approve(nftProxy.address, 7);

      const testErc20 = await (
        await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 100);

      const makeAsset = asset(ERC721, encodeAbi(testErc721.address, 7), 1);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 100);

      await waffleExchange.registerOrder(
        orderMaker.address,
        makeAsset,
        takeAsset
      );

      expect(await testErc721.connect(orderMaker).ownerOf(7)).to.eql(orderMaker.address);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(1000);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(0);

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset);

      //100 - (100/fee) = 100 - (100/30) = 97

      const maker_taken = 97;

      expect(await testErc721.connect(orderTaker).ownerOf(7)).to.eql(orderTaker.address);
      expect(await (await testErc20.connect(orderMaker).balanceOf(orderMaker.address)).toNumber()).to.eql(maker_taken);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(900);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(100-maker_taken);
    });
    it("Check owner and amount of token after matchorder, erc1155",async function () {
      const testErc1155 = await (
        await ethers.getContractFactory("TestERC1155")
      ).deploy("testERC1155");

      testErc1155.mint(orderMaker.address, 11, 55, []);
      testErc1155.connect(orderMaker).setApprovalForAll(nftProxy.address,true);

      const testErc20 = await (
        await ethers.getContractFactory("TestERC20")
      ).deploy("waffleCoin", "waffle");

      testErc20.mint(orderTaker.address, 1000);
      testErc20.connect(orderTaker).approve(erc20Proxy.address, 100);

      const makeAsset = asset(ERC1155, encodeAbi(testErc1155.address, 11), 10);
      const takeAsset = asset(ERC20, encodeAbi(testErc20.address), 100);

      await waffleExchange.registerOrder(
        orderMaker.address,
        makeAsset,
        takeAsset
      );

      expect(await (await testErc1155.connect(orderMaker).balanceOf(orderMaker.address,11)).toNumber()).to.eql(55);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(1000);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(0);

      await waffleExchange.matchOrder(orderTaker.address, 1, takeAsset);

      //100 - (100/fee) = 100 - (100/30) = 97

      const taker_taken = 10;
      const maker_taken = 97;

      expect(await (await testErc1155.connect(orderTaker).balanceOf(orderTaker.address,11)).toNumber()).to.eql(taker_taken);
      expect(await (await testErc1155.connect(orderMaker).balanceOf(orderMaker.address,11)).toNumber()).to.eql(55-taker_taken);
      expect(await (await testErc20.connect(orderMaker).balanceOf(orderMaker.address)).toNumber()).to.eql(maker_taken);
      expect(await (await testErc20.connect(orderTaker).balanceOf(orderTaker.address)).toNumber()).to.eql(900);
      expect(await (await testErc20.connect(orderTaker).balanceOf(exchangeAdmin.address)).toNumber()).to.eql(100-maker_taken);
    });
  });

  describe("WaffleExchangeProxy test",function() {
    it("Should return proxy addresses once it's initilaized or changed", async function () {
      // TODO : proxy 정보를 불러오는 함수를 추가해야 합니다
      
      
    });
  });

});
