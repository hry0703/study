let express = require('express')
let axios = require('axios')

let app = express()

async function getData(params){
    let url = '//baidu.com'
    let res = await axios.get(url)
}

app.get('/',(req,res)=>{
    console.log('-----------------------')
    console.log('express开始', req)
    res.send('ok')
})
app.listen(3000)