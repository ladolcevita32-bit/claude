'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEdit = (id: string) => {
    if (editTitle.trim()) {
      updateTodo(id, editTitle);
    }
    cancelEditing();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            할 일 목록
          </CardTitle>
          <CardDescription className="text-sm font-medium text-slate-500">
            {todos.length}개의 할 일이 있습니다 ({todos.filter(t => t.completed).length}개 완료)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <Input
              type="text"
              placeholder="새로운 할 일을 입력하세요..."
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="flex-1 transition-all focus-visible:ring-2 focus-visible:ring-primary h-12"
            />
            <Button type="submit" size="lg" className="h-12 w-20 font-semibold shadow-sm transition-transform active:scale-95">
              추가
            </Button>
          </form>

          <div className="space-y-3 mt-4">
            {todos.length === 0 ? (
              <div className="text-center py-10 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm">아직 등록된 할 일이 없습니다.</p>
                <p className="text-xs mt-1">새로운 목표를 세워보세요!</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li 
                    key={todo.id} 
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group border
                      ${todo.completed 
                        ? 'bg-slate-50/80 border-slate-100 text-slate-500 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:shadow-md hover:border-primary/20'
                      }`}
                  >
                    <div className="flex-shrink-0 pt-0.5">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        className={`h-5 w-5 transition-all ${todo.completed ? 'data-[state=checked]:bg-slate-400 data-[state=checked]:border-slate-400 text-white' : 'border-slate-300'}`}
                        id={`todo-${todo.id}`}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <form 
                          onSubmit={(e) => { e.preventDefault(); saveEdit(todo.id); }}
                          className="flex items-center gap-2"
                        >
                          <Input
                            autoFocus
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="h-8 py-1 px-2 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                          />
                          <div className="flex flex-shrink-0 gap-1">
                            <Button type="submit" size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="ghost" 
                              onClick={cancelEditing}
                              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <label 
                          htmlFor={`todo-${todo.id}`}
                          className={`block truncate max-w-full text-[15px] font-medium transition-all cursor-pointer ${todo.completed ? 'line-through decoration-slate-300' : ''}`}
                        >
                          {todo.title}
                        </label>
                      )}
                    </div>

                    {editingId !== todo.id && (
                      <div className="flex flex-shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditing(todo.id, todo.title)}
                          disabled={todo.completed}
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                        >
                          <span className="sr-only">수정</span>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <span className="sr-only">삭제</span>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
