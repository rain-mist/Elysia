import React,{useEffect,useState} from "react";
import {Contract, ethers} from 'ethers';

import { contractABI,contractAddress } from "../utils/constants";
// import { decryptCrowdsaleJson } from "ethers/src.ts/wallet";

export const AuthenticationContext = React.createContext();

const {ethereum} = window;

// 获取区块链合约
const getEthereumContract =async () => {
    if (ethereum) {
    // 调用并传入以太坊窗口对象,获取提供者ethers.providers.Web3Provider(window.ethereum)BrowserProvider
    const provider = new ethers.providers.Web3Provider(ethereum);
    // 获取签名者
    const signer = provider.getSigner();
    // const contracABI = JSON.parse(contractABI).abi;
    // 合约
    const authenticationContract = new ethers.Contract(contractAddress,contractABI,signer);
    // const singerContract = await authenticationContract.connect(signer);
    // console.log(contractABI[4]);
    // console.log(authenticationContract);
    return authenticationContract;
    // console.log({
    //     provider,
    //     signer,
    //     AuthenticationContract
    // })
      } else {
        console.log("以太坊对象不存在");
      }

}

export const AuthenticationProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    // 定义注册表单数据
    const [registerdata,setRegisterdata] = useState({re_username:'',re_password:''});
    // 定义登录表单数据
    const [logindata,setLogindata] = useState({lo_username:'',lo_password:''});
    // // 定义注册事件
    // const [hasRegistered,setHasRegistered] = useState(false);
    // 定义事务
    // const [registered,setRegistered] = useState(localStorage.getItem('registered'));

    const handleChange = (e, name) => {
        setLogindata((prevState) => ({ ...prevState, [name]: e.target.value }));
        setRegisterdata((prevState) => ({ ...prevState, [name]: e.target.value }));
      };
    // 检查钱包是否连接
    const checkIfWalletIsConnect =async() =>{
        if (!ethereum) return alert("请安装metamask");
        const accounts = await ethereum.request({method:'eth_accounts'});

        if(accounts.length){
            setCurrentAccount(accounts[0]);
            // 获取所有事务 getAllTransactions();
            
        }else{
            console.log("没有找到账户")
        }
        console.log(accounts);
    }
    // 连接钱包
    const connectWallet = async() => {
        try {
            if (!ethereum) return alert("请安装metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            // 默认第一个账户
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("没有以太坊这个对象")
        }
    }
    // 发送注册请求
    const sendRegister = async() => {
        try {
            if (!ethereum) return alert("请安装metamask");
            // 从表单中获取数据
            const {re_username,re_password} = registerdata;
            // getEthereumContract();
            // const authenticationContract = getEthereumContract();
            // const test = await authenticationContract.register(re_username,re_password);
            // console.log(authenticationContract);
            if (ethereum) {
                // 调用并传入以太坊窗口对象,获取提供者ethers.providers.Web3Provider(window.ethereum)BrowserProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                // 获取签名者
                const signer = provider.getSigner();
                // const contracABI = JSON.parse(contractABI).abi;
                // 合约
                const authenticationContract = new ethers.Contract(contractAddress,contractABI,signer);
                // const singerContract = await authenticationContract.connect(signer);
                const register = await authenticationContract.register(re_username,re_password);
                // console.log(register);
                await register.wait()
                console.log("注册成功");
                // console.log(register);
            }
            // })
        } catch (error) {
            console.log(error)
        }
    }
    // 发送登录请求
    const sendLogin = async() => {
        try {
            if (!ethereum) return alert("请安装metamask");
            // 从表单中获取数据
            const {lo_username,lo_password} = logindata;
            if (ethereum) {
                // 调用并传入以太坊窗口对象,获取提供者ethers.providers.Web3Provider(window.ethereum)BrowserProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                // 获取签名者
                const signer = provider.getSigner();
                // // const contracABI = JSON.parse(contractABI).abi;
                // 合约
                const authenticationContract = new ethers.Contract(contractAddress,contractABI,signer);
                // // const singerContract = await authenticationContract.connect(signer);
                const login = await authenticationContract.login(lo_username,lo_password);
                // console.log(login);
                await login.wait();
                console.log("登录成功");
            }
            // })
        } catch (error) {
            console.log(error)
        }
    }    

    useEffect(()=>{
        checkIfWalletIsConnect();
    },[])

    return(
        <AuthenticationContext.Provider value={{connectWallet,currentAccount,registerdata,logindata,setLogindata,handleChange,sendRegister,sendLogin}}>
            {children}
        </AuthenticationContext.Provider>
    )
}
