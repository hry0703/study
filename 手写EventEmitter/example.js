// const EventEmitter = require('events');
const EventEmitter = require('./event');
const events = new EventEmitter

const getUp = function(name){
    console.log(name + '起床了')
}
events.on('getUp', getUp)

events.emit('getUp', 'zhangsan')
events.off('getUp', getUp)
events.emit('getUp', 'zhangsan')