const express = require('express');
const cors = require ('cors');
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.json({message:"welcome to eric app"})
});

const PORT = process.env.PORT || 3000;

require('./routes/pin.routes')(app);
require('./routes/users.routes')(app);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`)
})