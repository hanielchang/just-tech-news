const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});


const app = express();
// This PORT statement is required for Herkou functionality
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// This code sets up an Express.js session and connects the session to our Sequelize database. 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

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