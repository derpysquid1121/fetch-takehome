const express = require('express');
const route = require('./pointsHandler.js');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use('/points', route)
app.get('/', (req, res) => res.send("Up and running just for you!"));

app.listen(
    PORT,
    () => console.log(`it's working! http://localhost:${PORT}`)
)
