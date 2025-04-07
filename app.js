const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

app.use(express.static('public'));  // Serve static files from 'public' folder

// In-memory database
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false }
];

// Routes

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    
    res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');
    
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});