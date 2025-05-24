import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession, getSession } from '@supabase/auth-helpers-nextjs';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
  const session = useSession();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    async function fetchTodos() {
      if (session) {
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', session.user.id);
        if (error) console.error('Error fetching todos:', error);
        else setTodos(data || []);
      }
    }
    fetchTodos();
  }, [session]);

  async function addTodo() {
    if (!newTodo) return;
    if (session) {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text: newTodo, user_id: session.user.id }]);
      if (error) console.error('Error adding todo:', error);
      else setTodos([...todos, data[0]]);
      setNewTodo('');
    }
  }

  async function deleteTodo(id) {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
    if (error) console.error('Error deleting todo:', error);
    else setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)}/>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  return { props: { session } };
}