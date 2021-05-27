const express = require('express')
const path = require('path')
const conv = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

const app = express()

app.set('view engine', 'ejs')
app.set('views ', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, err => {
    if (err) {
        console.log('Não foi possível tornar online o servidor', err)
    } else {
        console.log('ConverMyMoney Online')
    }
})

app.get('/', async(req, res) => {
    const cot = await apiBCB.getCotacao()
    res.render('home', {
        cotacao: cot
    })
})

app.get('/cotacao', (req, res) => {

    const {cotacao, qtde} = req.query

    if (cotacao && qtde) {

        const val = conv.convert(qtde, cotacao)

        res.render('cotacao', {
            cotacao: conv.toQuote(cotacao), 
            qtde: conv.toMoney(qtde), 
            val: conv.toMoney(val),
            err: false
        })
         
    } else {

        res.render('cotacao', {
            err: true
        })        

    }

})
