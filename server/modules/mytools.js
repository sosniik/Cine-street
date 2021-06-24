require('dotenv').config()
const mydate = require('./mydate')
const myloop = require('./myloop')
const fs = require('fs')
const fetch = require('node-fetch')
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
})
module.exports = {
    films: (path, func)=>{
        fs.readFile(path, 'utf8', function(err, data) {
            if(err) throw err
            let json = JSON.parse(data)
            json.insertAllFilms = ()=>{
                let json = JSON.parse(data)
                let count = 0
                myloop.waitingLoop(json, async (i, json)=>{
                    let currentFilm = {name: json[i].fields.nom_tournage, coords: {x: json[i].fields.coord_x, y: json[i].fields.coord_y}}
                    if(typeof(json[i]) != "undefined"){
                        fetch(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${json[i].fields.nom_tournage}`)
                        .then(async (res) => {
                            return res.json()
                        }).then(async (json)=>{
                            if(json.results[0] && json.results[0].poster_path != null){
                                count++
                                knex('films').insert({titre: currentFilm.name, 
                                                    description: json.results[0].overview, 
                                                    image_url: `http://image.tmdb.org/t/p/w500/${json.results[0].poster_path}`, 
                                                    date_sortie: json.results[0].release_date, 
                                                    date_maj: mydate.getTimeNow(), 
                                                    coords: JSON.stringify(currentFilm.coords)})
                                .then(function(res){
                                    console.log(`count / ${Object.keys(JSON.parse(data)).length}`)
                                })
                                .catch(err)
                            }
                        }).catch()
                    }
                })
            }
            func(json)
        })
    }
}