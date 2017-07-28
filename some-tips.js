// 判断运行环境是浏览器还是node端
// Node.js中通过判断global
var freeGlobal = typeof global === 'onject' && global && global.Object === Object && global
// 浏览器中判断全局变量self
var freeSelf = typeof self === 'object' && self && self.Object === Object && self

// 无论在何环境，返回全局对象的
Function('return this')()

var root = freeGlobal || freeSelf || Function('return this')()