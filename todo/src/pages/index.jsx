/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import SearchBar from '../components/SearchBar/SearchBar';
import AddTaskModal from '../components/Modal/AddTaskModal';
import EditTaskModal from '../components/Modal/editTaskModal';
import TaskList from '../components/taskList/TaskList';
import api from '../api';
import DeleteModal from '../components/Modal/DeleteModal';

function Index() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');


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

  const displayEditTaskModal = (task) => {
    setEditTask(task);
    setShowEditTaskModal(true);
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

  const handleEditTitleChange = (e) => {
    setEditTask({ ...editTask, taskTitle: e.target.value });
  };

  const handleEditDescriptionChange = (e) => {
    setEditTask({ ...editTask, taskDescription: e.target.value });
  };

  const handleEditDueDateChange = (e) => {
    setEditTask({ ...editTask, dueDate: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { taskTitle: title, taskDescription: description, dueDate, createdAt: Date.now() };
      await api.post('/tasks', newTask);
      fetchTasks(); // Refresh the task list after adding a new task
      displayModal(); // Close the modal after successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
};


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask.id}`, editTask);
      fetchTasks(); // Refresh the task list after editing a task
      setShowEditTaskModal(false); // Close the edit modal after successful task update
    } catch (error) {
      console.error('Error updating task:', error);
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

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskToDelete}`);
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const clearCompletedTasks = async () => {
    try {
        await api.delete('/tasks/completed');
        fetchTasks(); // Refresh the task list after deleting completed tasks
    } catch (error) {
        console.error('Error deleting completed tasks:', error);
    }
};


  const displayDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filterAndSortTasks = (tasks) => {
    let filteredTasks = tasks.filter(task =>
      task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredTasks = filteredTasks.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });

    return filteredTasks;
};


  const filteredTasks = filterAndSortTasks(tasks);

  return (
    <div>
      <NavBar displayModal={displayModal} />
      <SearchBar handleSearchChange={handleSearchChange} handleSortChange={handleSortChange} />
      {showAddTaskModal && (
        <AddTaskModal
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleDueDateChange={handleDueDateChange}
          handleSubmit={handleSubmit}
          closeModal={displayModal}
        />
      )}
      {showEditTaskModal && editTask && (
        <EditTaskModal
          task={editTask}
          handleEditTitleChange={handleEditTitleChange}
          handleEditDescriptionChange={handleEditDescriptionChange}
          handleEditDueDateChange={handleEditDueDateChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setShowEditTaskModal(false)}
        />
      )}
      <TaskList 
        tasks={filteredTasks} 
        handleTaskStatusChange={handleTaskStatusChange} 
        displayEditTaskModal={displayEditTaskModal} 
        displayDeleteModal={displayDeleteModal}
        clearCompletedTasks={clearCompletedTasks} // Pass the function as a prop
      />

      
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Index;
