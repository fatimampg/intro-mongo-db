import mongoose from 'mongoose'
import cuid from 'cuid';
import connect from './exercises/connect';

const url = 'mongodb://localhost:27017/intro-mongodb-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

beforeEach(async () => {
  const db = cuid();
  const collections = mongoose.connection.collections;

  async function clearDB() {
    for (let i in collections) {
      await collections[i].deleteMany()
    }
  }

  if (mongoose.connection.readyState === 0) {
      await connect(url + db)
    }
      await clearDB()
  });
 

afterEach(async () => {
  await mongoose.disconnect()
})
// afterAll(done => {
//   return done()
// })
