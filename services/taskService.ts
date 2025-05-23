import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Task } from '../types';

const TASKS_COLLECTION = 'tasks';

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        title: data.title,
        completed: data.completed,
        dueDate: data.dueDate ? new Date(data.dueDate.toDate()) : null,
        createdAt: new Date(data.createdAt.toDate()),
        userId: data.userId
      });
    });
    
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (
  title: string, 
  userId: string, 
  dueDate: Date | null = null
): Promise<string> => {
  try {
    const taskData = {
      title,
      completed: false,
      dueDate: dueDate ? Timestamp.fromDate(dueDate) : null,
      createdAt: serverTimestamp(),
      userId
    };
    
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, completed: boolean): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, { completed });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};