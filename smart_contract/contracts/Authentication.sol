// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Authentication {
    uint256 numUsers; // 系统用户数量
    struct User{
        string username; // 用户账号
        bytes32 password; // 用户密码
        bool hasRegistered; // 用户注册状态
        bool hasLogin; // 用户登录状态
    }
    // 地址到用户信息的映射
    mapping(address => User) private addressToUser; 

    event Register(address _add);// 声明注册事件
    event Login(address _add);// 声明登录事件
    event Modify(address _add);// 声明修改密码事件
    event Logout(address _add);// 声明注销事件
    event Look(address _add);// 声明查看事件

    constructor(){
        // 构造函数
        numUsers = 0;
    }
    // msg.sender是当前钱包的发起方 msg是全局的，msg.sender是全局变量
    // 注册函数
    function register(string memory _username, string memory _password) public{
        // 判断用户注册状态
        require(!addressToUser[msg.sender].hasRegistered); 
        // 加入到映射中
        addressToUser[msg.sender] = User(_username, sha256(abi.encodePacked(_password)), true, false); 
        numUsers = numUsers + 1;
        // 更新用户注册状态
        addressToUser[msg.sender].hasRegistered = true;
        // 调用注册事件
        emit Register(msg.sender);
    }

    //登陆函数
    function login(string memory _username, string memory _password) public{
        //判断用户注册状态       
        require(addressToUser[msg.sender].hasRegistered); 
        //判断用户名和密码
        require(keccak256(abi.encodePacked(addressToUser[msg.sender].username)) == keccak256(abi.encodePacked(_username)) && addressToUser[msg.sender].password == sha256(abi.encodePacked(_password)));
        // 更新用户登录状态
        addressToUser[msg.sender].hasLogin = true;
        // 调用登录事件
        emit Login(msg.sender);
    }

    // 密码修改函数
    function modify(string memory _newusername, string memory _newPassword) public{
        //判断用户登录状态 
        require(addressToUser[msg.sender].hasLogin); 
        addressToUser[msg.sender].username = _newusername;
        addressToUser[msg.sender].password = sha256(abi.encodePacked(_newPassword));
        // 调用密码修改事件
        emit Modify(msg.sender);
    }

    //登出函数
    function logout() public{
        //判断用户注册和登录状态 
        require(addressToUser[msg.sender].hasLogin && addressToUser[msg.sender].hasRegistered);
        // 修改登录状态
        addressToUser[msg.sender].hasLogin = false;
        // delete addressToUser[msg.sender];
        numUsers = numUsers - 1;
        // 调用登出事件
        emit Logout(msg.sender);
    }

    function look() public returns(uint256 num){
        //判断用户注册和登录状态 
        // require(addressToUser[msg.sender].hasLogin && addressToUser[msg.sender].hasRegistered);
        // // 修改登录状态
        // addressToUser[msg.sender].hasLogin = false;
        // delete addressToUser[msg.sender];
        // numUsers = numUsers - 1;
        // 调用查看事件
        emit Look(msg.sender);
        return numUsers;
    }
    // uint256 flag; //执行结果标记
    // function setValue(uint256 value) public {
    //     _value = value;
    // }
 
    // function getValue() public view returns (uint256) {
    //     return _value;
    // }
    // mapping (string => uint256) public nametoage;
    // struct Peo{
    //     uint256 age;
    //     string name;
    // }

    // Peo[] public people;
    // function addpeople(uint256 _age, string memory _name) public {
    //     // name = _name;
    //     people.push(Peo(_age, _name));
    //     nametoage[_name]=_age;
    // }
}