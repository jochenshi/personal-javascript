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
