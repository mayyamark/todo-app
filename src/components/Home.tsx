import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from "react";
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

  // I: No dependency array => will trigger useEffect & will execute the logic on each rerender
  // useEffect(() => {
  //   alert('On each rerender');
  // });

  // II: Empty dependency array => will trigger useEffect & will execute the logic on the initial render
  // useEffect(() => {
  //   alert('On the initial render only');
  // }, []);

  // III.A: Dependency array => will trigger useEffect & will execute the logic on the initial render + when the dependency changes
  // useEffect(() => {
  //   alert('On the initial render + When todos changes (e.g, "complete" field from one of the todos)');
  // }, [todos]);

  // III.B: Dependency array with a condition => will trigger useEffect when the dependency changes, BUT will execute the logic if the condition is true
  // useEffect(() => {
  //   if (todos && todos.length > 2 && todos.length < 5 ) {
  //     alert('When todos\' length is 3 or 4');
  //   }
  // }, [todos]);

  
  // Uncomment to see how the data changes:
  // console.log({
  //   query: { todos, loading, error}, 
  //   add: { loading: isAddTodoLoading, error:isAddTodoError }, 
  //   toggle: { loading: isToggleLoading, error:isToggleError }
  // });
  
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
