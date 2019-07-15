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
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  background: rgba(255, 255, 2555, 0.2);
  border-radius:5px;
}
img.action-button{
  width:11px;
  height:11px;
  float: right;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 5px;
}
.action-button{
  margin-left: 5px;
  float:right;
  cursor:pointer;
}
</style>
