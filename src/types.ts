export interface Todo {
  id: number;
  text: string;
  complete: boolean;
};

export type ToggleComplete = (selectedTodo: Todo) => void;

export type AddTodo = (newTodoText: string) => void;
