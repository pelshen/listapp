import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Item = new Schema({
    name: String,
    description: String,
    keywords: [String]
});

export default mongoose.model('Item', Item);