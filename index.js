const express = require("express")
const ejs = require('ejs')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT||3003;
const Feed = require('./models/indexschema');
const path = require('path')


//mongoose connectioin
mongoose.connect("mongodb://localhost:27017/portfolio",{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error)
})


//setting template engine
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
console.log(path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname)))

app.get('/',(req,res)=>{
    res.render('index')
});

app.post('/msg',async (req,res)=>{
    try {
        const feeddata = new Feed({
            name:req.body.name,
            email:req.body.email,
            msg:req.body.msg
        });
        const savingdata = await feeddata.save()
        console.log(savingdata)
        res.send(savingdata)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
});
