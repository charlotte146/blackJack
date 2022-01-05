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

class ajtcarte{
	this.cards.push(valeur[Math.random(valeur.length)]);

}



//	prends au hasard une carte dans le paquet (le tableau)
//	prends 4fois le tableau = 1jeu 

var valeur = {"as" : 1,
			"deux" : 2,
			"trois" : 3,
			"quatre" : 4,
			"cinq" : 5,
			"six" : 6,
			"sept" : 7,
			"huit" : 8,
			"neuf" : 9,
			"dix" : 10,
			"valet" : 10,
			"dame" : 10,
			"roi" : 10, 
			"as": 11
			};



// class Joueur {
// 	constructor(nom, numero){
// 		this.pseudo=pseudo;
// 		this.numero=numero;

// 	}
// }

console.log=valeur;


//body = contenu de la requete, 
//name = nom du champ du formulaire






