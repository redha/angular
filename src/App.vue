<template>
  <div id="app">
  <form @submit.prevent="AddTask">
    <input type="text" class="search-input" v-model="todoToAdd" placeholder="New Todo Here..."/>
    <button type="submit" :disabled="todoToAdd.length < 2">+</button>
  </form>
  <section id="uncompleted">
    <h2>To Do ({{ UncompletedTasks.length }}): </h2>
    <todo v-for="uncompletedTask in UncompletedTasks" 
          :key="uncompletedTask.id" 
          @complete = "TaskCompleted"
          @delete = "DeleteTask"

          :task="uncompletedTask"
    />
  </section>
  <section id="completedTasks" v-if="completedTasks.length > 0">
    <h2>Completed ({{ completedTasks.length }} / {{ tasksList.length }}): </h2>
    <todo v-for="completedTask in completedTasks" 
            :key="completedTask.id" 
            @delete = "DeleteTask"
            
            :task="completedTask"
      />
  </section>
  </div>
</template>

<script>
import Todo from './components/TodoItem.vue'

export default {
  name: 'app',
  components: {
    Todo
  },
  data:function() {
    return (
      {
    tasksList:[],
    todoToAdd: "",
      }
    )
  },
  methods:{
    TaskCompleted: function (task){
      task.done = true;
      //console.log(event);
    },
    DeleteTask: function(task){
      var i = this.tasksList.indexOf(task);
      if (i < 0) 
        return;
      this.tasksList.splice(i, 1);
    },
    AddTask: function(){
      var i = new Date().getTime();
      this.tasksList.unshift({id: i, label:this.todoToAdd, done:false});
      
      this.todoToAdd = "";
    }
  },
  computed:{
    completedTasks: function () {
      // return the completed tasks only
      return this.tasksList.filter ( (t) => t.done )
    },
    UncompletedTasks: function () {
      // return the uncompleted tasks only
      return this.tasksList.filter ( (t) => !t.done )
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-image: linear-gradient(120deg, #0abde3, #341f97);
  min-height:100vh;
}
h2{
  margin:10px;
  margin-top:20px;
}
input, button {
  line-height: 2rem;
  border:none;
  padding:5px;
  font-size: 1.3em;
  background: none;
}
button{
  margin-left: -50px;
  width: 50px;
  color:black;
  cursor: pointer;
}
.search-input{
  width:90%;
  border-bottom: solid 2px #222;
  margin:10px;
  padding-right: 70px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-left:auto;
}
</style>
