import express from 'express';
import Route from './Routes/userRoute.js';
import dotenv from "dotenv";
import {provider} from './Routes/instance.js';
import { json } from 'express';

const app=express();
dotenv.config();

app.use(json());
app.use('/',Route);




app.listen(process.env.PORT,() => {
      console.log(`Server listening on port ${process.env.PORT}`);
});