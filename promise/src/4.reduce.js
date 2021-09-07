// 数组的方法 es5 forEach reduce map filter some every 
// es6 find findIndex 
// es7 includes

// reduce 常见功能 多个数据变成一个数据
let keys = ['name','age'];
let values = ['zs',18];
// let obj = keys.reduce((memo,key,idx)=>{
//   memo[key] = values[idx];
//   return memo
// },{})
let obj = keys.reduce((memo,key,idx)=>(memo[key] = values[idx], memo),{})  // (1,2,3,4) 逗号运算符，returns的是最后一项的值
// console.log(obj)


// reduce redux compose 组合多个方法
function sum(a,b) {
  return a+b
}

function toUpper(str) {
  return str.toUpperCase()
}

function add(str){
  return '***' + str + '***'
}

function compose(...fns){
  return (...args)=>{
    let lastFn = fns.pop()
    return fns.reduceRight((a,b)=>{
      return b(a)
    },lastFn(...args))
  }
}

// let r = compose(add,toUpper,sum)('zfpx','jw')
// console.log(add(toUpper(sum('zfpx','jw'))))  // ***ZFPXJW***
// console.log(r)


Array.prototype.reduce = function(callback,prev){
    for (let i = 0; i < this.length; i++) {
        if (prev == null ){
            prev = callback(this[i],this[i+1],i+1,this);
            // console.log(i + 1)
            i++; // i+1 这项已经计算过了，所以要i++
        }else {
            prev = callback(prev, this[i], i, this);
            // console.log(i)
        }
        // console.log(i)
    }
    return prev
}


let arr = [1,2,3,4,5,6,7];
let sumResult = arr.reduce((prev,curData,curIdx,a)=>{
    console.log(curIdx)
    return prev + curData
})
// console.log(sumResult)
