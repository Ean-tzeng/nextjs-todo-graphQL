const todos = [
  {
    id: 1,
    title: "test",
    finished: false,
  },
];

let uuid = 1;

export const resolvers = {
  Query: {
    todos() {
      return todos;
    },
  },
  Mutation: {
    addTodo(root, args, context) {
      const { title } = args;
      uuid += 1;
      const todo = {
        id: uuid,
        title,
        finished: false,
      };
      todos.push(todo);
      return todo;
    },
    deleteTodo(root, args, context) {
      const { id } = args;
      const idx = todos.findIndex((todo) => todo.id === id);
      const todo = todos.splice(idx, 1);
      console.log(todo);
      return;
    },
    updateTodo(root, args, contest) {
      const { id, title } = args;
      const todo = todos.find((t) => t.id === id);
      console.log(typeof id, title, todos);
      if (todo) {
        todo.title = title;
      }
      return todo;
    },
    setFinish(root, args, context) {
      const { id, finished } = args;
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.finished = finished;
      }
      return todo;
    },
  },
};
