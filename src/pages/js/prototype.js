const javacript_prototype = () => {
    /**
        js 两种数据类型。
            基本数据类型：number, string, boolean, null, undefined, symbol, bigint
              存在栈内存中的。
              bigint：
                // 定义 BigInt 值
                整数值的范围不再受到 2 的 53 次方的限制，而可以表示任意大的整数。
                值必须以 n 结尾，例如 10n 表示一个 BigInt 值
                与 Number 类型的值不能混合运算。

                const a = 123456789012345678901234567890n;

                // BigInt 值的基本运算
                const b = a + 1n;
                const c = a * 2n;
                const d = a ** 3n;

            引用数据类型：
                Object：表示对象值，包括数组、函数、日期、正则表达式等。
              存在堆内存中的。
        
     */

    // 1.原始类型的变量在赋值或传参时是按值传递的，而引用类型的变量在赋值或传参时是按引用传递的
    function test1() {
        // 原始类型的变量是按值传递的
        let a = 10;
        let b = a;

        b = 20;

        console.log(a); // 10
        console.log(b); // 20

        // 引用类型的变量是按引用传递的
        let obj1 = { name: 'Tom' };
        let obj2 = obj1;

        obj2.name = 'Jerry';

        console.log(obj1.name); // Jerry
        console.log(obj2.name); // Jerry
    }

    // 2.值类型的数据是存储在栈内存中的，而引用类型的数据是存储在堆内存中的。
    // 当把一个值类型的数据赋值给一个变量时，JavaScript 引擎会把这个值复制到栈内存中，然后把变量指向这个栈内存地址。
    // 这意味着当改变变量的值时，实际上是改变了栈内存中存储的值，而不是改变原来的值。
    // 当把一个引用类型的数据赋值给一个变量时，JavaScript 引擎会把这个变量指向堆内存中存储该对象的内存地址，而不是把对象本身复制到变量中


    // 3.数据类型检测方法
     // typeof

     function typeof_test() {
        typeof 42; // "number"
        typeof true; // "boolean"
        typeof "hello"; // "string"
        typeof undefined; // "undefined"
        typeof Symbol(); // "symbol"
        typeof 9007199254740992n; // "bigint"
        typeof {}; // "object"


        typeof []; // "object"
        typeof new Date(); // "object"
        typeof /hello/; // "object"
        typeof new Map(); // "object"
        typeof new Set(); // "object"

        typeof function() {}; // "function"
        typeof null; // "object"

     }
     // instanceof
     // instanceof可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型
     function instanceof_test () {
        // object instanceof constructor
        class Animal {}
        class Dog extends Animal {}
        const animal = new Animal();
        const dog = new Dog();
        console.log(animal instanceof Animal); // true
        console.log(animal instanceof Dog); // false
        console.log(dog instanceof Animal); // true
        console.log(dog instanceof Dog); // true


        // instanceof只能正确判断引用数据类型，而不能判断基本数据类型
        console.log(2 instanceof Number);   
        // 2 是一个原始类型的数字值，不是 Number 类的实例          // false
        console.log(true instanceof Boolean);                // false 
        console.log('str' instanceof String);                // false 

        console.log([] instanceof Array);                    // true
        console.log(function(){} instanceof Function);       // true
        console.log({} instanceof Object);                   // true

     }

     // 当需要判断更多类型的时候，toString
     function to_string_test () {
        let a = 'hello';
        console.log(Object.prototype.toString.call(a)); // [object String]

        let b = 123;
        console.log(Object.prototype.toString.call(b)); // [object Number]

        let c = true;
        console.log(Object.prototype.toString.call(c)); // [object Boolean]

        let d = { name: 'Jack', age: 20 };
        console.log(Object.prototype.toString.call(d)); // [object Object]

        let e = [1, 2, 3];
        console.log(Object.prototype.toString.call(e)); // [object Array]

        let f = null;
        console.log(Object.prototype.toString.call(f)); // [object Null]

        let g = undefined;
        console.log(Object.prototype.toString.call(g)); // [object Undefined]

        let h = Symbol('key');
        console.log(Object.prototype.toString.call(h)); // [object Symbol]

        let i = function() {};
        console.log(Object.prototype.toString.call(i)); // [object Function]

     }





// 1.扩展阅读：js中的栈和堆
// 栈内存是一种后进先出（LIFO）的数据结构，它具有以下特点：

// 栈内存的空间很小，通常只有几十KB，因此存储的数据量比较有限。
// 栈内存中存储的数据是按照先进后出的顺序进行存储的。
// 栈内存的分配和释放是由编译器自动完成的，因此对程序员是透明的。
// 栈内存中存储的数据是不需要垃圾回收的，因为当函数执行完毕时，栈内存中的数据会自动被释放。
// 堆内存是一种动态分配的数据结构，它具有以下特点：

// 堆内存的空间比较大，通常几百MB或几GB，因此存储的数据量比较大。
// 堆内存中存储的数据是按照任意顺序进行存储的，没有特定的存储顺序。
// 堆内存的分配和释放是由程序员手动控制的，程序员需要在适当的时候手动释放不再使用的内存，否则会导致内存泄漏。
// 堆内存中存储的数据是需要垃圾回收的，因为程序员手动释放内存的时机可能不太准确，如果不及时回收垃圾数据，会导致内存溢出。


// 扩展阅读：内存泄漏
 const momoLeak = () => {


      // 1. 意外的全局变量
      // 没有使用 var、let 或 const 关键字定义变量，变量会变成全局变量，如果长期保留，会导致内存泄漏
        function createGlobalVariable() {
            myVariable = 'This is a global variable';
        }
        createGlobalVariable();
      

      // 2.闭包
      // 函数中定义了内部函数并返回
        function createClosure() {
            let count = 0;
            function increment() {
            count++;
            console.log(count);
            }
            return increment;
        }
  
     // 返回的函数形成闭包，如果长期被保留，会导致 count 变量无法被垃圾回收，从而导致内存泄漏
      let counter = createClosure();

      // 

     // 3.循环引用
     // 两个对象相互引用，形成循环引用
        let obj1 = {};
        let obj2 = {};
        obj1.ref = obj2;
        obj2.ref = obj1;
    // 这两个对象无法被垃圾回收，从而导致内存泄漏

        
        
      //4.定时器和回调函数
      //  果我们多次创建并销毁这个按钮元素，但没有删除对应的事件监听器，就可能导致内存泄漏的问题。因为事件监听器会一直存在于内存中，直到被删除或页面卸载。
      function handleClick() {
        console.log('Button clicked');
      }
      let btn = document.getElementById('myButton');
      btn.addEventListener('click', handleClick);
      
      // 在不再需要事件监听器的时候，及时删除它们，避免内存泄漏
      btn.removeEventListener('click', handleClick);
   
      // 5.当 DOM 元素被删除时，但是 JavaScript 对象仍然存在，就会发生内存泄漏
       let myDiv = document.getElementById('myDiv');
        // 从 DOM 中删除元素
        myDiv.parentNode.removeChild(myDiv);

        // 使用 DOM 元素
        // ...

        // 手动释放 DOM 引用
        myDiv = null;

 }

}


    /*

        call()、apply() 和 bind() 都是 JavaScript 中的函数方法，用于改变函数执行时的 this 上下文。
        call() 和 apply() 用于立即调用函数，并设置函数执行时的 this 值。它们之间的区别在于参数传递方式：call() 通过参数列表传递，apply() 通过参数数组传递。
        bind() 方法不会立即调用函数。而是返回一个新的函数，新函数的 this 值被绑定到指定的对象，在调用新函数时，传入的参数将依次传递给原函数。
        greet.call(obj, 'Hello')
        greet.apply(obj, ['Hello']); 
        const boundGreet = greet.bind(obj);
    */






      // 闭包：
      // https://juejin.cn/post/6957913856488243237#heading-2
      // 闭包是为了解决子函数晚于父函数销毁的问题，我们会在父函数销毁时，把子函数引用到的变量打成 Closure 包放到函数的 [[Scopes]] 上，让它计算父函数销毁了也随时随地能访问外部环境。


      // 但是 JS 引擎怎么知道它要用到哪些外部引用呢，需要做 AST 扫描，很多 JS 引擎会做 Lazy Parsing，
      // 这时候去 parse 函数，正好也能知道它用到了哪些外部引用，然后把这些外部用打包成 Closure 闭包，加到 [[scopes]] 中
      // 闭包是返回函数的时候扫描函数内的标识符引用，把用到的本作用域的变量打成 Closure 包，放到 [[Scopes]] 里。

      // 首先父函数的栈帧会销毁，子函数这个时候其实还没有被调用，所以还是一个堆中的对象，没有对应的栈帧，这时候父函数把作用域链过滤出需要用到的，形成闭包链，设置到子函数的 [[Scopes]] 属性上。
