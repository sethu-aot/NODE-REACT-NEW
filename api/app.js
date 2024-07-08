const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const datas = [];

app.get('/tasks', (req, res) => {
    res.json(datas);
});


// Task creating function
app.post('/tasks', (req, res) => {
    const { taskTitle, taskDescription, dueDate } = req.body;
    const id = uuidv4();
    if (!taskTitle || !taskDescription || !dueDate) {
        return res.status(400).json({ error: "Invalid input: Title/Description/Due Date is absent" });
    }
    const createdAt = Date.now(); // Add a createdAt timestamp
    const newTask = { id, taskTitle, taskDescription, dueDate, createdAt, isCompleted: false };
    datas.push(newTask);
    res.json(newTask);
});


// Function to edit task
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { taskTitle, taskDescription, dueDate, isCompleted } = req.body;
    const task = datas.find(task => task.id == id);
    if (!task) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    task.taskTitle = taskTitle;
    task.taskDescription = taskDescription;
    task.dueDate = dueDate;
    task.isCompleted = isCompleted;
    res.json(task);
});


// Function to update completed task status
app.put('/tasks/:id/status', (req, res) => {
    const id = req.params.id;
    const { isCompleted } = req.body;
    const task = datas.find(task => task.id == id);
    if (!task) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    task.isCompleted = isCompleted;
    res.json(task);
});


//Clear completed task function
app.delete('/tasks/completed', (req, res) => {
    const remainingTasks = datas.filter(task => !task.isCompleted);
    const deletedCount = datas.length - remainingTasks.length;
    datas.length = 0; // Clear the original array
    datas.push(...remainingTasks); // Add remaining tasks back
    res.json({ message: `${deletedCount} completed tasks deleted` });
});


// Delete task function
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const taskIndex = datas.findIndex(task => task.id == id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "No task found with that ID" });
    }
    datas.splice(taskIndex, 1);
    res.json(datas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
