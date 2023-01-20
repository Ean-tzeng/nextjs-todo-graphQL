import { useMutation } from "@apollo/client";
import { Cancel, Check, Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../interface";
import {
  TodoDelete,
  TodoFinished,
  TodoQuery,
  TodoUpdate,
} from "../pages/gql/todo";

interface Props {
  todo: Todo;
}

const TodoItem = (prop: Props) => {
  const { todo } = prop;
  const [isEdit, setIsEdit] = useState(false);
  const titleIptRef = useRef(null);

  const [deleteTodo] = useMutation(TodoDelete, {
    refetchQueries: [{ query: TodoQuery }],
  });

  const [setFinish] = useMutation(TodoFinished, {
    refetchQueries: [{ query: TodoQuery }],
  });

  const [updateTodo] = useMutation(TodoUpdate, {
    refetchQueries: [{ query: TodoQuery }],
  });

  const finishedHandler = (id, finished) => {
    setFinish({ variables: { id, finished } });
  };

  const updateTodoHandler = () => {
    updateTodo({
      variables: { id: todo.id, title: titleIptRef.current.value },
    });
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      titleIptRef.current.value = todo.title;
    }
  }, [isEdit]);

  return (
    <ListItem
      secondaryAction={
        <>
          {!isEdit && (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setIsEdit(true)}
            >
              <Edit />
            </IconButton>
          )}
          {isEdit && (
            <>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => setIsEdit(false)}
              >
                <Cancel />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={updateTodoHandler}
              >
                <Check />
              </IconButton>
            </>
          )}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteTodo({ variables: { id: todo.id } })}
          >
            <Delete />
          </IconButton>
        </>
      }
    >
      <Checkbox
        checked={todo.finished}
        onChange={(e) =>
          finishedHandler(todo.id, (e.target as HTMLInputElement).checked)
        }
      />
      {!isEdit && <ListItemText primary={todo.title} />}
      {isEdit && <TextField variant="standard" inputRef={titleIptRef} />}
    </ListItem>
  );
};

export default TodoItem;
