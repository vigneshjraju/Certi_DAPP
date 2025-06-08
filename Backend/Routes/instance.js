import {assert, ethers, Wallet} from "ethers";
import abi from './assets/Cert.json' with {type:'json'};
import address from './assets/deployed_addresses.json' with {type:'json'};

//who is blockchain network provider,who sends the transaction, which contract

// const provider=new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Yk3UtoceWK2oHIDfd9-sh4lvunqcLWIZ");//blockchain network provider

const provider=new ethers.WebSocketProvider("wss://eth-sepolia.g.alchemy.com/v2/Yk3UtoceWK2oHIDfd9-sh4lvunqcLWIZ");

// const signer=await provider.getSigner(); //who sends the transaction
// console.log(signer);
const wallet = new Wallet('609f52fff74154088e5e5c9610e18aa4da90243cd0b62600ff6a46ecf2d296b0', provider);
// console.log(abi);
// console.log(address);

const contObjct=new ethers.Contract(address["CertModule#Cert"],abi.abi,wallet) //contract

export  {provider,contObjct}  ;
