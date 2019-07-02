<template>
  <div class="todo-item">
    {{ task.label }}
      <i @click="$emit('delete', task)" class="delete-action">X</i>
      <i v-if="!task.done" @click="$emit('complete', task)" class="complete-action">O</i>
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
  margin: 10px;
  background: rgba(255, 255, 2555, 0.5);
  background: rgba(255. 255, 255, 1);
  border-radius:5px;

}
i{
    float: right;
    margin: 5px;
    cursor: pointer;
}
.delete-action{
  color:red;
  font-weight: bolder;
}
.complete-action{
  color:green;
  font-weight: bolder;
}
</style>
