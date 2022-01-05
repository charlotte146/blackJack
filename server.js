let express = require('express');
let bodyparser = require('body-parser');
const e = require('express');
const prompt = require("prompt-sync")();

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

	setOkStatus() { this._state = 'ok'; }
	showStatus() { console.log(this._state); }

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

function showPlayers() { for (let i = 0 ; i < players.length ; i++) { console.log (players[i].toString()) } }

function newTurn() {
	for(let i = 0 ; i < players.length ; i++) {
		players[i].resetCards();
	
		for(let i = 0 ; i < players.length ; i++) {
			players[i].addCard();
			players[i].addCard();
		}
	};

	for(let i = 1 ; i < players.length ; i++) {

		while(players[i].state != "ok" || players[i].state != "loose") {
			players[0].toString();
			players[i].toString();
			const choice = prompt("que souhaitez vous faire ? Nouvelle carte (C) ? C'est bon (O) ?");
			switch(choice) {
				case "O": players[i].addCard(); break;
				case "N": players[i].setOkStatus(); break;
			
				default:
					break;
			}
		}
	};

	while(players[0].state != "ok" || players[0].state != "loose") {
		if (players[0].cardsValue < 17 && players[0].state != "loose") {
			players[0].addCard();
		}
		else {
			players[0].setOkStatus();
		}
	}
	/*calcRes()*/
}

addPlayer("Clement");
addPlayer("Charlotte");
addPlayer("Cedric");

showPlayers();

/*-------------------------*/

/*------ Tour de jeu ------*/


while(true) { newTurn(); }

/*-------------------------*/
/*
app.get('/', (req, res, next) => {
	res.render('index.ejs', {monobjet : myobject});
});


app.post('/test', (req,res,next) => { 
	console.log(req.body.name);
	res.render('index.ejs', {monobjet : myobject});
});
*/