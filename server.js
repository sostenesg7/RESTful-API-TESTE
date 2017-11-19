var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var porta = 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var dir = __dirname + '/public/'
app.use('/static/' , express.static(dir))

//console.log('dir: ' + __dirname + '/public/')

var server = app.listen(porta, ()=>{
	console.log('Server iniciado ' + server.address().address + server.address().port)
})

app.get('/',(req, res)=>{
	res.send('API de testes - req')
})

app.get('/grafico', (req, res) => {
  res.sendFile(dir + 'views/grafico.html');
})

app.get('/dados', (req, res)=>{
	var dados =  [
		{value: 25, label: 'agua'},
		{value: 40, label: 'energia'},
		{value: 30, label: 'gas'},
		{value: 5, label: 'internet'}
		]
	res.send(JSON.stringify(dados))
})

app.get('/random', (req, res)=>{
	var dados =  [
					{ year: '2008', value: randVal(20)},
					{ year: '2009', value: randVal(20)},
					{ year: '2010', value: randVal(20)},
					{ year: '2011', value: randVal(20)},
					{ year: '2012', value: randVal(20)}
				]
	res.send(JSON.stringify(dados))
})

app.get('/admin', (req, res) => {
  res.sendFile(dir + 'views/index.html');
})


app.get('/random_unico', (req, res)=>{
	var dados =  { year: ''+randVal(2000)+'', value: randVal(20)}
	res.send(JSON.stringify(dados))
})

function randVal(intervalo){
	return Math.floor((Math.random()*intervalo)+1)
}