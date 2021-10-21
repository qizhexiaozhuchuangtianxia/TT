<template>
  <div>
    <div v-html="msg"></div>
  </div>
</template>

<script>
import {Person , Person1, Shape, Child} from "./person.js";
export default {
  name: "HelloWorld",
  data() {
    return { 
      msg: '',
      keyMapArr: {},
      newObj: [],
      all: [],
      objKey: {},
      key: "",
      obj: {
        user: {
          userGroup: {
            id: "aaa", // user.userGroup.id: 'aaa'
            userGroup1: {
              id1: {
                userGroup2: "userGroup2", // user.userGroup.userGroup1.id1.userGroup2: 'userGroup2'
              },
              id2: "id2", // user.userGroup.userGroup1.id2: 'id2'
            },
          },
          name: {
            first: "foo", // user.name.first: 'foo'
            lase: "bar", // user.name.lase: 'bar'
            name1: {
              first1: "foo1", // user.name.name1: 'foo1'
              lase1: "bar1", // user.name.name1.lase1: 'bar1'
            },
          },
        },
        user1: "user1", // user1："user1"
      },  
      l1:[2,3,4],
      l2:[5,6,4],
      l3:[9,9,9,9,9,9,9],
      l4:[9,9,9,9],
      tree:[
        {
          a:[
            {

            },
            {

            }
          ]
        },
        {
          
        }
      ]
    };
  },
  mounted() { 
    
    // 示例
    const personA = new Person()
    const personB = new Person1()
    const newpro = {'pro':'prooo'}
    // personA.__proto__ = Object.create(newpro)
    // console.log(personA,'personA');
    personA.arr.push(11)
    // 实现一个继承类
    const shoape = new Shape()
    const child = new Child()
 


  
    this.reduceChuanX({a:1});
    // this.async();

    // 数组拉平
    let moArray = [1, [2, [3, [4, [5]]]]];
    
    // reduce
    // let reduce = this.reduce(moArray);
    // console.log(reduce, "reduce");
    // arr 表示原数组；
    // prev 表示上一次调用回调时的返回值，或者初始值 init;
    // cur 表示当前正在处理的数组元素；
    // index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
    // init 表示初始值。

    // this.instanceof(); // 判断数据类型
    // this.isTypeof([]); // "Array" typeof []是object，因此toString返回
    // this.isTypeof("123"); // "string" typeof 直接返回
    // this.isTypeof(window); // "Window" toString返回
    // this.isTypeof(null); // "Null"首字母大写，typeof null是object，需toString来判断
    // this.isTypeof(undefined); // "undefined" typeof 直接返回
    // this.isTypeof(); // "undefined" typeof 直接返回
    // this.isTypeof(function () {}); // "function" typeof能判断，因此首字母小写
    // this.isTypeof(/123/g); //"RegExp" toString返回
    // this.testing()
    // 深拷贝

    // 浅拷贝 - 第一层拷贝，内存地址是新的,但是第二层的内存地址就是同一指向了gri
    // Object.assign // ES6
    // this.ObjectAssign();
    // 扩展运算符
    // this.kuozhanyunsuanfu()

    this.mapKey(this.obj);
    // console.log(this.objKey, "__this.objKey ");
    const val = this.add(1,2)

    // l1[i] + l2[i] = ln[i]
    // ln >= 10 ln[i-1]
    // 对应索引值相加/ 当前大于10向前进1/ 补 0
    // this.resolveAdd(this.l3,this.l4)
    // this.classExtends()
    this.bibaohuidiao(this.funcBack)
  },

  methods: {
    // 回调
    funcBack(a){
      console.log(a,'aaa');
    },
    bibaohuidiao(funcBack){
      let a= 11
      funcBack(a)
    },
    // 
    classExtends(){
      class Rectangle {
        // constructor
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }
        
        // Getter
        get area() {
            return this.calcArea()
        }
        
        // Method
        calcArea() {
            return this.height * this.width;
        }
    }

    const rectangle = new Rectangle(10, 20);
    console.log(rectangle.area,'class');
    // 输出 200

      // 继承
      class Square extends Rectangle {

        constructor(x,y) {
          super(x, y);
          
          // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
          this.name = 'Square';
        }

        get area() {
          return this.height + this.width;
        }
      }

      const square = new Square(10,20);
      // console.log(square.area);
    this.moreString()
      // 输出 100
    },

    moreString(){
      // let arr = ["d", "d", "f", "f", "f", "g", "g", "g", "h", "h", "h", "h", "h", "h", "h", "h", "h"]
      let arr = ["d", "h", "h","d"]
      let num = 1;
      let arr1 = [];
      let maxmore = ''
      for(let i = 0; i < arr.length; i++) {
        if(arr[i] === arr[i+1]) {
          maxmore = arr[i]; // h
          num++;
        }else {
          arr1[num] = maxmore;
          console.log(arr1,num);
          num = 1;
        }
      }
      // [undefined, '' ]
      // [undefined, 'h']
      return
      console.log(arr1,num,'=====',arr1.length );
      console.log({
    num: arr1.length - 1,
    maxmore: maxmore
  })
    },
    resolveAdd (l1, l2) {
      let head = null, tail = null;
      let carry = 0;
      while (l1 || l2) {
          const n1 = l1 ? l1.val : 0;
          const n2 = l2 ? l2.val : 0;
          const sum = n1 + n2 + carry;
          if (!head) {
              head = tail = new ListNode(sum % 10);
          } else {
              tail.next = new ListNode(sum % 10);
              tail = tail.next;
          }
          carry = Math.floor(sum / 10);
          if (l1) {
              l1 = l1.next;
          }
          if (l2) {
              l2 = l2.next;
          }
      }
      if (carry > 0) {
          tail.next = new ListNode(carry);
      }
      return head;
    },
    resolveAdds(agr1,agr2){
      console.log(agr1,'ag1-----',agr1.reverse());
      let adds = []
      let sum = false
      const [agr1Len,agr2Len] = [agr1.length,agr2.length]

      // 先补0
      if( agr1Len > agr2Len ){
        const addVal = agr1Len - agr2Len
        for(let i=0;i<addVal;i++){
          agr2.unshift(0)
        }
      }
     var reverseAgr1 = agr1.reverse()
     
      for(let i=agr1Len;i--;){
        let i1v = reverseAgr1[i]
        let i2v = agr2[i]  
        if(i1v+i2v > 10){
          // 5 
          sum = true
              adds[agr1Len-i] = i1v+i2v-10
              if( adds[agr1Len-i-1] + 1){
                adds[agr1Len-i-1] = adds[agr1Len-i-1] + 1
              }
          
        }else{
          adds[agr1Len-i] = i1v+i2v
        }
        console.log(i1v,i2v);
        
      }
      // agr1.forEach((item,index)=>{

      // })
      
      console.log(agr2,'agr2Len');


    },
    async add(...args) {
      console.log(args,'args');
      return args.reduce((promiseChain, item) => {
        console.log(promiseChain,'promiseChain',item,'item');
        return promiseChain.then(res => {
          return this.addRemote(res, item);
        });
      }, Promise.resolve(0));

    },
    async adds(...args){
      let res = 0;
      console.log(res,'ooo');
      if (args.length <= 2) return res
      for(const item of args){
         res = await this.addRemote(res,item)
      }
      console.log(res,'res');
      return res

    },
    async addRemote  (a,b) {
      return new Promise(resolve =>{
        return setTimeout(() =>resolve(a + b),1000)
      })
    },
    prototype(){
      
    },
    reduceChuanX(params) {
      // reduce 相当于就是循环 实现一个串行
      // 场景: promise then.then.then 这样调用~ 每一个then里面都有自己的处理逻辑
      let request = [this.request1, this.request2, this.request3];
      request.reduce((prev,cur)=>prev.then(res=> cur(res)), Promise.resolve(params || ''));
    },
    // Promise.resolve(params)
    fnCall(prev, cur) {
      prev.then(res=>{
        console.log(res,prev,cur,'resss');
        cur(res)
      })
      return prev
    }, 
    // 处理自定义请求-自有逻辑
    request1(params) {
      console.log(params,'req1-params');
      const p1 = new Promise((resolve)=>{
        setTimeout(() => {
          console.log("执行requestput1111");
        }, 2000);
        resolve(11)
      })
      return p1

    },
    request2(params) {
      console.log(params,'req2-params');
       const p2 = new Promise((resolve)=>{
         setTimeout(() => {
           console.log("执行requestput2222");
         }, 2000);

         resolve(22)
      })
      return p2
    },
    request3(params) {
      console.log(params,'req3-params');
      const p3 = new Promise((resolve)=>{
         setTimeout(() => {
           const vl = params + 100000;
           console.log("执行requestput333----执行request2的值",params, vl);
         }, 2000);
         resolve()
      })
      return p3

    },
    async() {
      //先微再宏
      console.log("外部--1");

      this.ff();
      // 微任务
      new Promise((resolve, reject) => {
        console.log("执行-Promise--2");
        setTimeout(() => {
          console.log("Promise的setTime---4");
          resolve();
          console.log("Promise的setTime---5");
        }, 1000);
      });
    },
    async ff() {
      // 宏任务
      setTimeout(() => {
        console.log("外部的setTimeout---3");
      }, 100);
    },
    reduce(moArray) {
      // return this.reduce((prev, cur) => {
      //   return prev.concat(Array.isArray(prev) ? this.reduce(cur) : cur);
      // }, []);
    },
    mapKey(obj, parentKey) {
      for (var item in obj) {
        if (typeof obj[item] == "object") {
          let Key = parentKey ? `${parentKey}.${item}` : item;
          this.mapKey(obj[item], Key);
        } else {
          if (parentKey) {
            let key = `${parentKey}.${item}`;
            this.objKey[key] = obj[item];
          } else {
            this.objKey[item] = obj[item];
          }
        }
      }
    },

    // 第一种方法

    // user:[
    //   userGroup:[
    //  id: [1]
    //    ],
    //   name:[
    //      first:[foo],
    //      lase:[bar],
    //    ]
    // ]
    //  user.userGroup.id:1
    //  user.name.first:foo
    //  user.name.lase:bar
    // 循环

    // 第二种方法

    // [ user,user1 ]
    
    // [ userGroup, name  ]
    // [ id, [first,lase]  ]
    // 循环

    // 第三种方法

    // [ user ,userGroup ,id  ]
    // [  name, [first,lase]  ]
    // 循环

    mapKey1(obj, index, objKey) {
      if (!this.keyMapArr[index]) {
        this.keyMapArr[index] = [];
      }
      for (var item in obj) {
        console.log(
          obj,
          "_____obj",
          this.key,
          "_____this.key",
          objKey,
          "____________objKey",
          typeof obj[item] == "object",
          "____typeof"
        );
        // console.log(index,"__index");
        // console.log(obj,item,"__item");
        if (typeof obj[item] == "object") {
          // if (!this.newObj[index]) {
          //   this.newObj[index] = [];
          // }
          // this.newObj[index].push(item);
          // this.keyMapArr[index].push(item);
          console.log(objKey, "===========", this.key, "=============");
          if (objKey) {
            if (this.key != "") {
              this.key = `${objKey}.${this.key}`;
              console.log(1);
            } else {
              this.key = `${objKey}`; // user
              console.log(2, this.key);
            }
          }
          this.mapKey(obj[item], index + 1, item);

          // this.objKey[this.key] = "";
          // console.log(item,'_item',objKey,'_objKey',this.key,'key');
        }
        //  else {
        // console.log('-------------else-----------');
        // this.keyMapArr[index].push(item);
        // this.keyMapArr[this.keyMapArr].push(obj[item])
        // this.keyMapArr[index].push()
        // console.log(this.objKey,this.key, "keyyyyyyyyyyyyyyyyyyy");
        // if (objKey) {
        //   this.key = `${objKey}.${item}`;
        //   this.objKey[this.key] = obj[item];
        // }
        // }
      }
    },
    kuozhanyunsuanfu() {
      let a = { aa: 11, bb: 22 };
      let b = { ...a };
      b.aa = 111;
      console.log(a, b, "a_b");
    },
    ObjectAssign() {
      // ------浅拷贝(目标元素,数据源)------
      let targets = {};
      let sources = { a: { b: 1 } };
      Object.assign(targets, sources);
      console.log(targets, "target");
      //  ------浅拷贝会出现同一个指向内存地址，改变拷贝的属性值,就会改变原始属性的值------
      let target = {};
      let source = { a: { b: 2 } };
      Object.assign(target, source);
      console.log(target); // { a: { b: 10 } };
      source.a.b = 10;
      console.log(source); // { a: { b: 10 } };
      console.log(target); // { a: { b: 10 } };
    },
    testing() {
      // '123' == 123   // true
      // '' == null    // false
      // '' == 0        // ture
      // [] == 0        //  true
      // [] == ''       //  true
      // [] == ![]      //  true
      // null == undefined //  true
      // Number(null)     // 0
      // Number('')      // 0
      // parseInt('');    // NaN
      // {}+10           // 10
    },
    init() {},
    isTypeof(obj) {
      //  ------如果a不存在,直接判断typeof a 会报错------
      if (!a) {
        console.log("不会执行");
      }
      // ------这样不会报错,在判断有没有值的时候可以这样写------
      if (typeof a == undefined) {
        console.log("没有a");
      }

      let type = typeof obj;
      if (type !== "object") {
        // ------先进行typeof判断，如果是基础数据类型，直接返回------
        return type;
      }
      // ------对于typeof返回结果是object的，再进行如下的判断，正则返回结果------
      return Object.prototype.toString
        .call(obj)
        .replace(/^\[object (\S+)\]$/, "$1"); // 注意正则中间有个空格
      /* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
    },
    instanceof() {
      let Car = function () {};
      let newCar = new Car();
      newCar instanceof Car;
      console.log(newCar instanceof Car, "_是否为 'function'");
      let aa = new String("222");
      console.log(aa instanceof String, "_是否为 String ");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
