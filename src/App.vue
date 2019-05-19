<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <todo-list></todo-list>

  </div>
</template>

<script>

import TodoList from './components/TodoList.vue';
//import Pagination from './components/Pagination.vue';

export default {
  name: 'app',
  components: {
    TodoList
  },
  data(){
    return{
    retrieveAllForumCategory:0,
    currentPage: 0,
    pageSize: 3
    }
  }, methods:{
    updatePage:()=> {

    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size:24px;
}
.container{
  width: 600px;
  margin:0 auto;
}

.logo{
  display: block;
  margin:28px auto;
  height:75px;
}
</style>
