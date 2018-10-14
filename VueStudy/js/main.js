(function() { // function を最初から起動する意味
    'use strict';
  
    var vm = new Vue({
      el: '#app',
      data: { // init view内のグローバル変数みたいなもの
        newItem: '',
        todos: []
      },
      watch: { // 変更時にかならず実行　で使用
        todos: { // これを監視
          handler: function() { // 変更時このfuncを使用
            localStorage.setItem('todos', JSON.stringify(this.todos));
            // alert('Data saved!');
          },
          deep: true //  todosは配列 -> 配列ごと監視したいときに deep　を使用
        }
      },
      mounted: function() { // 画面が表示されるとき以下を実行 ※マウントしたとき
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
      },
      methods: {
        addItem: function(){
          this.todos.push(
            { title: this.newItem ,isDone: false }
          );
          this.newItem='';
        },
        deleteItem: function(index){
          if(confirm('削除しますか？')){
            this.todos.splice(index , 1);
          }
        },
      },
      computed: { // 関数
        remaining: function() {
          return this.todos.filter(function(todo) {
            return !todo.isDone; // チャックあるかないかの判定
          });
        }
      }
    });
  })();