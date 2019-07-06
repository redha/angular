<template>
  <div class="todo-item">
    {{ task.label }}
    <img v-if="!task.done && !task.deleted" src="./../assets/check-mark.svg" @click="$emit('complete', task)" class="action-button" height="15px" width="15px">
    <img v-if="!task.deleted" src="./../assets/close.svg" @click="$emit('delete', task)" class="action-button" height="13px" width="13px">
    <img v-if="task.deleted" src="./../assets/upload.svg" @click="$emit('delete', task)" class="action-button" height="15px" width="15px">
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
  background: rgba(255, 255, 2555, 0.5);
  background: rgba(255. 255, 255, 1);
  border-radius:5px;
}
i{
  float: right;
  margin: 5px;
  cursor: pointer;
  margin-top: 0px;
}
.action-button{
  margin-left: 5px;
  float:right;
  cursor:pointer;
}
</style>
