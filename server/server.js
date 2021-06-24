require('dotenv').config()
const mydate = require('./modules/mydate')
const express = require('express')
const path = require('path')
const mytools = require('./modules/mytools')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const uniqid = require('uniqid')
const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_ID, process.env.MAILJET_API_SECRET)

const PORT = process.env.SERV_PORT || 3306;
console.log(__dirname)
// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.static(buildPath));

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
})
app.use(cors({origin:true}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set(`view engine`, 'ejs')
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

app.get('/getFilms', (req, res) => {
    knex.select('*').from('films').then((rows)=>{
        let data = []
        for (rows of rows){
            // console.log(`${mydate.infoDate(rows.name).getDay()}`)
            // console.log(`${rows.titre}`)
            data.push(rows)
        }
        return data
    })
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        if(err) throw err
    })
})

app.get('/viewAllFilms', (req, res) => {
    knex.select('*').from('list-films').then((rows)=>{
        let data = []
        for (rows of rows){
            // console.log(`${mydate.infoDate(rows.name).getDay()}`)
            // console.log(`${rows.titre}`)
            data.push(rows)
        }
        return data
    })
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        if(err) throw err
    })
})

app.get('/getUsers', (req, res) => {
    knex.select('*').from('users').then((rows)=>{
        let data = []
        for (rows of rows){
            // console.log(`${mydate.infoDate(rows.name).getDay()}`)
            // console.log(`${rows.titre}`)
            data.push(rows)
        }
        console.log(data)
        return data
    })
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        if(err) throw err
    })
})

app.post('/getUser', (req, res) => {
    let emailUser = req.body.email
    let passwordUser = req.body.password
    if (emailUser !== undefined && passwordUser !== undefined) {
    knex.where({email : emailUser, password : passwordUser}).select('*').from('users').then((rows)=>{
        let data = []
        for (rows of rows){
            // console.log(`${mydate.infoDate(rows.name).getDay()}`)
            // console.log(`${rows.titre}`)
            data.push(rows)
        }
        return data
    })
    .then((result)=>{
        if(result.length === 1) {
            res.send({token: uniqid()})
        }
    })
    .catch((err)=>{
        if(err) throw err
    })
    }
    else {
        res.send('erreur here')
    }
})

app.get('/insertFilms', (req, res)=>{
    mytools.films(`${__dirname}/tournage.json`, (data)=>{
        data.insertAllFilms()
        res.send('insertion des données en cours, consultez les logs pour voir quand le téléchargement est terminé.')
    })
})

app.post('/insertUser', (req, res) => {
    let userEmail = false
    knex.select('*').from('users').then((rows)=>{
        let data = []
        
        for (rows of rows){
            // console.log(`${mydate.infoDate(rows.name).getDay()}`)
            // console.log(`${rows.titre}`)
            if(rows.email == req.body.email){
                userEmail = true
            }
            data.push(rows)
        }
        return data
    })
    .then((result)=>{
        if(!userEmail){
            knex('users').insert({nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, password: req.body.password, date_ajout: mydate.getTimeNow()}).then((err)=>{
                const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                  "Messages":[
                    {
                      "From": {
                        "Email": process.env.EMAIL_FROM,
                        "Name": "CINE-STREET"
                      },
                      "To": [
                        {
                          "Email": req.body.email,
                          "Name": req.body.nom
                        }
                      ],
                      "Subject": "Bienvenu chez CINE-STREET.",
                      "HTMLPart": `<h3>Un nouveau membre d'équipage !</h3><p>Bonjour ${req.body.prenom} ${req.body.nom} et merci de faire confiance à cine-street.</p><p>Ta demande d'inscription a été validé, bravo !</p>`,
                      "CustomID": "AppGettingStartedTest"
                    }
                  ]
                })
                request
                  .then((result) => {
                    console.log(`email sent to ${req.body.email}`)
                    res.send({token: uniqid()})
                  })
                  .catch((err) => {
                    console.log(err.statusCode)
                  })
                
             }).catch((err)=>{
                 console.log(err)
             })
        }

    })
    .catch((err)=>{
        console.log(err)
    })
})

app.listen(process.env.SERV_PORT, () => {
  console.log(`App listening at PORT : ${PORT}`)
})