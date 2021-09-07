const Promise = require('./myPromise')

let promise  = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('第一个error')
        resolve('ok')
    }, 1000);
})
// // 
let promise2 = promise.then(value=>{
    console.log(value,'success')
    // return new Promise((r,e)=>{e('e')})
},reason=>{
    console.log(reason,'fail')
    return new Promise((resolve,reject)=>{
        reject('新promise')
    })
})
promise2.then().then().then(value => {
    console.log(value, 'success2')
}, reason => {
    console.log(reason, 'fail2')
})

promise2.then().then().then(value => {
    console.log(value, 'success2')
}).catch(err => {
    console.log(err, 'err');
})

Promise.resolve(321312312).then(data=>{
    console.log('Promise.resolve',data)
})


Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('延时')
    }, 2000);
})).then(data=>{
    console.log(data)
})

Promise.reject('错误').catch(err => {
    console.log('Promise.reject', err)
})


const fs = require('fs').promises


// Promise.all 表示全部成功才成功， 如果一个失败了 则失败
Promise.all([fs.readFile(__dirname + '/5.class.js', 'utf8'), fs.readFile(__dirname + '/4.reduce.js', 'utf8'), 11]).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err)
})

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(x=>console.log(x))