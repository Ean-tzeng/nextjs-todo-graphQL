import gql from "graphql-tag";

export const TodoQuery = gql`
  query TodoQuery {
    todos {
      id
      title
      finished
    }
  }
`;

export const TodoDelete = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

export const TodoAdd = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      finished
    }
  }
`;

export const TodoUpdate = gql`
  mutation UpdateTodo($id: Int!, $title: String!) {
    updateTodo(id: $id, title: $title)
  }
`;

export const TodoFinished = gql`
  mutation SetFinshed($id: Int!, $finished: Boolean!) {
    setFinish(id: $id, finished: $finished)
  }
`;
