/*


防抖是指在一定的时间内再次触发此事件,会清空上次的事件重新开始,如果制定的时间内没有再次触发,那么这个事件才会执行
节流是指在一定的时间同一事件只会触发一次,只有超过了这个时间才会再次触发。

使用场景:
搜索框
按钮
监听滚动
频繁使用鼠标
总的来说：任何东西被频繁的调用都有可能需要防抖或者节流去优化

*/

// 在封装函数里记住时间状态，返回新的函数去执行。这是一个闭包


// 规定时间内不能执行第二次，尝试执行将重置等待时间
const debounce = (fn, timespace) => {
    let timeid = null;
    return function (...args){ // 剩余参数（...args）语法来收集
        if(timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(() => fn.apply(this, args), timespace); // 箭头函数绑定this
    }
}

// const newFunc = debounce(func, 100); 


// 规定时间内只能执行一次
function throttle(fn, timespace) {
    let timeid = null;
    return function (...args) {
        if(!timeid) {
            timeid = setTimeout(() => {
                timeid = null;
                fn.apply(this, args);
            }, timespace);
        }
    }
}


// 深拷贝


const deepClone = (obj) => {
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Function') {
        throw('输入对象');
    }
    if (type === 'Object') {
        const newObj = {};
        const keys = Object.getOwnPropertyNames(obj);
        keys.forEach(key => {
            newObj[key] = deepClone(obj[key]);
        });
        return newObj;
    }
    if (type === 'Array') {
        const newArray = [];
        obj.forEach((item, index) => {
            newArray[index] = deepClone(item);
        });
        return newArray;
    }
    const newVal = obj;
    return newVal;
}







// 遍历对象
/*
    1.Object.keys(obj) 方法会返回一个包含对象中所有可枚举属性的键的数组。
    2.for...in 循环遍历对象的所有可枚举属性，然后获取它们的键。
            for (const key in obj) {
                keys.push(key);
            }
    
    3.Object.getOwnPropertyNames(obj) 方法返回一个包含对象所有属性（包括不可枚举属性）的键的数组。
    4.Reflect.ownKeys(obj) 方法返回一个包含对象所有属性（包括不可枚举属性和符号属性）的键的数组。
            const symbolKey = Symbol('symbolKey');
            const obj = {
                a: 1,
                [symbolKey]: 2,
            };

            // 添加一个不可枚举属性
            Object.defineProperty(obj, 'nonEnumerableKey', {
                value: 3,
                enumerable: false,
            });

            // 获取所有属性的键
            const keys = Reflect.ownKeys(obj);
            console.log(keys); // ['a', Symbol(symbolKey), 'nonEnumerableKey']


*/


