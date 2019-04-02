const express = require('express')
const router = express.Router()

//importando los models
const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    let formatDate = []
    for(task of tasks){
        if (task.date != ""){
            date = new Date(task.date);
            formatDate.push(`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`)
        }else{
            formatDate.push(null)
        }
    }
    //console.log(tasks);
    /*
    let formatDate = dates.map(date => {
        if (date !== null){
            return `${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`   
        }else{
            return ''
        }
    })*/
    res.render('index', {
        tasks,
        formatDate
    })
})

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
})

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    task.status = !task.status;
    await task.save();
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)
    res.render('edit', {
        task
    })
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params
    await Task.update({_id:id}, req.body)
    res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    await Task.remove({_id: id});
    res.redirect('/');
})


module.exports = router;