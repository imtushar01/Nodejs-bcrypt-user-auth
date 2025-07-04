const express = require('express');
const app = express()

const bcrypt = require('bcrypt');

app.use(express.json())

const users = []

app.get('/users', (req,res) => {
    res.json(users)
})

// app.post('/users', (req, res) => {
//     const user = {
//         name: req.body.name,
//         password: req.body.password
//     }
//     users.push(user)
//     res.status(201).send(201)
// })

app.post('/users', async(req, res) => {
    try{
        // const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        // console.log(salt);
        // console.log(hashedPass);
        const user = {
            name: req.body.name,
            password: hashedPass
        }
        users.push(user)
        res.status(201).send(201)
    } catch {
        res.status(500).send(500)
    }
})

app.post('/users/login', async(req,res) => {
    const user = users.find(user => user.name === req.body.name)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
             res.send('Logged In')
        }else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send(500)
    }
})

app.listen(3100 , () =>{
    console.log('Server up! (3100)');
})