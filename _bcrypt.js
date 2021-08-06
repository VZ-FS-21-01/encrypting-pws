
// Wir generieren das Salz, mit dem wir das Passwort dann verschlüsseln wollen
bcrypt.genSalt(10, (err, salt) => {
    // console.log(salt)
    // Passwort, salz, callback
    bcrypt.hash("123", salt, (err, hash) => {
        // console.log(hash)
    })
})

// Hier vergleich wir die usereingabe und das verschlüsselte Passwort in der Datenbank
bcrypt.compare("123", "$2a$10$1qWv5gOGjBex93rE7Nf/ZOXkI3xta7uF9KrKwUvwL/8shNJQ1Av7q")
    .then(isMatch => {
        console.log(isMatch)
    })