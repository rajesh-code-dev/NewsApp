const { user } = require('../models/food')
const mongoose = require('mongoose');
const { main } = require('./database.js');

const restApi = (app) => {

    // creating user
    app.post('/register', async (req, res) => {
        // const name = req.body.name;
        // const username = req.body.username;
        // const password = req.body.password;

        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        };

        // console.log('Received registration data:', name, username, password);

        // const userSchema = new user({ name: name, username: username, password: password });
        const database = await main();
        const result = await database.collection('users').insertOne(data);
        try {

            // await userSchema.save();
            console.log('User saved successfully!');
            res.json({ status: 'success' });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ status: 'error', message: 'Failed to create user' });
        }
    });


    // get user to match existing user
    app.get('/matchUser', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('users').find({});
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    

    //get technology news 
    app.get('/technology', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('technology').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/fitness', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('fitness').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/sports', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('sports').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/food', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('food').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/politics', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('politics').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    app.get('/entertainment', async (req, res) => {
        try {
            const database = await main();
            const result = await database.collection('entertainment').find({}).toArray(); // Convert the cursor to an array
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //userlogin
    app.post('/user/login', async (req, res) => {
        if (req.session.userId) {
            res.send({ status: 'error', message: 'user already login' });
        } else {
            try {
                const user = {
                    username: req.body.username,
                    password: req.body.password,
                };
    
                const database = await main();
                const result = await database.collection('users').findOne(user);
                if (result) {
                    req.session.userId = result._id;
                    res.json({ result: 'SUCCESS', userId: result._id , username: result.name});
                } else {
                    res.json({ result: 'ERROR', message: 'Invalid username or password' });
                }
            } catch (error) {
                console.error(error);
                res.json({ result: 'ERROR', message: 'Failed to login' });
            }
        }
    });

    // delete data
    // app.delete('/delete', async (req, res) => {
    //     try {
    //         const result = await foodModel.deleteOne({});
    //         res.send(result)
    //     } catch (error) {
    //         res.send(error)
    //     }
    // })


    app.post('/articles', async (req, res) => {
        try {
            const data = {
                urlToImage: req.body.urlToImage,
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                link: req.body.link,
            };

            const database = await main();
            const result = await database.collection('savedArticles').insertMany([data]);
            res.json({
                result: 'SUCCESS',
                message: 'Customer details inserted successfully.',
                alert: 'success',
            });
        } catch (e) {
            console.error(e);
            res.json({ result: 'ERROR', message: 'Failed to insert customer details.' });
        }
    })

    app.get('/savedArticles', async (req, res) => {
        try {
            const database = await main()
            const result = await database.collection('savedArticles').find({}).toArray();
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    })

}

module.exports = restApi