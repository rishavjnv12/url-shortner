const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()
const PORT = process.env.PORT || 3000

console.log('Hello World')
mongoose.connect('mongodb+srv://rishavjnv12:F13JqNRNT2h5xvNj@ecom.oi6ak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')


const Url = require('./models/url')


app.get('/', async (req, res) => {
    const shortUrls = await Url.find()
    console.log(shortUrls)
    res.render('index', { shortUrls: shortUrls })
})
  

app.post('/',(req,res)=>{
    console.log(req.hostname)
    const url = req.body.url

    const newUrl = new Url({url})
    Url.find({short:newUrl.short},async (err,result)=>{
        if(result.length === 1){
            return await res.status(400).json({
                error:"Already exists"
            })
        }else{
            return await newUrl.save(async (error,result) =>{
                // return await res.status(201).json({error,result,newUrl:'https://url-shortner-00.herokuapp.com/'+newUrl.short})
                return await res.status(201).redirect('/')
            })
        }
    })
})


app.get('/:short',(req,res) =>{
    const short = req.params.short
    Url.find({short},async (err,result) => {
        if(result.length === 1){
            const url = result[0].url
            return await res.redirect(url)
        }else{
            return await res.status(404).send('Not Found')
        }
    })
})



app.listen(PORT)