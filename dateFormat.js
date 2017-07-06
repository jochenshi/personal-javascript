// 格式化时间的函数，将函数转换为自定义格式的函数
// @author: jochenshi@gmail.com

function dateFormat (format, date) {
    let tagArr = 'YYYY-MM-DD-hh-mm-ss'.split('-')
    date = date ? new Date(date) : new Date()
    format = format || 'YYYY年MM月DD日 hh:mm:ss'
    let year = date.getFullYear()
    let month = fillZero(date.getMonth() + 1)
    let day = fillZero(date.getDate())
    let hour = fillZero(date.getHours())
    let minute = fillZero(date.getMinutes())
    let second = fillZero(date.getSeconds())
    let param = [year, month, day, hour, minute, second]
    console.log(param)
    return param.reduce(function (accumate, val, index) {
        return accumate.split(tagArr[index]).join(val)
    }, format)
}


// 对于数字，在不足两位时在前面补0，只针对于大于等于0的数值
function fillZero (val) {
    var temp = Number(val),res
    if (isNaN(temp)) {
        console.log('error: value type is not number')
    } else {
        if (temp < 10) {
            res = '0' + temp
        } else {
            res = temp.toString()
        }
    }
    return res
}
