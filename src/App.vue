<template>
  <div id="app">
  <form @submit.prevent="AddTask">
    <input type="text" class="search-input" v-model="taskToAdd" placeholder="Add New Task"/>
    <button type="submit" :disabled="taskToAdd.length < 2">+</button>
  </form>
  <section id="uncompleted">
    <h2>To Do ({{ uncompletedTasks.length }}): </h2>
    <todo v-for="uncompletedTask in uncompletedTasks" 
          :key="uncompletedTask.id" 
          @complete = "CompleteATask"
          @delete = "ToggleDeletedTask"
          :task="uncompletedTask"
    />
    <div v-if="uncompletedTasks.length == 0">
      <br/>The task list is Empty !! I'm the most busy human been in the whole Universe !
    </div>
  </section>
  <section id="completedTasks" v-if="completedTasks.length > 0">
    <h2>Completed ({{ completedTasks.length }} / {{ tasksList.length }}): </h2>
    <todo v-for="completedTask in completedTasks" 
            :key="completedTask.id" 
            @delete = "ToggleDeletedTask"   
            :task="completedTask"
      />
  </section>
  <section id="deletedTasks" v-if="deletedTasks.length > 0">
    <a href="" @click.prevent="EmptyRecycleBin" class="btn danger">Detete All<sup>{{ deletedTasks.length }}</sup></a>
    
    <todo v-for="deletedTask in deletedTasks" 
            :key="deletedTask.id" 
            @delete = "ToggleDeletedTask"
            :task="deletedTask"
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
    taskToAdd: "",
      }
    )
  },
  methods:{
    AddTask: function(){
      var i = new Date().getTime();
      this.tasksList.unshift({id: i, label:this.taskToAdd, done:false, deleted:false});
      
      this.taskToAdd = "";
    },
    CompleteATask: function (task){
      task.done = true;
      //console.log(event);
    },
    ToggleDeletedTask: function(task){
      var i = this.tasksList.indexOf(task);
      if (i < 0) 
        return;
      this.tasksList[i].deleted = this.tasksList[i].deleted ? false : true;
    },
    EmptyRecycleBin: function (){
      this.tasksList = this.tasksList.filter(t => !t.deleted)
    },
  },
  computed:{
    completedTasks: function () {
      // return the completed tasks only
      return this.tasksList.filter ( (t) => t.done && t.deleted === false )
    },
    uncompletedTasks: function () {
      // return the uncompleted tasks only
      return this.tasksList.filter ( (t) => !t.done && t.deleted === false )
    },
    deletedTasks: function(){
      // return the uncompleted tasks only
      return this.tasksList.filter ( (t) => t.deleted === true )
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
  background-image: linear-gradient(120deg, #aa7bc3, #944bbb);
  min-height:100vh;
  margin:0px 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left:auto;
  min-width: 350px;
}

section{
  margin-top:20px;
}
input, button {
  line-height: 2rem;
  border:none;
  padding:5px;
  font-size: 1.3em;
  background: none;
}
::placeholder{
   color: #444;
}
button{
  margin-left: -2.3rem;
  width: 50px;
  color:black;
  cursor: pointer;
}
*:focus {
    outline: none;
}
.search-input{
  width:90%;
  border-bottom: solid 2px #222;
  padding-right: 1.5rem;
}
sup {
  font-size:x-small;
  color:white;
  background-color:#e74c3c;
  padding: 3px;
  border-radius:30%;
	margin-left:3px;
}
</style>
