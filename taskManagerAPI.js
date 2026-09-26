const express = require("express"); 
const app = express(); 
app.use(express.json()); 


let tasks = [
    {
        id: 1, 
        title: "Study biology", 
        desc: "Read DNA", 
        status: "pending"
    }, 
    {
        id: 2, 
        title: "Buy chocolate", 
        desc: "Buy chocolate at grocery store on your way to school", 
        status: "completed"
    }
]; 


const validateCreateTask = (req, res, next) => {
    const {title, desc, status} = req.body; 

    if (!title || title === "") return res.status(400).json({error: "Missing title"});
    if (!desc || desc === "") return res.status(400).json({error: "Missing description"}); 
    
    if (status) {
        const taskStatus = status.toLowerCase(); 
        if (taskStatus !== "pending" && taskStatus !== "completed") return res.status(400).json({error: 'Invalid status! \nMust be \"Pending\" or \"Completed\". '});
    } 
    else return res.status(400).json({error: "Missing status"}); 

    next(); 
}; 

const validateUpdateTask = (req, res, next) => {
    const {status} = req.body; 

    if (status) {
        const taskStatus = status.toLowerCase(); 
        if (taskStatus !== "pending" || taskStatus !== "completed") return res.status(400).json({error: "Invalid status! \nMust be \"Pending\" or \"Completed\". "});
    } 
    
    next(); 
}; 


// GET all tasks 
const getAllTasks = (req, res) => {
    res.status(200).json(tasks); 
};

// GET one task 
const getOneTask = (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({error: `Task with id ${req.params.id} not found`});
    res.status(200).json(task); 
}; 

// POST create a task 
const createTask = (req, res) => {
    const newTask = {
        id: tasks.length + 1, 
        ...req.body 
    }; 
    tasks.push(newTask); 
    res.status(201).json(newTask);
}; 

// PUT update a task 
const updateTask = (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);  
    if (!task) return res.status(404).json({error: `Task with id ${req.params.id} not found`}); 
    Object.assign(task, req.body); 
    res.status(200).json(task); 
}; 

// DELETE a task 
const deleteTask = (req, res) => {
    const iniLength = tasks.length; 
    tasks = tasks.filter((t) => t.id !== parseInt(req.params.id)); 
    if (tasks.length === iniLength) return res.status(404).json({error: `Task with id ${req.params.id} not found`}); 
    res.status(204).send();
}; 


app.get("/api/tasks", getAllTasks); 
app.get("/api/tasks/:id", getOneTask); 
app.post("/api/tasks", validateCreateTask, createTask); 
app.patch("/api/tasks/:id", validateUpdateTask, updateTask); 
app.delete("/api/tasks/:id", deleteTask); 

const errorHandler = (err, req, res, next) => {
    res.status(500).json({error: "Server error!"}); 
};
app.use(errorHandler); 

const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
}); 