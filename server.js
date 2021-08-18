const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache:true
    
})

server.get("/", function(req,res){
    const about = {
        avatar_url:"https://avatars.githubusercontent.com/u/62320094?v=4",
        name:"Henrique Maciel",
        role:"Programador Web",
        description:'Programador junior, em buscar de adquir a primeira experiencia no mercado',
        links: [
            {   name: "Github", url:"https://github.com/macielhenrique"},
            {   name: "Instragram", url:"https://www.instagram.com/macielhenriqueee/"},
            {   name: "Linkedin", url:"https://www.linkedin.com/in/henrique-maciel/"}
        ]
    }

    return res.render("about",{ about })
})

server.get("/portfolio", function(req,res){

    return res.render("portfolio", {items:videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
       return video.id == id
    })

    if(!video){
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video})
})
    server.listen(5000, function(){
        console.log("server is runnig")
    })