import mysql, { ResultSetHeader } from "mysql2/promise";

const conn = async () =>
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db",
    port: 8889,
  });

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
    async todos() {
      const [rows] = await (await conn()).execute("SELECT * FROM todos");
      return rows;
    },
  },
  Mutation: {
    async addTodo(root, args, context) {
      const { title } = args;
      const todo = {
        title,
        finished: false,
      };
      const [result] = await (
        await conn()
      ).execute(`INSERT INTO todos(id,title) VALUES(default,'${title}');`);
      return { ...todo, id: (result as ResultSetHeader).insertId };
    },
    async deleteTodo(root, args, context) {
      const { id } = args;
      const [result] = await (
        await conn()
      ).execute("DELETE FROM `todos` WHERE `id`=" + id);
      return id;
    },
    async updateTodo(root, args, contest) {
      const { id, title } = args;
      const [result] = await (
        await conn()
      ).execute(`UPDATE todos SET title='${title}' WHERE id=${id}`);
      return id;
    },
    async setFinish(root, args, context) {
      const { id, finished } = args;
      const [result] = await (
        await conn()
      ).execute(`UPDATE todos SET finished=${finished} WHERE id=${id}`);
      return id;
    },
  },
};
