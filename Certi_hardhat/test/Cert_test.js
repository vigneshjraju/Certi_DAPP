const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {expect}=require('chai');
const { ethers } = require("hardhat");

describe('CertModule',()=>{

    //contract deployement fn
    async function deployContract(){

        const [admin,other] =await ethers.getSigners(); // required A/C for the contract to sign
        const Cert= await ethers.getContractFactory('Cert'); // create an instance 
        const cert=await Cert.deploy(); //deploy the created instance

        return{admin,other,cert}

    }

    //check whether admin is deployed the contract
    //it is fn for testing whether admin is deployed
    it('contract deployed by admin', async()=>{

        const {admin,other,cert}=await loadFixture(deployContract);
        console.log(admin.address,cert);
        expect(cert.deploymentTransaction().from).to.equals(admin.address) //expect is used as assersion
    
    })

    it('can read certificate'),async()=>{
        const {admin,other,cert}=await loadFixture(deployContract);
        await cert.issue(123,'Vignesh','Blockchain','7.08','12th May');
        const certificate = await cert.certificate(123);
        console.log(certificate);

        //check the details are correct
        expect(certificate[0]).to.equals('Vignesh');
        expect(certificate[1]).to.equals('Cybersecurity');
        
    }

    it('only admin can issue'),async()=>{
        const {admin,other,cert}=await loadFixture(deployContract);
        expect (await cert.connect(other).issue(123,'Vignesh','Blockchain','7.08','12th May')).to.be.revertedWith('unauthorized Access.');
        
    }

})