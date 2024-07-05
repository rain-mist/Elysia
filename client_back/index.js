// var localhost = "http://127.0.0.1:7545"
// var Web3 = require("web3")
// var web3 = new Web3(new Web3.providers.HttpProvider(localhost))
// web3.eth.getAccounts(function (error, result) {
//     console.log("账户列表地址：");
//     console.log(result);
// });
const Web3 = require('web3');
 
window.addEventListener('load', async () => {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
 
  const contractAddress = '0x...'; // 这里填写部署后的智能合约地址
  const abi = [
    {
      constant: false,
      inputs: [{ name: 'value', type: 'uint256' }],
      name: 'setValue',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getValue',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ];
 
  const simpleStorage = new web3.eth.Contract(abi, contractAddress);
 
  const setForm = document.getElementById('setForm');
  setForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = document.getElementById('value').value;
    await simpleStorage.methods.setValue(value).send({ from: web3.eth.defaultAccount });
    alert('Value set successfully!');
  });
 
  const getValueElement = document.getElementById('getValue');
  setInterval(async () => {
    const value = await simpleStorage.methods.getValue().call();
    getValueElement.textContent = `Current value: ${value}`;
  }, 1000);
});