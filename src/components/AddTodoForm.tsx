import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { AddTodo } from "../types";

interface IProps {
  isDisabled: boolean;
  addTodo: AddTodo;
}

export const AddTodoForm: FC<IProps> = ({ isDisabled, addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo({ 
      variables: { text: newTodo },
      refetchQueries: ['GetAllTodos']
    });

    setNewTodo("");
  };

  return (
    <FormControl
      disabled={isDisabled}
      sx={{ 
        width: "100%",
        marginBottom: 2 // 16px
      }}
    >
      <Box 
        sx={{ 
          display: "flex",
          justifyContent: "center"
        }}
      >
        <OutlinedInput 
          sx={{ 
            width: "100%",
            marginRight: 1 // 8px
          }}
          value={newTodo} 
          placeholder="Enter a todo..." 
          onChange={handleChange}
          onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddTodo}
          disabled={isDisabled}
        >
          Add Todo
        </Button>
      </Box>
    </FormControl>
  );
};
