import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos 훅 테스트', () => {

  describe('1. addTodo: 새 할 일 추가', () => {
    it('정상적으로 새로운 할 일을 추가해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('공부하기');
      });
      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos[0]).toMatchObject({
        title: '공부하기',
        completed: false,
      });
      expect(result.current.todos[0].id).toBeDefined();
    });

    it('제목 앞뒤의 공백을 제거하고 추가해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('  운동하기  ');
      });
      expect(result.current.todos[0].title).toBe('운동하기');
    });

    it('빈 문자열이나 공백만 있는 경우 추가하지 않아야 한다 (엣지 케이스)', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('   ');
      });
      expect(result.current.todos).toHaveLength(0);
    });
  });

  describe('2. getTodos: 전체 목록 조회', () => {
    it('초기 상태에서는 빈 배열을 반환해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      expect(result.current.getTodos()).toEqual([]);
    });

    it('할 일이 추가된 후에는 전체 목록을 정상적으로 반환해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('청소하기');
        result.current.addTodo('설거지하기');
      });
      expect(result.current.getTodos()).toHaveLength(2);
      expect(result.current.getTodos()[0].title).toBe('청소하기');
    });

    it('목록 조회 시 각 할 일은 Todo 인터페이스 구조를 가져야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('테스트코드 작성');
      });
      const todos = result.current.getTodos();
      expect(todos[0]).toHaveProperty('id');
      expect(todos[0]).toHaveProperty('title');
      expect(todos[0]).toHaveProperty('completed');
      expect(todos[0]).toHaveProperty('createdAt');
    });
  });

  describe('3. toggleTodo: 완료 상태 토글', () => {
    it('할 일의 완료 상태를 false에서 true로 토글해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('잠자기');
      });
      const id = result.current.todos[0].id;
      
      act(() => {
        result.current.toggleTodo(id);
      });
      expect(result.current.todos[0].completed).toBe(true);
    });

    it('할 일의 완료 상태를 true에서 false로 다시 토글해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('밥먹기');
      });
      const id = result.current.todos[0].id;
      
      act(() => {
        result.current.toggleTodo(id); // true
        result.current.toggleTodo(id); // false
      });
      expect(result.current.todos[0].completed).toBe(false);
    });

    it('존재하지 않는 ID로 토글을 시도하면 상태가 변경되지 않아야 한다 (엣지 케이스)', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('책 읽기');
      });
      const originalTodos = [...result.current.todos];
      
      act(() => {
        result.current.toggleTodo('invalid-id');
      });
      expect(result.current.todos).toEqual(originalTodos);
    });
  });

  describe('4. deleteTodo: 할 일 삭제', () => {
    it('특정 ID의 할 일을 정상적으로 삭제해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('빨래하기');
      });
      const id = result.current.todos[0].id;
      
      act(() => {
        result.current.deleteTodo(id);
      });
      expect(result.current.todos).toHaveLength(0);
    });

    it('여러 개의 할 일 중 특정 할 일만 삭제해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('할일1');
        result.current.addTodo('할일2');
      });
      const idToDelete = result.current.todos[0].id;
      
      act(() => {
        result.current.deleteTodo(idToDelete);
      });
      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos[0].title).toBe('할일2');
    });

    it('존재하지 않는 ID를 삭제하려고 시도하면 아무 일도 일어나지 않아야 한다 (엣지 케이스)', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('할일1');
      });
      const originalLength = result.current.todos.length;
      
      act(() => {
        result.current.deleteTodo('wrong-id');
      });
      expect(result.current.todos).toHaveLength(originalLength);
    });
  });

  describe('5. updateTodo: 할 일 수정', () => {
    it('특정 ID의 할 일 내용을 정상적으로 수정해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('구버전 내용');
      });
      const id = result.current.todos[0].id;

      act(() => {
        result.current.updateTodo(id, '신버전 내용');
      });
      expect(result.current.todos[0].title).toBe('신버전 내용');
    });

    it('수정하려는 내용 앞뒤의 공백을 제거하고 수정해야 한다', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('기존 내용');
      });
      const id = result.current.todos[0].id;

      act(() => {
        result.current.updateTodo(id, '   새로운 내용   ');
      });
      expect(result.current.todos[0].title).toBe('새로운 내용');
    });

    it('새로운 내용이 빈 문자열이면 수정을 무시해야 큰다 (엣지 케이스)', () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo('원본 유지');
      });
      const id = result.current.todos[0].id;

      act(() => {
        result.current.updateTodo(id, '  ');
      });
      expect(result.current.todos[0].title).toBe('원본 유지');
    });
  });
});
