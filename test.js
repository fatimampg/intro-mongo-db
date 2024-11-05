const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/todos',  {
        useNewUrlParser: true
      }) //returns a promisse
}

const student = new mongoose.Schema({
    // firstName: String,
    firstName: {
        type: String,
        required: true,  // validation
        unique: true //unique index (not a validation)
    },
    faveFoods: [{type: String}],
    info: {
        school: {
            type: String,
        },
        shoeSize: {
            type: Number,
        }
    }
}, { timestamp: true}) //add timestamp if wanted

// convert schema into a mongoose model (Student model)  (and that model will create a collection):
const Student = mongoose.model('student', student) //don't pluralize and lower case

connect()
    .then(async connection => {
        const student = await Student.create({ firstName: 'Tim' });
        console.log(student) //student is a mongoose document (not a JS obj), with specific methods and properties (but not ennumerable). 
        //Note: mongo just saves and return JSON. Mongoose(on top of mongo) and provides several types of tools and methods)
        const found = await Student.find({ firstName: 'Tim' })
        const foundAll = await Student.find({}) //wild card
        const foundById = await Student.findById('sdkasda')
        const deleted = await Student.findByIdAndDelete('sdkasda')
        const updated = await Student.findByIdAndUpdate('sdkasda', {firstName: 'Ann'})
        
    })
.catch(e => console.error(e))