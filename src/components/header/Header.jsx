import React ,{useEffect}from 'react'
import "./index.css"
import { RedditOutlined } from '@ant-design/icons';
import { Button} from 'antd';
import {connectWallet} from "../../utils/concentWallet"
function Header() {
  let conect=()=>{
    let web3=connectWallet();
    console.log("web3",web3);
  }
  return (
    <div className='header'>
      <div style={{"lineHeight":"70px","float":"right","marginRight":"20px","fontWeight":"600"}}>
          连接钱包<Button shape="circle" icon={<RedditOutlined />} type="primary" danger onClick={conect}></Button>
      </div>
    </div>
  )
}

export default Header