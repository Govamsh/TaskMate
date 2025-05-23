import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Task, TaskFilter } from '../types';
import { fetchTasks, addTask, updateTaskStatus, deleteTask } from '../services/taskService';
import { useAuth } from './AuthContext';

type TasksContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  loading: boolean;
  error: string | null;
  addNewTask: (title: string, dueDate: Date | null) => Promise<void>;
  toggleTaskStatus: (taskId: string, completed: boolean) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  filteredTasks: [],
  filter: 'all',
  setFilter: () => {},
  loading: false,
  error: null,
  addNewTask: async () => {},
  toggleTaskStatus: async () => {},
  removeTask: async () => {},
  refreshTasks: async () => {},
});

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => 
      filter === 'completed' ? task.completed : !task.completed
    );
  }, [tasks, filter]);

  const fetchUserTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userTasks = await fetchTasks(user.uid);
      setTasks(userTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const addNewTask = async (title: string, dueDate: Date | null) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await addTask(title, user.uid, dueDate);
      await fetchUserTasks();
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (taskId: string, completed: boolean) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateTaskStatus(taskId, completed);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (taskId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = fetchUserTasks;

  return (
    <TasksContext.Provider 
      value={{ 
        tasks, 
        filteredTasks,
        filter, 
        setFilter, 
        loading, 
        error, 
        addNewTask, 
        toggleTaskStatus, 
        removeTask, 
        refreshTasks 
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);