var actions = {
    // 类似于数组的Array.prototype.forEach方法，增加了可以中断循环的方法
    arrayEach: function (array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break
            }
        }
        return array
    }
}