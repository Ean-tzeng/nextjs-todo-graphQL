import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    finished: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    deleteTodo(id: Int!): Int
    addTodo(title: String!): Todo
    updateTodo(id: Int!, title: String!): Int
    setFinish(id: Int!, finished: Boolean): Int
  }
`;
