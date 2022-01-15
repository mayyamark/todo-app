export interface Todo {
  id: number;
  text: string;
  complete: boolean;
};

export type ToggleComplete = ({ variables, refetchQueries } : { variables: { id: number } ; refetchQueries: string[] }) => void;

export type AddTodo = ({ variables, refetchQueries } : { variables: { text: string } ; refetchQueries: string[] }) => void;
