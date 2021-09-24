const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// Turn on connection to db and server. The "sync" part means that Sequelize is
// taking the models and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// If we change the value of the force property to true, then the database connection must 
// sync with the model definitions and associations. By forcing the sync method to true, 
// we will make the tables re-create if there are any association changes.