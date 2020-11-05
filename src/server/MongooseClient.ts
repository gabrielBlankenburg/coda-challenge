import mongoose from 'mongoose';

function connect() {
    mongoose.connect('mongodb://localhost:27017/codachallenge', {useNewUrlParser: true, useUnifiedTopology: true});
}

export default { connect };