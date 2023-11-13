/*
    js代码粉异步代码和同步代码
    异步代码分：
        微任务：Promise、await、MutationObserver、process.nextTick（node)
        宏任务：用户交互事件，如 click、mousedown；网络请求、文件I/O 事件、定时器事件setTimeout、
    
    执行顺序：
     检测微任务队列，清空。
     执行宏任务队列中的第一个。如此反复。

*/

const task = () => {
    console.log('script start');
    setTimeout(function() { // 宏任务1
        console.log('setTimeout1');
        Promise.resolve().then(function() { // 微任务1
            console.log('promise1');
        });
    }, 0);

    setTimeout(function() { // 宏任务2
        console.log('setTimeout2');
        Promise.resolve().then(function() { // 微任务2
            console.log('promise2');
        });
    }, 0);

    Promise.resolve().then(function() { // 微任务3
        console.log('promise3');
        setTimeout(function() { // 宏任务3
            console.log('setTimeout3');
            Promise.resolve().then(function() { // 微任务4
            console.log('promise4');
            });
        }, 0);
    }).then(function() { // 微任务5
        console.log('promise5');
    });
    console.log('script end');
    // script start
    // excute.html:32 script end
    // excute.html:21 promise3
    // excute.html:29 promise5
    // excute.html:7 setTimeout1
    // excute.html:9 promise1
    // excute.html:14 setTimeout2
    // excute.html:16 promise2
    // excute.html:23 setTimeout3
    // excute.html:25 promise4

}
