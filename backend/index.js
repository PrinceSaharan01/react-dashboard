const express = require('express');
require('./db/config');
const cors = require('cors')
const User = require('./db/User')
const Product = require('./db/Product')
const app = express();
app.use(cors())
app.use(express.json());
const Jwt = require('jsonwebtoken')
const jwtKey = "satta"


app.post('/signup', async (req, resp) => {
    // console.log(req.body)
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();       //convert result into object
    delete result.password  // hides password  
    console.log(result);
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {

        if (err) {
            resp.send({ Reuslt: 'Error Occured' })
        }
        else {

            resp.send({ result, token });
        }
    })

})

app.post('/login', async (req, resp) => {

    if (req.body.email && req.body.password) {

        let user = await User.findOne(req.body).select('-password');   // select(-password) removes the password to gets printed
        if (user) {

            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                resp.send({ user, token });

            })


        } else {

            resp.send({ result: 'User Not Found Please SignUp' })
        }

    } else {
        resp.send({ result: 'User Not Found Please SignUp' })
    }

})


app.post('/add-product', verifyToken,  async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get('/products', verifyToken,  async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: 'No Product Found....' })
    }
})

app.delete('/product/:id', verifyToken,  async (req, resp) => {
    // resp.send(req.params.id)
    const result = await Product.deleteOne({ _id: req.params.id });
    console.log(result);
    resp.send(result)

})

app.get('/product/:id', verifyToken,  async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: 'No Data Found' })
    }

})


app.put('/product/:id', verifyToken,  async (req, resp) => {
    const result = await Product.updateOne({ _id: req.params.id }, {
        $set: req.body

    })
    resp.send(result)
})
app.get('/search/:key', verifyToken,  async(req, resp) => {
    let result =  await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { brand: { $regex: req.params.key } }
        ]
    })
    resp.send(result);
})




function verifyToken(req, resp, next) {


    let bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ Result: 'Provide Provide Valid Token' })
            } else {
                next();
            }
        })

    } else {
        resp.status(403).send({Result:"Error Occured"})
        
    }
}

app.listen(5500);