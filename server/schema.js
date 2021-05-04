import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    room: String,
    chat: [{ input: String, user: String}]
})

var PostArticle = mongoose.model('PostArticle', articleSchema);

export default PostArticle;
