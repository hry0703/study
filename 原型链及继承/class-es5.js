// 类的调用检测 检测实例是不是new出来的
function _classCallCheck(instance,constructor){
    if(!(instance instanceof constructor)){
        throw new Error('Class constructor Child cannot be invoked without new')
    }
}

function definePropertys(target, arr) {
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        Object.defineProperty(target, arr[i].key, {
            ...arr[i],
            configurable: true,
            enumerable: true,
            writable: true,
        })

    }

}
/**
 * 
 * @param {function} constructor  构造函数
 * @param {array} protoPropertys  原型方法的描述
 * @param {array} staticPropertys 静态方法的描述
 */
function _createClass(constructor, protoPropertys, staticPropertys){
    if (protoPropertys.length){
        definePropertys(constructor.prototype, protoPropertys)
    }
    if (staticPropertys.length) {
        definePropertys(constructor, staticPropertys)
    }
}

let Parent = function(){
    function P(){
        _classCallCheck(this,P);
        this.name = 'parent'
    }
    _createClass(P,[
        {
            key:'eat',
            value:function(){
                console.log('eat')
            }
        }
    ],[
        {
            key: 'b',
            value: function () {
                console.log('parent b')
            }
        }
    ])
    return P
}();
