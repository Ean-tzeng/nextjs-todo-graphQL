import { useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import {
  AppBar,
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { TodoAdd, TodoDelete, TodoFinished, TodoQuery } from "./gql/todo";
import { useState } from "react";
import { Todo } from "../interface";
import TodoItem from "../components/todoItem";

const Index = () => {
  const {
    data: { todos },
  } = useQuery(TodoQuery);

  const [addTodo] = useMutation(TodoAdd, {
    refetchQueries: [{ query: TodoQuery }],
  });

  const [addTitle, setAddTitle] = useState("");

  const addHandler = () => {
    if (addTitle) {
      addTodo({ variables: { title: addTitle } });
      setAddTitle("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography>Todo list</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", alignItems: "center", mt: 10 }}>
        <TextField
          value={addTitle}
          fullWidth
          label="輸入任務"
          onInput={(e) => setAddTitle((e.target as HTMLInputElement).value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={addHandler}>
                <Add />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Box>
        <List>
          {todos.map((todo: Todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: TodoQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
