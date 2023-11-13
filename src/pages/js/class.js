const class_test = () => {

    // Object.create() 是一个 JavaScript 方法，用于创建一个新的对象，并将其原型链设置为传入的参数对象。
    // 创建一个新的空对象。
    // 将新对象的 __proto__ 属性设置为传入的原型对象。
    // 返回新创建的对象。



   /*
        1.对原形链的理解：
            1.js对象是构造函数构造出来的，对象的__proto__属性指向了其构造函数的prototype, 构造函数的prototype也是一个对象，它也有一个__proto__属性指向了它的构造函数的prototype。
            2.构造函数的prototype.constructor 指向 构造个函数本身：Parent.prototype.constructor === Parent;
       
        2.作用域链和原型链的区别:
        作用域链是 JavaScript 用来解析变量查找的机制。原型链是 JavaScript 实现继承和对象属性查找的机制。
        查找变量时 javaScript 引擎首先在当前作用域进行查找，如果找不到，它会继续查找包含当前作用域的外部作用域，直到全局作用域。这个查找过程就构成了作用域链。
        访问一个对象的属性时 JavaScript 引擎首先在对象自身查找该属性，如果找不到，它会沿着对象的原型链查找，即查找对象的原型对象（通过 __proto__ 属性获取）


        3.new操作符的过程:
        function createNew(constructor, ...args) {
            // 1. 创建一个新对象, __proto__指向构造函数的prototype
            // 确保新创建的对象能够继承构造函数原型上定义的方法和属性
            // 当你尝试访问对象上不存在的属性或方法时，JavaScript 引擎会沿着原型链查找，直到找到属性或方法为止
            const obj = Object.create(constructor.prototype);
            // 2. 将构造函数的作用域绑定到新对象上并执行构造函数
            const res = constructor.apply(obj, args); 
            // 3. 如果构造函数返回一个对象，那么返回这个对象；否则返回刚刚创建的新对象
            return typeof res === 'object' && res !== null ? res : obj;
        }

        function Person (name, age) {
            this.name = name;
            this.age = age;
        }
        const Alice = createNew(Person, "Alice", 17);
        console.log(Alice.__proto__)
        console.log(Person.prototype)
        console.log(Alice.__proto__ === Person.prototype)
        console.log(Alice.constructor === Person.prototype.constructor)
    */



    
    // js四大继承方式
    /*
            1.原型链继承
            优点：
                简单易懂，纯粹的原型链继承。
            缺点：
                所有实例共享相同的属性和方法，导致属性污染。
                无法向父类传递参数。
    */
    /*
            function Parent(name) {
                this.name = name;
                this.home = 'shenzhen';
                this.colors = ['red']
            }

            function Child(age) {
                this.age = age;
            }

            Child.prototype = new Parent();
            const child = new Child(18); // 无法向父类传递参数
            console.log(child.home);
            const child2 = new Child(17);

            child2.home = 'shanghai';
            console.log(child.home) // shenzhen  添加属性到实例上，而非原型上

            child2.colors.push('green') // 直接修改原型上的属性
            console.log(child.colors) // [ 'red', 'green' ]
    */

         /*
            2.构造函数继承
            优点：
                可以向父类传参
                避免属性共享来的污染
            缺点：
                无法实现方法复用，每个子类都会copy父类的方法。
                （在创建大量实例时，性能影响会很明显，内存占用增加。同时维护困难，当有实例想要修改方法时，所有实例都要修改。）
         */
        /*
             function Parent(name) {
                this.name = name;
                this.colors = ['red'];
                this.say = function() {
                    console.log(name)
                }
            }

            function Child (age, name) {
                Parent.apply(this, [name]);
                this.age = age;
            }

            const c1 = new Child('Alice', 17);
            const c2 = new Child('Bob', 18);
            c1.colors.push('yellow');
            console.log(c2.colors) // [ 'red' ]
        */



        /*
            3. 原型链和构造函数的组合继承，需要共享的部分用原型链继承，不需要共享的部分用构造函数继承
            优点：
               可以实现属性和方法的继承，
               避免了引用类型属性共享的问题。
               可以向父类传递参数。

            缺点：
                调用两次父类构造函数，一次用于设置子类构造函数，一次用于子类实例化。导致不必要的开销
         */
        /*
                    function Parent(name) {
                        this.name = name;
                        this.colors = ['red'];
                    }

                    Parent.prototype.say = function() {
                        console.log(this.name);
                    }

                    function Child(name, age) {
                        this.age = age;
                        Parent.apply(this, [age]);
                    }
                    Child.prototype = new Parent(); // Child.prototype.constructor 指向 Parent 
                    Child.prototype.constructor = Child; // 确保原型链继承正确地实现，同时保持 constructor 属性的正确指向

                    // Child.prototype.constructor = Child的原因？
                    // 一个构造函数的 prototype.constructor 应该指向该构造函数本身， 避免因为原型链继承导致的错误指向。
                    // 如果使用 child1.constructor 创建新的实例将会创建parent的实例。
        */
       /*
            4.寄生组合继承
            是最佳继承方式
       */
        /*
            function Parent(name) {
                this.name = name;
                this.colors = ['red'];
            }
            function Child(name, age) {
                Parent.apply(this, [name]);
                this.age = age;
            }

            Child.prototype = Object.assign(Parent.prototype);
            Child.prototype.constructor = Child;
        */

        

        // 5. es6 extends 相当于es5寄生组合继承

        // class Parent {
        //     constructor(name) {
        //         this.name = name;
        //     }
        //     say() {
        //         console.log(this.name)
        //     }
        // }

        // class Child extends Parent {
        //     constructor(name, age) {
        //         super(name);
        //         this.age = age;
        //     }
        // }

        
   
    /*
            
            调用类构造和构造函数的区别：
            1.调用类必须 使用new 操作符号，构造函数如果不用new 则会以全局 this 作为内部对象。
            2. 类中定义的 constructor 方法不会被当成构造函数
            
            
            function Person(name) {
                console.log(this) // 全局this   、 Person {}
                this.name = name;
            }
            const p = new Person('Alice'); // Person { name: 'Alice' }
            const p1 = Person('Alice'); // undefined
    */
         
        // class 的 constructor里设置的属性在实例上，class属性在原型上
    
        // class Parent {
        //     constructor(name, age) {
        //         this.name = name;
        //         this.age = age;
        //         this.hello = function() {
        //             console.log(this.age)
        //         }
        //     }
        //     say() {
        //         console.log(this.name)
        //     }
        // }

        // const p1 = new Parent('Alice', 17);
        // const p2 = new Parent('Allen', 18);
    
        // const p1Prototype = Object.getPrototypeOf(p1);

        // 检查 say 方法是否直接定义在对象上（而不是沿着原型链的某个地方）。
        // 如果 say 方法是 p1Prototype 的自有属性（即直接定义在该对象上），则返回 true，否则返回 false。
        // console.log(p1Prototype.hasOwnProperty('say')) // true
        // console.log(p1Prototype.hasOwnProperty('name')) // false
        // console.log(p1.hasOwnProperty('name')) // true

        // console.log(p1Prototype)  // {}
        // 浏览器控制台通常会显示 {}，因为它只显示原型对象上的可枚举属性。而 say 方法是一个不可枚举属性，因此它不会在控制台输出中显示
        // ES6 标准中的规定，即类定义中的方法都是不可枚举的。这有助于提高代码的可读性，因为你通常不希望在遍历对象的属性时包含方法。

        // p1.say = null; // 直接修改不会修改原型对象，这里实际上是给实例上添加了say方法
        // p1Prototype.say = null; // 先获取原型对象，再修改


        // for (let prop in p1) {
        //     properties.push(prop); // for xx in xx 只会遍历可枚举属性
        // }
    
    }
    class_test();


    function P(name) {
        this.name = name;
    }

    function C(name, age) {
        P.apply(this, [name]);
        this.age = age;
    }

    // C.prototype = new P();
    C.prototype = Object.assign(P.prototype)
    C.prototype.construcotr = P;

