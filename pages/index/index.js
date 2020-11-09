Page({
  data:{
    //文本框数据模型
    search:'',
    //任务清单数据模型
    todos:[
      { name: '找一个对象!', completed: true},
      { name: '和happy看一场电影', completed: false },
      { name: '和happy去旅行', completed: false }
    ],
    leftCount:2,
    allcompleted:false
  },
  inputChangeHandle: function (e) {
    //由于小程序的数据绑定是单向的，必须给文本注册改变事件
    //console.log(e.detail)
    this.setData({ search: e.detail.value })
  },
  addTodoHandle: function () {
    //当添加按钮点击时发生是执行函数
    //console.log(111)
    //如果文本框的值为空，就返回掉
    if(!this.data.search) return
    var todos = this.data.todos
    todos.push({
      name:this.data.search,
      completed:false
    });
    //必须显示的通过setData去改变数据，这样界面才会得到变化
    this.setData({todos:todos,search:'',leftCount:this.data.leftCount + 1})
  }, 
  toggleTodoHandle:function(e){
    //切换当前点中的item的完成状态
    //console.log(e.currentTarget)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed=!item.completed
    //根据当前任务的完成状态决定增加一个或者减少一个
    var leftCount = this.data.leftCount + (item.completed ? -1:1)
    this.setData({todos : this.data.todos,leftCount : leftCount})
  },
  removeTodoHandle(e){
    //执行删除操作,需要注意冒泡问题
    var todos = this.data.todos
    //item就是splice方法中移除掉的元素
    var item=todos.splice(e.currentTarget.dataset.index,1)[0]
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)
    this.setData({ todos: todos, leftCount: leftCount})
  },
  toggleAllHandle(){
    this.data.allcompleted = !this.data.allcompleted
    var todos = this.data.todos
    todos.forEach(item=>{
      item.completed = this.data.allcompleted
    })
    var leftCount = this.data.allcompleted ? 0 : this.data.todos.length
    this.setData({ todos: todos, leftCount: leftCount})
  },
  clearHandle(){
    //使用过滤器
    var todos = this.data.todos.filter(item=>{
      return !item.completed
    })
    this.setData({ todos: todos })
  }
})
