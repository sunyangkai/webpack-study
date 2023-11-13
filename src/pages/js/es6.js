
const javacript_es6 = () => {
    

    // 1.let, const 会创建块级作用域，不会像 var 声明变量一样会被提升

    // 2.const 表示无法修改变量的原始值。需要注意的是，const表示对值的常量引用，咱们可以改变被引用的对象的属性值，但不能改变引用本身。

    // 3.ES6 引入了对类(class关键字)、构造函数(constructor关键字)和 extend 关键字(用于继承)的语言支持。

    // 4.展开操作符
    // const obj1 = { a: 1, b: 2 }
    // const obj2 = { a: 2, c: 3, d: 4}
    // const obj3 = {...obj1, ...obj2}  

    //  5.Promise

    //  6.模块导出
    // const myModule = { x: 1, y: () => { console.log('This is ES5') }}
    // export default myModule;   
    // import myModule from './myModule';

    // 7. 箭头函数
    // 为解决 函数作用域this 绑定而生。this 的值取决于函数被调用时的方式和上下文环境。这使得在函数内部访问外部的 this 值变得困难，也导致了 this 绑定错误的出现。
    // 但没有arguments对象，因为它没有自己的函数作用域，可使用剩余参数访问函数args
    // 不能 new 操作，因为它没有自己的this
    const person = {
        name: 'Alice',
        age: 30,
      
        // 定义一个普通函数，用来访问外部的 this 值和变量
        greet: function() {
          const self = this;
      
          setTimeout(function() {
            // console.log(this)
            console.log(`Hello, my name is ${self.name}, and I'm ${self.age} years old.`);
          }, 1000);
        },
      
        // 定义一个箭头函数，用来访问外部的 this 值和变量
        sayHello: function() {
          setTimeout(() => {
            console.log(this)
            console.log(`Hello, my name is ${this.name}, and I'm ${this.age} years old.`);
          }, 2000);
        }
      };

      person.sayHello()

    // 8.Symbol
    /*
        1.Symbol 用于创建独一无二的标识符，可以用作对象的属性名或方法名，避免了因命名冲突而产生的错误。
         可以用于对象的属性名、方法名、私有成员、常量、枚举类型等场景，从而提高程序的可读性、可维护性和安全性
        2.创建私有成员或常量：Symbol 可以用于创建私有成员或常量，通过将 Symbol 作为对象属性的 key，来防止属性被意外修改   
        3.作为枚举类型：Symbol 可以用于定义枚举类型，将不同的枚举值映射到不同的 Symbol 上，从而实现枚举类型的效果。
     */
        // const name = Symbol('name')
        // const symbole_obj = {
        //     name: 'Alice' // 避免name属性被意外修改
        // }
    
        // 系统中或许存在很多个叫张三、李四的人。但在这里用Symbol声明一个独一无二的张三，避免命名重复
        // 如果不用Symbol，就需要业务前缀严格区分。这种情况在redux属性命名上很常见。
        // const zhangsan = Symbol('zhangsan'); 
        // const lisi = Symbol('lisi');

    
    // 展开语法 const copyOfTodd = { ...person };  剩余语法  const [a, b, ...rest] = arr;
    // 轻松地创建数组或对象的副本

    // 9.object.freeze() 冻结对象，不能修改对象属性。但是引用属性还能修改
    // 深度冻结对象需要递归掉哟改object.freeze() 
    // function deepFreeze(object) {
    //     let propNames = Object.getOwnPropertyNames(object);
    //     for (let name of propNames) {
    //         let value = object[name];
    //         object[name] = value && typeof value === "object" ?
    //             deepFreeze(value) : value;
    //     }
    //     return Object.freeze(object);
    // }
 
     /*
        class Person {
            constructor(name, age) {
            this.name = name;
            this.age = age;
            }
        
            getDetails() {
            return `${this.name} is ${this.age} years old.`;
            }
        }
        class Student extends Person {
            constructor(name, age, grade) {
            super(name, age);
            this.grade = grade;
            }
        }
        const student = new Student('John', 18, 'A');
        Student.prototype.isStudying = true;
        
        const keyArr = [];
        for (let key in student) { // 遍历对象可枚举的属性，包括原型上的
            keyArr.push(key) // 输出 name, age, grade, isStudying
        }
        console.log(keyArr); // [ 'name', 'age', 'grade', 'isStudying' ]
        console.log(Object.getOwnPropertyNames(student)) // 获取包括不可枚举的属性，只获取自身的属性，不包含原型上的 [ 'name', 'age', 'grade' ]
        console.log(Object.getPrototypeOf(student)); // Person { isStudying: true }

        // 如果要获取不可枚举的，还要所有原型链上的属性
        const getAllPropertyNames = obj => {
            let props = [];
            do { // 循环是在执行循环之前先执行一次循环体，然后再判断循环条件是否成立，
              props = props.concat(Object.getOwnPropertyNames(obj));
            } while (obj = Object.getPrototypeOf(obj));
          
            return props;
        };
        
        console.log(getAllPropertyNames(student))

        // Object.entries
        const person = {
            name: 'Alice',
            age: 30,
            gender: 'female'
          };
          
          for (let [key, value] of Object.entries(person)) {
            console.log(`${key}: ${value}`);
          }

     */
}

javacript_es6()