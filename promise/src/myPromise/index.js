const PENDING = 'PENGDING'; // 默认等待状态
const FULLFILLED = 'FULLFILLED'; // 成功态
const REJECTED = 'REJECTED' // 失败态

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

    then(onFulfilled,onRejected){
        if (this.status === FULLFILLED){
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        // 执行then方法状态是PENDING时 表示存在异步逻辑 使用发布订阅模式先将回调保存,异步结束调用resolve/reject再处理
        if (this.status === PENDING) {  
           this.onResolvedCallbacks.push(()=>{
               onFulfilled(this.value)
           })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise