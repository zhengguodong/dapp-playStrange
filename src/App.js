import './App.css';
import {useState,useEffect} from "react"
import Web3 from "web3"
import MonsterGame from "./contracts/MonsterGame.json"
function App() {
  const [contract,setContract]=useState(null);
  const [dataList,setDataList]=useState([])
  const [owner,setOwner]=useState(null)
  const [web3,setWeb3]=useState(null)
  useEffect(()=>{
    let getContract=async ()=>{
      if(window.ethereum){
            var web3 = new Web3(Web3.givenProvider|| "ws://localhost:7545");
            console.log('web3',web3);
            setWeb3(web3)
            let {abi} =MonsterGame;
            const networkID = await web3.eth.net.getId();
            await window.ethereum.enable();
            let address = MonsterGame.networks[networkID].address;
            console.log('ddds',address);
            
            let contract=new web3.eth.Contract(abi,address)
            setContract(contract);
          }else{
            alert("error")
          }
    }
    getContract();
  },[])
  let getOwner=async()=>{
    let owner=await contract.methods.gameOwner().call();
    // 0x4eaB9883825633bb41073Cad0364557084FEC0dc 
    let accounts=await web3.eth.getAccounts()
    console.log('ssddd',accounts);
    contract.defalutAccount="0x4eaB9883825633bb41073Cad0364557084FEC0dc"
    let account=await contract.options
    console.log('adress',account);
    console.log('saaa',contract.methods.gameOwner().encodeABI());
    let events=await contract.events.allEvents()
    console.log('event',events);
    console.log('create',web3.eth.accounts.create());
    console.log('wallet',web3.eth.accounts.wallet);
    
    console.log('ss',owner,web3.eth.getAccounts());
    setOwner(owner)
    
  }
  let getDataList=async ()=>{
    let monsters=await contract.methods.monsters;
    console.log('owner',monsters);
    getOwner()
  } 
  let createMonster=async ()=>{
  
    let data=await contract.methods.createNewMonster("zgd","0x4eaB9883825633bb41073Cad0364557084FEC0dc").call();
    console.log('data',data);
    
  }
  return (
    <div className="App">
          home
          <button onClick={getDataList}> get</button>
          <button onClick={createMonster}>create</button>
    </div>
  );
}

export default App;
