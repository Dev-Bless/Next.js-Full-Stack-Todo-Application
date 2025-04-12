import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add interceptors for global error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error.response?.data?.message || 'An error occurred');
    }
);

export const fetchTodos = () => api.get('/todos');
export const createTodo = (todo: any) => api.post('/todos', todo);
export const deleteTodo = (id: any) => api.delete(`/todos/${id}`);