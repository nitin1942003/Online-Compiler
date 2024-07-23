const express = require('express');
const { generateFile } = require("./generateFile.js")
const {executeCpp} = require("./executeCpp.js")
const app = express();
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send("Welcome everyone to Online Compiler!");

});

app.post("/run",async (req, res)=>{
    const{language = 'cpp', code} = req.body;
    if(code===undefined){
        return res.status(500).json({"success":false, message: "enpty code found!"})
    }
    try {
        const filePath= await generateFile(language, code);
        const output = await executeCpp(filePath); 
        res.json({filePath, output});
    } catch (error) {
        res.status(500).json({error: error});
    }
    
})

app.listen(5000, ()=>{
    console.log("Server is listening at port 5000!");

});
