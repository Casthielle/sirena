import mongoose from 'mongoose';

const initMongo = () => {
  mongoose.connect('mongodb://mongo:27017/ganymede-db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => console.log(' · BD CONNECTED'))
  .catch((error) => console.error("COÑODELAMADRE", error));
};

export default initMongo;
