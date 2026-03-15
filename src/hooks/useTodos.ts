import { useState } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date(),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const getTodos = () => {
    return todos;
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, newTitle: string) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;
    
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, title: trimmedTitle } : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    getTodos,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}
