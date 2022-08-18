import React,{useEffect, useState} from 'react'
import "./index.css"
import { PlayCircleOutlined } from '@ant-design/icons';
import { Button,message,Input} from 'antd';
import {getContract} from "../../utils/concentWallet"
function MainBox() {
  const [owner,setOwner]=useState(null)
  const [contract,setContract]=useState(null)
  const [babyName,setBabyName]=useState("")
  const [list,setList]=useState([])
  const [attack,setAttack]=useState(null)
  const [defend,setdefend]=useState(null)
  useEffect(()=>{
    getOwner()
  },[])
  let getOwner=async()=>{
    let contract=await getContract();
    setContract(contract)
    let owner=await contract.methods.gameOwner().call()
    setOwner(owner);
  }
  let concetContract=async()=>{
    let list=await contract.methods.getMonsters().call()
    setList(list)
  }
  let makeNew=async()=>{
    if(babyName!=''){
      let newBaby=await contract.methods.createNewMonster(babyName,owner).send({from:"0x4eaB9883825633bb41073Cad0364557084FEC0dc"});
      message.success("制造成功！")
      setBabyName('')
      concetContract()
    }else{
      message.error("error")
    }
  }
  let attackGame=async()=>{
      if(attack!=''&&defend!=''){
        let res=await contract.methods.battle(attack,defend).send({from:"0x4eaB9883825633bb41073Cad0364557084FEC0dc"})
        message.success("战！！")
        setAttack('')
        setdefend('')
        concetContract()
      }else{
        message.error("参战双方请准备")
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
          <div className='box'>
            {
              list.map((x,index)=>{
                return(
                  <div className='item' key={index}>
                    <h3>编号: {index} </h3>
                    <h4>名称： {x.name}</h4>
                    <h4>等级： {x.level}</h4>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div style={{"width":"30%"}}>
        PK场
        <div>
          攻击方：<Input value={attack} onChange={(e)=>{setAttack(e.target.value)}} style={{"width":"150px","margin":"10px 0 "}} placeholder="请输入攻击方编号"/>
          <br></br>
          被攻方：<Input value={defend} onChange={(e)=>{setdefend(e.target.value)}} style={{"width":"150px","margin":"10px 0 "}} placeholder="请输入被攻方编号"/>
          <br></br>
          <Button type="primary" onClick={attackGame}>开战</Button>
        </div>
      </div>
    </div>
  )
}

export default MainBox