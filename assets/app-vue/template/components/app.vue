<template>
  <div>
    <todo-header name="ToDo"></todo-header>
    <ul>
      <li v-for="item in todo" :key="item">{{item}}</li>
    </ul>
    <button class="btn" v-on:click="addTodo">✨ Add Item</button>
    <todo-footer>footer content here</todo-footer>
  </div>
</template>

<script>
module.exports = {
  data: () => ({
    todo: []
  }),
  components: {
    "todo-footer": "url:./todo-footer.vue",
    "todo-header": "url:./todo-header.vue"
  },
  methods: {
    addTodo: function() {
      const todo = this.todo;
      this.todo = todo.concat(`Item ${todo.length}`);
    }
  }
};
</script>

<style>
ul {
  min-height: 100px;
  padding: 0;
  list-style: none;
  text-align: left;
  border: 4px dashed #aaa;
}

li {
  padding: 5px 10px;
}

li:nth-child(odd) {
  box-shadow: 0 0 1px -1px rgba(0, 0, 0, 0.5);
  background: #f8fbff;
}

.btn {
  font-size: 24px;
  padding: 10px;
}
</style>