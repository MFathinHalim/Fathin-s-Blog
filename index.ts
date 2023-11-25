const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const { mainModel } = require("./models/post");
require("dotenv").config();
//Import Finish
//Setup Default server
const server = express();
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "/public")));
server.use(bodyParser.json());
server.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
//Setup Default server Finish
//Initialize Data
interface Data {
    id: number;
    title: string;
    content: string;
}
let data: Array<Data>;

//Initialize Data Finish
//Setup Server Get Router
server.get("/", (req,  res) => {
    res.render("home", {
    	data: data,
    });
});
server.get("/article/:id", (req, res) => {
    const articleId:number  = req.params.id as number;
    const article = data.find((obj) => obj.id == articleId);
    //Render the page
    res.render("details", {
        data: article,
    })
})
server.get("/post", (req, res) => {
    res.render("add");
});
//Setup Server Get Router Finish
//Setup Server Post Router
server.post("/post", async (req, res) => {
	const id = data.length + 1
   	data.push({
    	id: id,
		title: req.body.title,
		content: req.body.content,
    });
    await mainModel.create({
        id: id,
        title: req.body.title,
        content: req.body.content,
    });
    res.redirect(`/article/${id}`);
});
//Setup Server Post Router Finish
//Run The Server
const port:number = 3000;
const URI = process.env.MONGODBURI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    mainModel.find({}, null).then((res) => {
        data = res;
        server.listen(port, () => {
            console.log(`server is running on ${port}`);
        });
    });
});
//Run The Server Finish
//Script is Finish
//Script Made By M.Fathin Halim
