import express from 'express';
import morgan from 'morgan';
import connect from '../connect.js';
import bodyParser from 'body-parser';
import Todo from './todo.js';

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/test', async (req, res) => {
  try {
    const todo = await Todo.findOne({}).exec();
    if (todo) {
      res.status(200).json({ message: 'MongoDB is working!', todo });
    } else {
      res.status(200).json({ message: 'MongoDB is connected, but no todos found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while testing the DB connection', error });
  }
});

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id
  try {
    const todo = await Todo.findById(todoId).exec()
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({message: "Could not get todo with this id", error})
  } 
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).lean().exec()
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({message: "Could not get todos", error})
  }
})

app.post('/todo', async (req, res) => {
  const todoToCreate = req.body.todo;
  try {
    const todo = await Todo.create(todoToCreate)
    res.status(201).json(todo.toJSON())
  } catch (error) {
    res.status(500).json({message: "Could not create todo", error})
  }
})

connect('mongodb://localhost:27017/intro-to-mongodb')
  .then(() => {
    app.listen(4000, () => {
      console.log('server running on http://localhost:4000')
    })
  })
  .catch(error => console.error('Failed to start server - DB connection error', error))