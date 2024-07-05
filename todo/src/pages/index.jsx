// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import SearchBar from '../components/SearchBar/SearchBar';
import AddTaskModal from '../components/Modal/AddTaskModal';
import TaskList from '../components/taskList/TaskList';
import api from '../api';

function Index() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const displayModal = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { taskTitle: title, taskDescription: description, dueDate };
      await api.post('/tasks', newTask);
      fetchTasks(); // Refresh the task list after adding a new task
      displayModal(); // Close the modal after successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskStatusChange = async (taskId, isCompleted) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { isCompleted });
      fetchTasks(); // Refresh the task list after updating a task's status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <NavBar displayModal={displayModal} />
      <SearchBar />
      {showAddTaskModal && (
        <AddTaskModal
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleDueDateChange={handleDueDateChange}
          handleSubmit={handleSubmit}
          closeModal={displayModal}
        />
      )}
      <TaskList tasks={tasks} handleTaskStatusChange={handleTaskStatusChange} />
    </div>
  );
}

export default Index;
