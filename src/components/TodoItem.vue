<template>
  <div class="todo-item">
    <div class="task-label"></div> {{ task.label }}
    <div class="task-id">{{ task.id }}</div>
    <div class="task-actions">
      <img v-if="task.done < 100 && task.deleted !== 1" alt="Task completed" src="./../assets/check-mark.svg" @click="$emit('complete', task)" class="action-button" height="15px" width="15px">
      <img v-if="task.deleted !== 1" alt="Delete the task" src="./../assets/close.svg" @click="$emit('delete', task)" class="action-button" height="13px" width="13px">
      <img v-if="task.deleted === 1" alt= "Undelete The task" src="./../assets/upload.svg" @click="$emit('delete', task)" class="action-button" height="15px" width="15px">
    </div>
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
  position: relative;
  width: 100%;
  padding: 10px;
  margin-top: 2px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}

img.action-button{
  width:11px;
  height:11px;
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
}

.task-label{
font-weight: bold;
}
.task-id{
  font-size:x-small;
}
.task-actions{
  position: absolute;
  top:50%;
  right:1%;
}

</style>
