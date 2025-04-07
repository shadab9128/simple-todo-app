const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(0, done); // Start server on random port
    });

    afterAll((done) => {
        server.close(done); // Close server when tests are done
    });

    beforeEach(() => {
        // Reset todos before each test
        app.locals.todos = [
            { id: 1, title: 'Learn Node.js', completed: false },
            { id: 2, title: 'Build a Todo App', completed: false }
        ];
    });

    it('GET /todos - should return all todos', async () => {
        const response = await request(app)
            .get('/todos')
            .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
    });

    it('POST /todos - should create a new todo', async () => {
        const newTodo = { title: 'New Test Todo', completed: true };
        
        const response = await request(app)
            .post('/todos')
            .send(newTodo)
            .expect(201);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.completed).toBe(newTodo.completed);
        
        // Verify it was added to the array
        const getResponse = await request(app).get('/todos');
        expect(getResponse.body.length).toBe(3);
    });
});