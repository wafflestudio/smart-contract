const WaffleToken = artifacts.require("./WaffleToken.sol")

module.exports = function (deployer) {
    deployer.deploy(WaffleToken, ""); //FIXME: baseuri 세팅
};
