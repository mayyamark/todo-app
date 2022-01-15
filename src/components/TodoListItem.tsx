import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItem from "@mui/material/ListItem";
import React from "react";
import { Todo, ToggleComplete } from "../types";

interface IProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
}

export const TodoListItem: React.FC<IProps> = ({
  todo,
  toggleComplete
}) => {
  return (
    <ListItem>
      <FormControlLabel
          value={todo.text}
          sx={{ 
            textDecoration: todo.complete ? "line-through" : "none",
            color: todo.complete ? "primary.main" : "black"
          }}
          control={
            <Checkbox
              checked={todo.complete}
              onChange={() => toggleComplete({ 
                variables: { id: todo.id }, 
                refetchQueries: ['GetTodos'] 
              })}
              // onChange={toggleComplete} // This won't work here, because toggleComplete expects an argument => we pass arguments via callbacks
            />
          }
          label={todo.text}
          labelPlacement="end"
        />
    </ListItem>
  );
};
