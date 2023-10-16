const mongoose = require('mongoose')
mongoose.Promise= global.Promise

before((done)=>{

mongoose.connect('mongodb://127.0.0.1:27017/usertest',{
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology:true
 }) .then(() => {
    done()
  })
  .catch((error) => {
    done()
  });
})

beforeEach((done)=>{
mongoose.connection.collections.users.drop(()=>{
    done()
})
})

afterEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
        done()
    })
})

after((done)=>{
    mongoose.disconnect()
done()
})