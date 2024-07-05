// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
 
contract Authentication {
    uint256 numUsers; // 系统用户数量
    struct User{
        string username; // 用户账号
        bytes32 password; // 用户密码
        bool isRegistered; // 用户注册状态
        bool isLogin; // 用户登录状态
    }
    // 地址到用户信息的映射
    mapping(address => User) public  addressToUser; 

    event Register(address _add);// 声明注册事件
    event Login(address _add);// 声明登录事件

    constructor(){
        // 构造函数
        numUsers = 0;
    }
    // msg.sender是当前钱包的发起方 msg是全局的，msg.sender是全局变量
    // 注册函数
    function register(string memory _username, string memory _password) public{
        // 判断用户注册状态
        require(!addressToUser[msg.sender].isRegistered); 
        // 加入到映射中
        addressToUser[msg.sender] = User(_username, sha256(abi.encodePacked(_password)), true, false); 
        numUsers = numUsers + 1;
        // 更新用户注册状态
        addressToUser[msg.sender].isRegistered = true;
        // 调用注册事件
        emit Register(msg.sender);
    }

    //登陆函数
    function login(string memory _username, string memory _password) public{
        //判断用户注册状态       
        require(addressToUser[msg.sender].isRegistered); 
        //判断用户名和密码
        require(keccak256(abi.encodePacked(addressToUser[msg.sender].username)) == keccak256(abi.encodePacked(_username)) && addressToUser[msg.sender].password == sha256(abi.encodePacked(_password)));
        // 更新用户登录状态
        addressToUser[msg.sender].isLogin = true;
        // 调用登录事件
        emit Login(msg.sender);
    }
}