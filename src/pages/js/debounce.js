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



const d = function(fn, space) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), space);
    }
}

const t = function(fn, space) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, space)
        }
    }
}