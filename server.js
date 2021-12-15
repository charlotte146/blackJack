let express = require('express');
let app = express();

let port = 3000;

let myobject = {nom: "monobjet", valeur: 10};

let bodyparser = require('body-parser');


app.set('view engine', 'ejs');


app.listen(port, () => {
	console.log('Le serveur est en route');
	console.log(`Serveur listening at http://localhost:${port}`);
});
/*
app.get('/', (req, res, next) => {
	res.send('Au revoir!');
});

app.use(express.static(__dirname+'/www'));


app.get('/', (req,res,next) => {
	res.sendFile('/www/index.html');
});*/

app.use('/js' , express.static(__dirname+ '/node_modules/bootstrap/dist/js' ));
app.use('/js' , express.static(__dirname+ '/node_modules/jquery/dist'       ));
app.use('/js' , express.static(__dirname+ '/node_modules/@popperjs/core/dist/umd'));
app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));

app.use('/views', express.static(__dirname + '/views')); //redirect views
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


app.get('/', (req, res, next) => {
	res.render('index.ejs', {monobjet : myobject});
});


app.post('/test', (req,res,next) => { 
	console.log(req.body.name);
	res.render('index.ejs', {monobjet : myobject});
});

//body = contenu de la requete, name = nom du champ du formulaire






