const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false }
];

// Routes
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    
    todo.completed = req.body.completed;
    res.json(todo);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');
    
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo[0]);
});

// Export the app for testing
module.exports = app;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    module.exports.server = server;
}