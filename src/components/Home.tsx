import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import React from "react";
import useHooks from "../hooks/useHooks";
import { AddTodoForm } from "./AddTodoForm";
import ErrorPage from "./ErrorPage";
import { TodoList } from "./TodoList";

const Home: React.FC = () => {
  const { useGetAllTodosQuery, useAddTodoMutation, useToggleCompleteMutation } = useHooks();

  // Same as:
  // const useGetAllTodosQueryResult = useGetAllTodosQuery();
  // const todos = useGetAllTodosQueryResult.data;
  // const loading = useGetAllTodosQueryResult.loading;
  // const error = useGetAllTodosQueryResult.error;
  const { data: todos, loading, error } = useGetAllTodosQuery();

  // Same as:
  // const useAddTodoMutationResult = useAddTodoMutation();
  // const addTodo = useAddTodoMutationResult[0];
  // const todos = useAddTodoMutationResult[1].data;
  // const loading = useAddTodoMutationResult[1].loading;
  // const error = useAddTodoMutationResult[1].error;
  const [addTodo, { 
    loading: isAddTodoLoading, 
    error: isAddTodoError 
  }] = useAddTodoMutation();

  const [toggleComplete, { 
    loading: isToggleLoading, 
    error: isToggleError 
  }] = useToggleCompleteMutation();

  if (error || isAddTodoError || isToggleError) {
    return <ErrorPage />;
  }

  console.log({
    query: { todos, loading, error}, 
    add: { loading: isAddTodoLoading, error:isAddTodoError }, 
    toggle: { loading: isToggleLoading, error:isToggleError }
  });
  
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column",
        margin: 6 // 48px
      }}
    >
      <AddTodoForm 
        isDisabled={loading || isAddTodoLoading || isToggleLoading} 
        addTodo={addTodo} 
      />
      {(loading || isAddTodoLoading) && (
        <CircularProgress 
          size={80} 
          sx={{ 
            alignSelf: "center", 
            marginBottom: 2 
          }} 
        />)}
      {todos && <TodoList todos={todos} toggleComplete={toggleComplete} />}
    </Box>
  );
};

export default Home;
