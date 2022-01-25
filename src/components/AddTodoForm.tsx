import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
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
            open={showDialog}
            onClose={handleCloseDialog}
          >
            <DialogTitle>
              Are you sure you wanna add it?
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button onClick={() => {
                setShowDialog(false);
                handleAddTodo();
              }} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
      )
      }
    </>
  );
};
