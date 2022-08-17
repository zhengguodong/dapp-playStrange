import React,{useEffect, useState} from 'react'
import "./index.css"
import { PlayCircleOutlined } from '@ant-design/icons';
import { Button,message,Input} from 'antd';
import {getContract} from "../../utils/concentWallet"
function MainBox() {
  const [owner,setOwner]=useState(null)
  const [contract,setContract]=useState(null)
  const [babyName,setBabyName]=useState("")
  useEffect(()=>{
    getOwner();
  },[])
  let getOwner=async()=>{
    let contract=await getContract();
    setContract(contract)
    let owner=await contract.methods.gameOwner().call()
    setOwner(owner);
  }
  let concetContract=async()=>{
    message.success("连接成功！")
    let list=await contract.methods.getMonsters().call()
    console.log("list",list);
  }
  let makeNew=async()=>{
    if(babyName!=''){
      console.log(babyName);
      let newBaby=await contract.methods.createNewMonster(babyName,owner).send({from:"0x4eaB9883825633bb41073Cad0364557084FEC0dc"});
      console.log("bbbb",newBaby);
      message.success("制造成功！")
      setBabyName('')
    }else{
      message.error("error")
    }
    
  }
  return (
    <div className='mainBox'>
      <div style={{"width":"30%"}}>
        制造工厂<br/>
        （所有者：{owner}）<br/>
        <Input placeholder="名字" value={babyName} onChange={(e)=>{setBabyName(e.target.value)}}/>
        <Button type="primary" onClick={makeNew}>制造</Button>
      </div>
      <div style={{"backgroundColor":"rgb(241, 243, 244)","width":"40%"}}>
        <div style={{"marginTop":"10px","fontWeight":"500"}}>
          开始<Button type="primary" shape="circle" icon={<PlayCircleOutlined />} onClick={concetContract}/>
        </div>
      </div>
      <div style={{"width":"30%"}}></div>
    </div>
  )
}

export default MainBox