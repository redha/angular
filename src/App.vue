<template>
  <div id="app">
    <div class="toolbar">
      <button @click="Refresh">Refresh</button>
    </div>
    <h1 style="text-align:center">01:24</h1>
  <form @submit.prevent="AddTask">
    <input type="text" class="new-task-input" 
      v-model="taskToAdd" 
      autofocus
      placeholder="New Task"
      >
    <button type="submit" :disabled="taskToAdd.length < 2">+</button>
  </form>
  <section id="uncompleted">
    <h2>My List ({{ uncompletedTasks.length }}): </h2>
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
    <h2>Done ({{ completedTasks.length }} / {{ tasksList.length }}): </h2>
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
import dbMgr from './db/taskdb'

export default {
  name: 'app',
  components: {
    Todo
  },
  data:function() {
    return ({
      tasksList:[],
      taskToAdd: "",
      })
  },
  watch: { // If option adjust when typing
    taskToAdd: function(value){
      this.taskToAdd = value.replace(/\s+/g, " ").replace(/^\s/g, "");
      if (this.taskToAdd.length == 1)
        this.taskToAdd = this.taskToAdd.toLocaleUpperCase();
    }
  },
  methods:{
    Refresh: function(){
      this.tasksList = dbMgr.GetAllTasks();
    },
    AddTask: async function(){
      let newTasksLabel = this.taskToAdd.replace(/\s+/g, " ").trim();
      console.log(`newTasksLabel: ${newTasksLabel}`);
      if (newTasksLabel.length == 0)
        return;
      var i = new Date().getTime();
      let newTask = {id: i, label:newTasksLabel, done:-1, deleted:1};
      this.tasksList.push(newTask);
      await dbMgr.AddThisTask(newTask);
      
      this.taskToAdd = "";
    },
    CompleteATask: function (task){
      task.done = 100;
      //console.log(event);
    },
    ToggleDeletedTask: function(task){
      var i = this.tasksList.indexOf(task);
      if (i < 0) 
        return;
      this.tasksList[i].deleted = this.tasksList[i].deleted === 1 ? 0 : 1;
    },
    EmptyRecycleBin: function (){
      if(dbMgr.EmptyTrash())
        this.tasksList = this.tasksList.filter(t => t.deleted !== 1);
      else
      this.Refresh();
    },
  },

  computed:{
    completedTasks: function () {
      // return the completed tasks only
      return this.tasksList.filter ( (t) => t.done >= 100 && t.deleted !== 1 )
    },
    uncompletedTasks: function () {
      // return the uncompleted tasks only
      return this.tasksList.filter ( (t) => t.done < 100 && t.deleted !== 1 )
    },
    deletedTasks: function(){
      // return the uncompleted tasks only
      return this.tasksList.filter ( (t) => t.deleted === 1 )
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
  background-image: linear-gradient(10deg, #c2cae8, #8789c0);
  min-height:100vh;
  margin:0px 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1rem;
  margin-left:auto;
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
button[type=submit]:disabled{
  visibility: hidden;
}
*:focus {
    outline: none;
}
input:invalid{
 border-bottom: solid 1px red;
 color: #555;
}
.new-task-input{
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
