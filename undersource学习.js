// 判断某对象是否包含指定的键值对
var _ = {}
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

// 返回一个将返回值取反的函数
_.negate = function (predicate) {
    return function () {
        return !predicate.apply(this, arguments)
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
