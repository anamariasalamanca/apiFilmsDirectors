const express = require('express');
const cors = require("cors");
const logger = require("morgan");
const { connect } = require("./config/database");
require("dotenv").config

const colDirectorsRoutes = require("./api/routes/colDirectors.routes");
const intDirectorsRoutes = require("./api/routes/intDirectors.routes");
const userRoutes = require("./api/routes/user.routes");

const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dt8mhidrr', 
    api_key: '154339523495567', 
    api_secret: 'eppe8XvbKyqXQILplwBzqcdsB38' 
  });

const PORT = process.env.PORT;
const server = express();
connect();



//HEADERS-CABECERAS
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//CORS
server.use(
    cors({
      origin: "*", //se pone la pagina desde la que quiero que accedan por medio de un array, pero si pongo asterisco todo el mundo puede usar mi api
      credentials: true,
    })
);


//DEFINO LA SECRETKEY
server.set("secretKey", "supercalifragilisticuespialodoso");

//Logger
server.use(logger("dev"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/colDirectors", colDirectorsRoutes);
server.use("/intDirectors", intDirectorsRoutes);
server.use("/user", userRoutes);


server.listen(PORT, () => {
    console.log(`Server listeningon port http://localhost:${PORT}`);
});

