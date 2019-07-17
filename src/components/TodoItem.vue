<template>
  <div class="todo-item">
    {{ task.label }}
    <img v-if="task.done < 100 && task.deleted !== 1" alt="Task completed" src="./../assets/check-mark.svg" @click="$emit('complete', task)" class="action-button" height="15px" width="15px">
    <img v-if="task.deleted !== 1" alt="Delete the task" src="./../assets/close.svg" @click="$emit('delete', task)" class="action-button" height="13px" width="13px">
    <img v-if="task.deleted === 1" alt= "Undelete The task" src="./../assets/upload.svg" @click="$emit('delete', task)" class="action-button" height="15px" width="15px">
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    task: {},
  },
  methods:{
  }
}
</script>

<style scoped>
.todo-item{
  width: 100%;
  padding: 10px;
  margin-top: 2px;
  /* 
  background: rgba(255, 255, 255, 0.2);
  border-radius:5px;
  box-shadow: 1px 0px 2px 1px #777; 
  */
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);

}
.todo-item:hover{
  border-bottom: 1px solid rgba(50, 50, 50, 0.2);
}
img.action-button{
  width:11px;
  height:11px;
  margin-top: 5px;
  margin-left: 10px;
  float: right;
  cursor: pointer;
}
</style>
