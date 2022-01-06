import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");

    const Multicall = await ethers.getContractFactory("Multicall2");
    const multicall = await Multicall.deploy();
    await multicall.deployed();

    const greetCall = greeter.interface.encodeFunctionData("setGreeting", [
      "some other greeting",
    ]);

    const aggrTx = await multicall.aggregate([
      { target: greeter.address, callData: greetCall },
    ]);
    await aggrTx.wait();

    expect(await greeter.greet()).to.equal("some other greeting");
  });
});
