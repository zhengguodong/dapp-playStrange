import Web3 from "web3"
import {message } from 'antd';
import MonsterGame from "../contracts/MonsterGame.json"
export const connectWallet=()=>{
    if(window.ethereum){
        var web3 = new Web3(Web3.givenProvider|| "ws://localhost:7545");
        window.ethereum.enable();
        return web3;
      }else{
        message.error("连接失败！")
      }
}
export const getContract=async()=>{
    let web3=connectWallet()
    let {abi} =MonsterGame;
    const networkID = await web3.eth.net.getId();
    let address = MonsterGame.networks[networkID].address;
    let contract=new web3.eth.Contract(abi,address)
    return contract;
}