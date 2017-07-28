// 判断某对象是否包含指定的键值对
var _ = {}

// 一个返回函数的回调函数：可以绑定this作用域；可以指定参数的个数以及顺序
var callbackFun = function (func, context, argCount) {
    if (context === void 0) {
        return func
    }
    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function (value) {
                return func.call(context, value)
            }
        case 2:
            return function (value, other) {
                return fun.call(context, value, other)
            }
        case 3:
            return function (value, index, collection) {
                return func.call(context, value, index, collection)
            }
        case 4:
            return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection)
            }
    }
    return function () {
        return func.call(context, arguments)
    }
}

// 内部函数，根据不同的参数返回不同的处理方式
// value为空，则返回一个返回参数自身的回调函数
// value为函数是，则返回一个绑定了this作用域的函数
// value为对象时，则返回一个是否匹配属性的函数
// 否则返回一个读取对象value属性的回调函数
var callbacks = function (value, context, argCount) {
    if (value == null) {
        return _.self
    }
    if (_.isFunc(value)) {
        return callbackFun(value, context, argCount)
    }
    if (_.isObject(value)) {
        return _.matcher(value)
    }
    return _.property(value)

}

// 内部函数group
var group = function (behavior) {
    return function (obj, iterate, context) {
        var result = {}
        iterate = callbacks(iterate, context)
        // 暂时使用如下的循环方式
        obj.forEach(function(element, index) {
            var key = iterate(element, index, obj)
            behavior(result, element, key)
        }, this);
    }
}

// 返回自身参数的函数
_.self = function (value) {
    return value
}

// 判断对象obj中是否包含给定的所有的键值对
_.isMatcher = function (obj, newObj) {
    var keys = Object.keys(newObj), length = keys.length
    if (obj == null) return !length
    var obj = Object(obj)
    for (var i = 0; i < length; i++) {
        var key = keys[i]
        if (!(key in obj) || (obj[key] !== newObj[key])) {
            return false
        }
    }
    return true
}

// 创建一个编号数组，指定起始范围以及间隔
_.range = function (start, stop, step) {
    if (arguments.length <= 1) {
        stop = start || 0
        start = 0
    }
    // 间隔默认为1
    step = step || 1
    var length = Math.max(Math.ceil((stop-start)/step), 0)
    var range = Array(length)
    for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start
    }
}

// 将一个嵌套多层的数组转换为只有一层的数组，当传递shallow的时候，只减少一层的嵌套
flatten = function (arr, shallow, strict, startIndex) {
    var output = [], idx = 0
    for (var i = startIndex || 0; i < arr.length; i++) {
        var value = arr[i]
        if (_.isArray(value)) {
            if (!shallow) {
                value = flatten(value, shallow, strict)
            }
            var j = 0, len = value.length
            output.length += len
            while (j < len) {
                output[idx++] = value[j++]
            }
        } else if (!strict) {
            output[idx++] = value
        }
    }
    return output
}

// 判断是否是数组
var nativeIsArray = Array.isArray
_.isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

// 判断是否是布尔值
_.isBoolean = function (obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]'
}

// 判断数组中是否包含指定的item的值
_.contains = function (arr, item) {
    return arr.indexOf(item) > -1
}

// 判断是否是函数
_.isFunc = function (obj) {
    return typeof obj === 'function' || false
}

// 判断是否是对象，在js中函数也是对象，!!obj是为了排除null
_.isObject = function (obj) {
    var type = typeof obj
    return (type === 'function' || type === 'object') && !!obj
}

// 返回一个断言函数（返回值是布尔类型的函数）
// 这个函数是用来判断一个对象是否包含给定的键值对
_.matcher = function (attrs) {
    return function (obj) {
        return _.isMatcher(obj, attrs)
    }
}

// 返回一个将返回值取反的函数
_.negate = function (predicate) {
    return function () {
        return !predicate.apply(this, arguments)
    }
}

// 返回一个能读取obj对象中key对应的属性的函数
_.property = function (key) {
    return function (obj) {
        return obj == null ? void 0 : obj[key]
    }
}

// 去重
_.unique = function (array, isSorted, iterate, context) {
    // 针对没有传isSorted的时候的处理
    if (!_.isBoolean(isSorted)) {
        context = iterate
        iterate = isSorted
        isSorted = false
    }
    var result = [], seen = []
    for (var i = 0; i < array.length; i++) {
        var value = array[i]
        var computed = iterate ? iterate(value, i, array) : value
        if (isSorted) {
            if (!i || seen !== computed) {
                result.push(value)
            } else if (iterate) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed)
                    result.push(value)
                }
            } else if (!_.contains(result, value)) {
                result.push(value)
            }
        }
    }
    return result
}

// 取数组的交集
_.intersection = function (array) {
    if (array == null) return []
    var len = arguments.length
    // 对第一个数组进行遍历，以此为参照进行判断
    for (var i = 0; i < array.length; i++) {
        var item = array[i]
        if (_.contains(array, item)) continue
        for (var j = 1; j < len; j++) {
            if (!_.contains(arguments[j], item)) break
        }
        if (j === len) {
            result.push(item)
        }
    }
}

// 获取list的长度
_.size = function (obj) {
    if (obj == null) return 0
    return _.isArray(obj) ? obj.length : Object.keys(obj).length
}

// 针对对象的操作，返回对象中符合条件的key值
_.findKey = function (obj, predicate, context) {
    predicate = callbacks(predicate, context)
    var keys = Object.keys(obj), key
    for (var i = 0; i < keys.length; i++) {
        key = keys[i]
        if (predicate(obj[key], key, obj)) {
            return key
        }
    }
}

// 针对对象的操作，对对象中的每个元素进行指定的操作，
// 然后返回变换后的对象，不改变原有的对象，类似于数组的map
_.mapObject = function (obj, iterate, context) {
    iterate = callbacks(iterate, context)
    var keys = Object.keys(obj), length = keys.length, result = {}, currentKey, computed
    for (var i = 0; i < length; i++) {
        currentKey = keys[i]
        computed = iterate(obj[currentKey], currentKey, obj)
        result[currentKey] = computed
    }
    return result
}

// 将数组进行随机排序
_.randomSort = function (arr) {
    var len = arr.length
    var res = Array(len)
    for (var i = 0; i < len; i++) {
        var rand = _.random(0, i)
        if (rand !== i) {
            res[i] = res[rand]
        }
        res[rand] = arr[i]
    }
}

// 随机生成一个整数，在指定范围[min, max]
_.random = function (min, max) {
    if (max == null) {
        max = min
        min = 0
    }
    return min + Math.floor(Math.random() * (max - min + 1))
}

// 从数组中随机返回n个随机元素，不传n则随机返回一个
_.sample = function (obj, n) {
    if (n == null) {
        return obj[_.random(obj.length - 1)]
    }
    return _.randomSort(obj).slice(0,Math.max(0, n))
}

// 对数组或对象进行类似map的操作
_.map = function (obj, iterate, context) {
    iterate = callbacks(iterate, context)
    var keys = !_.isArray(obj) && Object.keys(obj), len = (keys || obj).length, results = Array(len)
    for (var i = 0; i < len; i++) {
        var currentIndex = keys ? keys[i] : i
        results[i] = iterate(obj[currentIndex], currentIndex, obj)
    }
    return results
}

// 获取数组中对象的某一属性值
_.pluck = function (obj, key) {
    return _.map(obj, _.property(key))
}

// 用于创建reduce,reduceRight的函数
function createReduce (dir) {
    // 迭代函数部分
    function iterator (obj, iterate, memo, keys, index, length) {
        for (; index >=0&&index < length; index +=dir) {
            var currentKey = keys ? keys[index] : index
            memo = iterate(memo, obj[currentKey], currentKey, obj)
        }
    }
    return function (obj, iterate, memo, context) {
        iterate = callbackFun(iterate, context, 4)
        var keys = !_.isArray(obj) && Object.keys(obj), length = (keys || obj).length,
            index = dir > 0 ? 0 : length - 1
        if (arguments.length < 3) {
            memo = obj[keys ? keys[index] : index]
            index += dir
        }
        return iterator(obj, iterate, memo, keys, index, length)
    }
}
