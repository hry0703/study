const PENDING = 'PENGDING'; // 默认等待状态
const FULLFILLED = 'FULLFILLED'; // 成功态
const REJECTED = 'REJECTED' // 失败态

// 考虑 x 可能是外部的promise
function resolvePromise(x, promise2, resolve, reject){
    // promiseA+ 规范 ：If promise and x refer to the same object, reject promise with a TypeError as the reason
    if (x === promise2){
        return new TypeError('循环引用')
    }
    // 1. 如果x 是一个普通值 则直接调用resolve即可
    // 2. 如果x 是一个promise那么应该采用这个promise的状态 决定调用的是 resolve还是reject
    if(((typeof x === 'object' && x !== null)) || (typeof x == 'function')){
        // 是对象或者函数才有可能是个promise
        let called = false;
        try {
            // 取then方法 并且用try捕捉可能出现的错误 防止别人的promise中设置了取值的限制
            // 比如：Object.defineProperty(x,'then',{
            //     get(){
            //         if(times ==2){
            //             throw new Error()
            //         }
            //     }
            // })
            let then = x.then 
            if (typeof then == 'function'){
                // 用call不用x.then是为了少取一次then少触发get方法
                then.call(x,y=>{ // y也可能是个prmosie 要递归处理
                    if (called) return;
                    called = true
                    // 不停的解析成功的promise中返回的成功值，直到这个值是一个普通值
                    resolvePromise(y, promise2, resolve, reject);
                },r=>{
                    if (called) return;
                    called = true
                    reject(r);
                })
            }
        }catch(e){
            if (called) return;
            called = true
            reject(e); // 让promise2 变成失败态
        }
    }else {
         // x 是一个普通值 
        resolve(x)
    }
}
class Promise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined; // 成功时的值
        this.reason = undefined;  // 失败时的值
        // 存在异步逻辑时先存放回调函数 ，异步完成时在resolve/reject再遍历其中的回调依次执行
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        // 调用resolve和reject可以将对应的结果暴露在当前的promise实例上

        // 为什么resolve，reject不写在原型上 因为  每个promise有自己的resolve，reject
        const resolve = (value)=>{ 
            // 只有状态在PENDING时才能修改状态 保证只能调用一次resolve/reject,状态修改不可逆，
            if(value instanceof Promise){
                return value.then(resolve,reject)
            }
            if (this.status === PENDING){
                this.value = value;
                this.status = FULLFILLED;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            // 默认new Promise中的函数会立即执行
            executor(resolve, reject)
        }catch(e){
            // throw new Error或者执行出错时，需要将错误传递到reject中，执行失败的逻辑
            reject(e)
        }
       
    }
    
    // 在then方法(成功和失败)中 返回一个promise， promose会采用返回的promise的成功的值或失败原因, 传递到外层下一次then中

    // 1. then方法中 成功的回调或者失败的回调返回的是一个promise，那么会采用返回的promise的状态，走外层下一次then中的成功或失败， 同时将promise处理后的结果向下传递
    // 2.then方法中 成功的回调或者失败的回调返回的是一个普通值 （不是promise） 这里会将返回的结果传递到下一次then的成功中去
    // 3.如果在then方法中 成功的回调或者失败的回调 执行时出错会走到外层下一个then中的失败中去
    then(onFulfilled,onRejected){
        debugger
        // 可选参数 then中的onFulfilled,onRejected为空则将上个then中的value或者reason传递到下个then中
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => {throw(e)}
        console.log(onFulfilled)
        let promise2 = new Promise((resolve,reject)=>{
            if (this.status === FULLFILLED){
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    }catch(e){
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            // 执行then方法状态是PENDING时 表示存在异步逻辑 使用发布订阅模式先将回调保存,异步结束调用resolve/reject再处理
            if (this.status === PENDING) {  
               this.onResolvedCallbacks.push(()=>{
                   setTimeout(() => {
                       try {
                           let x = onFulfilled(this.value)
                           resolvePromise(x, promise2, resolve, reject)
                       } catch (e) {
                           reject(e)
                       }
                   }, 0);
               })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
    catch(errFn){
        return this.then(null, errFn)
    }

    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value)
        })
    }

    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }

    static all(promises){
        return new Promise((resolve,reject)=>{
            let result = []
            let index = 0
            function process(v, k) {
                result[k] = v;
                if (++index == promises.length) { // 解决多个异步并发问题 靠计数器
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                let p = promises[i]
                if(p && typeof p.then === 'function'){
                    p.then(data=>{
                        process(data, i);// 异步的
                    },reject)
                }else {
                    process(p, i);// 同步的
                }
            }
        })
    }
}

module.exports = Promise