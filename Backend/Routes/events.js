import chalk from "chalk";
import {contObjct} from "./instance.js"

(()=>{
    console.log(chalk.magenta("Listening for Issue Events..."));
    contObjct.on("Issued",(course, id, grade, event)=>{
        console.log(chalk.bgGreen("**** Event Occured ****"));
        console.log("course:", course);
        console.log("id:", id);
        console.log("grade:",grade);
        console.log("event:", event);
        console.log(chalk.bgGreen("****************"));   

    });
    
})();
