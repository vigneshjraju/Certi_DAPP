import {BrowserProvider,Contract} from "ethers";
import { useState } from "react";
import abi from './assets/Cert.json';
import address from './assets/deployed_addresses.json'

function App() {

  const [txtDetails,setTxDetails]=useState({
    ID:0,
    Name:"",
    Course:"",
    Grade:"",
    Date:""
  })

  const [output,setOutput]=useState();

  const provider=new BrowserProvider(window.ethereum);

  async function handleWallet(){
    const signer = await provider.getSigner();
    alert(`${signer.address} connected successfully.`)
  }

  function handleChange(e){
      const {name,value}=e.target;
      console.log(name,value);
      setTxDetails((prevState)=>({...prevState,[name]:value}))
      
  }

  async function handleSubmit(e){
    e.preventDefault();
    console.log(txtDetails);

    const signer = await provider.getSigner();
    const contObj = new Contract(address['CertModule#Cert'],abi.abi,signer);
    const txReciept= await contObj.issue(txtDetails.ID,txtDetails.Name,txtDetails.Course,txtDetails.Grade,txtDetails.Date)

    if(txReciept){

      console.log(txReciept);
      alert(`${txReciept.hash} Created Successfully.`);
    }

    else{
      alert(`Check Details.`);
    }

  }

  async function handleClick(){
    
    const ID= document.getElementById("ID").value;
    console.log(ID);
    
    const signer = await provider.getSigner();
    const contObj = new Contract(address['CertModule#Cert'],abi.abi,signer);
    const result= await contObj.Certificates(ID);
    // const res=await result.json();

    console.log(result);

    const out=`Name:${result[0]},Course:${result[1]},Grade:${result[2]},Date:${result[3]}`
    setOutput(out);

    
  }

  return (
    <>
     <div>
          <div>
            <input type="button" value="Connect to Metamask" onClick={handleWallet}/>
          </div>

          <br />

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                      <label>ID:</label>
                      <input type="text" onChange={handleChange} name="ID" />
                    </div>

                    <div>
                      <label>Name: </label>
                      <input type="text" name="Name" onChange={handleChange}/>
                    </div>

                    <div>
                      <label>Course: </label>
                      <input type="text"  name="Course" onChange={handleChange}/>
                    </div>

                    <div>
                      <label>Grade: </label>
                      <input type="text"  name="Grade" onChange={handleChange}/>
                    </div>

                    <div>
                      <label>Date: </label>
                      <input type="date" name="Date" onChange={handleChange}/>
                    </div>

                    <br />

                    <div>
                      <input type="submit" value="Submit" />
                    </div>

                </form>

                <br />
                <br />

                <div>
                  <input type="text" id="ID"/>
                  <input type="button" value="Get Certificate" onClick={handleClick}/>
                </div>              

            </div>

            <div>
              <p>{output}</p>
            </div>

     </div>
    </>
  )
}

export default App
