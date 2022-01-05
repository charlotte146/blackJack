let express = require('express');
let bodyparser = require('body-parser');

let app = express();
let port = 3000;

app.set('view engine', 'ejs');


app.listen(port, () => {
	console.log('Le serveur est en route');
	console.log(`Serveur listening at http://localhost:${port}`);
});

app.use('/js' , express.static(__dirname+ '/node_modules/bootstrap/dist/js' ));
app.use('/js' , express.static(__dirname+ '/node_modules/jquery/dist'       ));
app.use('/js' , express.static(__dirname+ '/node_modules/@popperjs/core/dist/umd'));
app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));

app.use('/views', express.static(__dirname + '/views')); //redirect views
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
/*
app.get('/', (req, res, next) => {
	res.send('Au revoir!');
});

app.use(express.static(__dirname+'/www'));


app.get('/', (req,res,next) => {
	res.sendFile('/www/index.html');
});*/

/*----- Classe Joueur -----*/

let nbPlayer = 0 ;
let players = [] ;
let playersState = [players.length] ;

class Player {
	
    constructor(pseudo) {
		
        this._pseudo = pseudo;
		this._cards = [];
		this._cardsValue = 0;

		if (pseudo == "Croupier") { this._tokens = 1000000; } else { this._tokens = 1000; }

		this._numPlayer = nbPlayer++;
		this._state = 'playing';
    }

    set pseudo(new_pseudo)         { this._pseudo = new_pseudo 		   ; }
	set cards(new_cards)           { this._cards = new_cards 		   ; }
	set cardsValue(new_cardsValue) { this._cardsValue = new_cardsValue ; }
	set tokens(new_tokens) { this._tokens = new_tokens ; }
	set state(new_state) { this._state = new_state ; }

    get pseudo() 	 { return this._pseudo     ; }
	get cards()  	 { return this._cards      ; }
	get cardsValue() { return this._cardsValue ; }
	get tokens() 	 { return this._tokens     ; }
	get cardsValue() { return this._cardsValue ; }

	addCard() {	
		let newCard = Math.floor(Math.random()*10)+1;
		this._cards.push(newCard); 
		console.log(this._cards[0]);
		this._cardsValue = this.calcCardsValue();
	 }

	resetCards() { for (let i = 0 ; i > this._cards.length ; i++) { this._cards.pop() } this._cardsValue = 0; }

	setOkStatus() { this._state = 'ok'; };

	calcCardsValue() { 
		let res = 0;
		for (let i = 0 ; i < this._cards.length ; i++) { res += this._cards[i]; } 

		return res;
	}

	toString() { 
		let res = `Player n°${this._numPlayer} | Pseudo : ${this._pseudo} | Tokens : ${this._tokens} \n Cards :`;

		for (let i = 0 ; i < this._cards.length ; i++) { res += `${this._cards[i]} |`; } 
		res += `\n cardsValue : ${this._cardsValue}`;
		return res;
	}
}

function addPlayer(pseudo) { let tmp = new Player(pseudo); players.push(tmp); }

function isLoose() { for (let i = 0 ; i < players.length ; i++) { if (this._cardsValue > 21) {playersState[i] = 'loose' } } }

function showPlayers() { for (let i = 0 ; i < players.length ; i++) { console.log (players[i].toString()) } }

addPlayer("Croupier");

addPlayer("Clement");
players[1].addCard();
players[1].addCard();

addPlayer("Charlotte");
addPlayer("Cedric");

showPlayers();

/*-------------------------*/
/*
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


*/



