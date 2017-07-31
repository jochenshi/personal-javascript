var actions = {
    // 类似于数组的Array.prototype.forEach方法，增加了可以中断循环的功能
    arrayEach: function (array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break
            }
        }
        return array
    },
    // 从后往前循环数组，可以增加自己的函数用于跳出循环
    arrayEachRight: function (array, iteratee) {
        var length = array == null ? 0 : array.length
        while (length--) {
            if (iteratee(array[length], length, array) === false) {
                break
            }
        }
        return array
    },
    // 对数组进行循环，验证是否都满足条件
    arrayEvery: function (array, predicate) {
        var index = -1, length = array == null ? 0 : array.length
        while (++index) {
            if (!predicate(array[index], index, array)) {
                return false
            }
        }
        return true
    },
    // 对数组进行循环并针对每一项执行操作，返回满足条件的元素组成的数组
    arrayFilter: function (array, predicate) {
        var index = -1,length = array == null ? 0 : array.length, resIndex = 0, result = []
        while (++index < length) {
            var value = array[index]
            if (predicate(value, index, array)) {
                result[resIndex++] = value
            }
        }
        return result
    }

}