const Promise = require('./myPromise')

let promise  = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('第一个error')
        resolve('ok')
    }, 1000);
})

promise.then(value=>{
    console.log(value,'success')
    // return new Promise((r,e)=>{e('e')})
},reason=>{
    console.log(reason,'fail')
})
// .then(value => {
//     console.log(value, 'success2')
// }, reason => {
//     console.log(reason, 'fail2')
// })