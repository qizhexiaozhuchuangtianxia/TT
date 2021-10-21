export function  Person () {
   this.name = '我是名字'
   this.arr = [1] 
}
export function  Person1 () {
   this.name = '我是名字11'
   this.arr = [1]
}
// 父级
export function Shape(){
    this.name = 'shape-name'
    this.ads = 'shape-Beijing'
    this.fn = function () {
        this.fnObj = {
            name:'pros-shape--liu',
            ads:'pro-shape--beijing'
        }
    }
}

export function Child(){
    Shape.call(this)
    // this.name='child-name'
    // this.ads='child-ads'
}
Child.prototype = Object.create(Shape.prototype)
Child.prototype.constructor = Child;
console.log(Shape.prototype,'889089080');
console.log(Child.prototype,'889089080');



