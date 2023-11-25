const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    id: Number,
    title: String,
    content: String,
})

module.exports = {
    mainModel: model("mains", postSchema),
};
