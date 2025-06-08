import { Router } from "express";
import { contObjct } from "./instance.js";

const Route = Router();

Route.get('/',(req,res)=>{
    res.send("Hello World")
})

Route.post('/issue',async(req,res)=>{
    console.log(req.body);
    
    const {ID,Name,Course,Grade,Date}=req.body;

    const txtReceipt=await contObjct.issue(ID,Name,Course,Grade,Date);

    const id=txtReceipt.ID

    if(txtReceipt){
        res.status(201).json({message:'Certificate created.'});
    }
    else{
        res.status(400).json({message:'Invalid request.'});
    }
    
})

Route.get('/getcert/:id',async(req,res)=>{
    console.log(req.params.id);
    const result= await contObjct.Certificates(req.params.id);
    
    if(result){
        res.status(201).json({message:'Certificate successfully retrieved.',result});
    }
    else{
        res.status(400).json({message:'Certificate not created.'});
    }
    
})


export default Route;