
(function() {
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: [],
      isActive: true
    },

    /* イベントハンドラ */
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      },
    },

    /* vm の el に対し,インスタンスがマウントされたら呼ばれる */
    mounted: function() {
      /* JSON.parse は 文字列をJSONとして解析し、JSの値やオブジェクトを構築する 
       * localStorage.getItem(keyName); 戻り値は key に対する値を持つ DOMString(文字コードのこと)
      */
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },

    /* メソッド */
    methods: {
      /* form addItem が実行されると */
      addItem: function(){
        /* push : 配列の末尾に要素(newItem)を追加 */
        this.todos.push(
          { title: this.newItem ,isDone: false, isActive: false, detail: ""} // isDone: trueだとしたに行く
        );
        this.newItem=''; // 空にする
      },
      active: function (index) {
        this.todos[index].isActive = !this.todos[index].isActive
      },
  
      deleteItem: function(index){
        /* confirm : ダイアログを表示 */
        if(confirm('削除しますか？')){
          this.todos.splice(index , 1);
        }
      },

      purge: function(){
        if(!confirm('選択したリストを全て削除しますか？')){
          return;
        }
        this.todos = this.remaining;
      },

    },

    /* computed : 算出プロパティ */
    computed: {
      remaining: function() {
        /* filter : 引数として与えられたテスト関数を各配列要素に対して実行し、
         *          それに合格したすべての配列要素からなる新しい配列を生成
        */
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      },

    }

  });

})();