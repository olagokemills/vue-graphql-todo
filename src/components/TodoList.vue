<template>
  <div>
       <h4 v-if="loading">Loading...</h4>

      <input type="text" class="todo-input"
       placeholder="WHat needs to be done
       " v-model="newTodo"
        @keyup.enter="addTodo"/>

        <div v-for="(todo, index) in retrieveAllForumCategory"
                    v-bind:visibleTodo="visibleTodo"
                        v-bind:currentPage="currentPage"
                  :key="todo._id"
             class="todo-item">

            <div class="todo-item-left">
                <input type="checkbox"
                       v-model="todo.completed">
                           <div v-if="!todo.editing"
                               @dblclick="editTodo(todo)" 
                       class="todo-item-label">
                     {{ todo.category }}
            </div> 

         <input v-else type="text" class="todo-item-edit" 
            v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus />
         </div>

         <div class="remove-item" @click="removeTodo(index)">
             &times;
         </div>
     </div>

    <div>

    </div>
    <hr />

    <Pagination
    v-bind:retrieveAllForumCategory="retrieveAllForumCategory"
    v-on:page:update="updatePage"
    v-bind:currentPage="currentPage"
    v-bind:pageSize="pageSize"
    > 
        
    </Pagination>

  </div>
  
</template> 

<script>
import { ALL_TODOS_QUERY, CREATE_TODOS_QUERY } from '../constants/graphql';
import Pagination from './Pagination.vue';
export default {
  name: 'todo-list',
  components:{
    Pagination
  },
  data() {
    return{
        currentPage: 0,
        pageSize: 3,
        visibleTodo: [],
        newTodo: '',
        idForTodo:6,
        beforeEditCache: '',
    retrieveAllForumCategory:[],
       loading:0,

      }

     },
     directives:{
         focus:{
             inserted: function(el){
                 el.focus()
             }
         }
     },
     beforeMount: function(){
         this.updateVisisbleTodo();
     },
     apollo:{
         retrieveAllForumCategory:{
             query: ALL_TODOS_QUERY
         }
     },
     methods:{
        
         addTodo(){
             if(this.newTodo.trim().length == 0){
                 return
             }
               const category  = this.newTodo;
               this.newTodo = "";
                this.$apollo.mutate({
                    mutation: CREATE_TODOS_QUERY,
                    variables: {
                    category
                    },
                })

             this.newTodo = '';
             this.idForTodo++;
             this.updateVisisbleTodo;
         },
         removeTodo(index){
             this.todos.splice(index, 1);
             this.updateVisisbleTodo();
         },
         editTodo(todo){
             this.beforeEditCache = todo.title;
             todo.editing= true
         },
         doneEdit(todo){
             if(todo.title.trim().length == '')
             {
                 todo.title = this.beforeEditCache
             }
             todo.editing = false
         },
         cancelEdit(todo){
             todo.title = this.beforeEditCache;
             todo.editing = false
         },

         updatePage(pageNumber){
             this.currentPage = pageNumber;
             this.updateVisisbleTodo();
         },

         updateVisisbleTodo(){
            
            this.visibleTodo = this.retrieveAllForumCategory.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
                    //console.log(this.visibleTodo);
            //if there are no visible todos, go back a page

             if (this.visibleTodo.length == 0 && this.currentPage > 0){
                 this.updatePage(this.currentPage - 1);
             }
         }
     }
}


</script>

<style lang="scss">
.todo-input{
    width: 100%;
    padding:10px 18px;
    font-size:18px;
    margin-bottom:16px;

    &:focus{
        outline:0;
    }
}
.todo-item{
    margin-bottom:12px;
    display: flex;
    align-items:center;
    justify-content: space-between;
}
.remove-item{
    cursor:pointer;
    margin-left: 14px;
    &:hover{
        color:black;
    }
}   
.todo-item-edit{
    
    font-size:24px;
    color:#2c3e50;
    margin-left: 12px;
    width: 100%;
    padding:10px;
    border:1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;

    &:focus{
        outline: none;
    }
}
.todo-item-label{
        padding:10px;
        border:1px solid white;
        margin-left: 12px;
}
.completed{
    text-decoration: line-through;
    color:grey;
}

.todo-item-left{
    display:flex;
    align-items: center;
}

</style>
