class Parent {
    constructor() {
        this.name = 'Parent';
        // return { a: 1 }  // console.log(child)  { a: 1, age: 9 }   并且执行child.eat()时会报错 child.eat is not a function
    }
    static b(){
        console.log('parent b')
    }
    eat(){
        console.log('parent eat')
    }
}
class Child extends Parent{  // 继承私有和公有 
    constructor(){
        super() // Parent.call(this)
        this.age = 9
    }
    static a(){
        console.log('child a')
    }
    smoking(){
        console.log(this.age)
    }

}

let child = new Child()
child.smoking()  // 子类实例继承了父类的公有方法
console.log(child.name)  //  子类实例继承了父类实例的私有属性
Child.b()  // 子类继承了父类的静态方法

  