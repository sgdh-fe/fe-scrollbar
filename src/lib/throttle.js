// 函数节流
export default function (method, context, parameters) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context, parameters);
    }, 100)
}