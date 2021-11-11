const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    let newRecipe = {title: 'Francesinha', 
                     level: 'Easy Peasy',
                     cuisine: 'Tuga',
                     image: 'https://www.pingodoce.pt/wp-content/uploads/2017/09/francesinha.jpg'}

    return Recipe.create(newRecipe)
  })
  .then(()=>{   
    return Recipe.insertMany(data)
  })
  .then(()=>{
    let query = {title: 'Rigatoni alla Genovese' };
    return Recipe.findOneAndUpdate(query, { $set: {duration: 100}}, {useFindAndModify: false})
  })
  .then(()=>{   
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((result)=>{   
    console.log('Recipe deleted')
  })
  .then(()=>{   
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
