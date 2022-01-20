import { useEffect, useState } from 'react';
import { initialTodos } from '../initialTodos';
import { AddTodo, Todo, ToggleComplete } from '../types';

interface IState {
  data: undefined | Array<Todo>;
  loading: boolean;
  error: undefined | boolean;
}

interface IResult {
  useGetAllTodosQuery: () => IState;
  useAddTodoMutation: () => [AddTodo, IState];
  useToggleCompleteMutation: () => [ToggleComplete, IState]
}

interface IMutationOptions {
  todo: Todo;
  refetch: boolean;
}

const useHooks = (): IResult => {
  const [queryResult, setQueryResult] = useState<IState>({
    data: undefined,
    loading: false,
    error: undefined
  });

  const [addMutationOptions, setAddMutationOptions] = useState<undefined | IMutationOptions>(undefined);
  const [addMutationResult, setAddMutationResult] = useState<IState>({
    data: undefined,
    loading: false,
    error: undefined
  });

  const [toggleMutationOptions, setToggleMutationOptions] = useState<undefined | IMutationOptions>(undefined);
  const [toggleMutationResult, setToggleMutationResult] = useState<IState>({
    data: undefined,
    loading: false,
    error: undefined
  });

  // useEffect(() => {}, [])
  // Load initial todos
  useEffect(() => {
    setQueryResult({ ...queryResult, loading: true });

    const timer = setTimeout(() => {
      setQueryResult({ 
        data: initialTodos, 
        loading: false, 
        error: false 
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  // Add a todo and refetch the query for all todos
  useEffect(() => {
    if (addMutationOptions) {
      setAddMutationResult({ ...addMutationResult, loading: true });

      const timer = setTimeout(() => {
        setAddMutationResult({ 
          data: [addMutationOptions.todo], 
          loading: false, 
          error: false 
        });

        if (addMutationOptions.refetch && queryResult.data) {
          const newQueryData = [addMutationOptions.todo].concat(queryResult.data);

          setQueryResult({ 
            data: newQueryData, 
            loading: false, 
            error: false 
          });
        }
    
        setAddMutationOptions(undefined);
      }, 1500);


      return () => {
        clearTimeout(timer);
      }
    }
  }, [addMutationOptions]);

  // Update a todo and refetch the query for all todos
  useEffect(() => {
    if (toggleMutationOptions) {
      setToggleMutationResult({ ...addMutationResult, loading: true });

      setToggleMutationResult({ 
        data: [toggleMutationOptions.todo], 
        loading: false, 
        error: false 
      });

      if (toggleMutationOptions.refetch && queryResult.data) {
        const newQueryData = queryResult.data.map((todo: Todo) => {
          if (todo.id === toggleMutationOptions.todo.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });

        setQueryResult({ 
          data: newQueryData, 
          loading: false, 
          error: false 
        });
      }
  
      setToggleMutationOptions(undefined);
    }
  }, [toggleMutationOptions]);

  const addTodo: AddTodo = ({ variables, refetchQueries }) => {
    if (queryResult.data && variables.text.trim() !== "") {
      const todo: Todo = { 
        id: queryResult.data.length + 1, 
        text: variables.text, 
        complete: false 
      };

      setAddMutationOptions({ 
        todo,
        refetch: refetchQueries.includes('GetAllTodos') 
      });
    }
  }

  const toggleComplete: ToggleComplete = ({variables, refetchQueries}) => {
    if (queryResult.data) {
      const todoToUpdate = queryResult.data.find((todo: Todo) => todo.id === variables.id);
  
      if (todoToUpdate) {
        setToggleMutationOptions({ 
          todo: todoToUpdate,
          refetch: refetchQueries.includes('GetAllTodos') 
        });
      }
    }
  };

  return { 
    useGetAllTodosQuery: () => queryResult, 
    useAddTodoMutation: () => [addTodo, addMutationResult],
    useToggleCompleteMutation: () => [toggleComplete, toggleMutationResult],
  }
}

export default useHooks;