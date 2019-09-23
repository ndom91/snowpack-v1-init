<template>
  <header>
    <h2>{{name}} List</h2>
  </header>
</template>

<script>
module.exports = {
  props: {
    name: {
      default: "",
      type: String
    }
  }
};
</script>

