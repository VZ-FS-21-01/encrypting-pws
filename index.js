// save practice
// Keine unverschlüsselten Passworter in der Datenbank speichern
require('dotenv').config()
var bcrypt = require('bcryptjs');
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
    .catch(err => console.log(err))

const User = require('./models/userModel')


app.post('/user/register', (req, res) => {
    const email = req.body.email
    User.findOne({ email })
        .then(result => {
            if (!result) {
                // console.log(req.body)
                const user = new User(req.body)
                console.log(user.password)
                bcrypt.genSalt(10, (err, salt) => {
                    // Versalzen das User Passwort
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        // Ersetzen das bisherige Passwort durch das verschlüsselte
                        user.password = hash
                        user.save()
                            .then(result => res.json(result))
                            .catch(err => console.log(err))
                    })
                })
            } else {
                res.json({ message: "Email already in use" })
            }
        })

})

app.post('/user/login', (req, res) => {
    const email = req.body.email
    const plainpass = req.body.password
    // User.findOne({ email: email })
    User.findOne({ email })
        .then(result => {
            if (result) {
                bcrypt.compare(plainpass, result.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.json({ message: "Matched" })
                        } else {
                            res.json({ message: "No Match :-/" })
                        }
                    })
            } else {
                res.json({ message: "Mail not found." })
            }

        })
        .catch(err => console.log(err))
})