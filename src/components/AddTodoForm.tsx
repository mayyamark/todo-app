import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import Dialog from "./Dialog";
import { AddTodo } from "../types";

interface IProps {
  isDisabled: boolean;
  addTodo: AddTodo;
}

export const AddTodoForm: FC<IProps> = ({ isDisabled, addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);

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

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <>
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
                setShowDialog(true);
              }
            }}
          />
          <Button 
            variant="contained" 
            onClick={() => setShowDialog(true)}
            disabled={isDisabled}
          >
            Add Todo
          </Button>
        </Box>
      </FormControl>
      {showDialog && (
        <Dialog 
          showDialog={showDialog} 
          title="Do you want to add it?" 
          onClose={handleCloseDialog} 
          onConfirm={() => { 
            handleAddTodo();
            handleCloseDialog();
          }} />
        )}
    </>
  );
};
