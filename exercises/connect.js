import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.log("Not able to connect to MongoDB", error);
  })
}

export default connect;
