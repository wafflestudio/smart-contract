const WFTKContract = artifacts.require("WaffleToken");
 
contract('WFTKContract', (accounts) => {
  it("should return the list of accounts", async ()=> {
    console.log(accounts);
  });
});