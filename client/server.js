
const express = require('express');
const app = express();
app.use(express.static('./dist/skyid'));
app.get("*",(req,res)=>{
    res.send("index.html",{root:"./dist/skyid"});
});
app.listen(process.env.PORT || 8080);