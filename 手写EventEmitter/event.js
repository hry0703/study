function EventEmitter(){
    this._events = {}
}

EventEmitter.prototype.on = function (eventName, callback){
    if(!this._events) this._events = {}
    const callbacks = this._events[eventName] || [];
    callbacks.push(callback)
    this._events[eventName] = callbacks
}

EventEmitter.prototype.emit = function(eventName, ...args) {
    if (!this._events) this._events = {}
    let callbacks = this._events[eventName];
    callbacks && callbacks.forEach(fn=>fn(...args))
}

EventEmitter.prototype.off = function(eventName, callback) {
    if (!this._events) this._events = {}
    this._events[eventName] && this._events[eventName].filter(fn => fn !== callback && fn.l !== callback)
}

EventEmitter.prototype.once = function (eventName, callback) {
     const one = (...args)=>{
         callback(...args)
         this.off(eventName,one)
     }
    one.l = callback // 建立与原回调的关联
    this.on(eventName,one)
}



module.exports = EventEmitter