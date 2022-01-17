let express = require('express');
let bodyparser = require('body-parser');
const e = require('express');

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

/*----- Classe Joueur -----*/

const status = ["playing","ok","loose","equality","win"];

let nbPlayer = 0 ;
let players = [] ;

class Player {
	
    constructor(pseudo) {
		
        this._pseudo = pseudo;
		this._cards = [];
		this._cardsValue = 0;

		this._numPlayer = nbPlayer++;
		this._state = 'playing';
    }

    set pseudo(new_pseudo)         { this._pseudo = new_pseudo 		   ; }
	set cards(new_cards)           { this._cards = new_cards 		   ; }
	set cardsValue(new_cardsValue) { this._cardsValue = new_cardsValue ; }
	set state(new_state) { this._state = new_state ; }

    get pseudo() 	 { return this._pseudo     ; }
	get cards()  	 { return this._cards      ; }
	get cardsValue() { return this._cardsValue ; }
	get cardsValue() { return this._cardsValue ; }

	//ajout d'une carte à la main du joueur
	addCard() {	
		let newCard = Math.floor(Math.random()*10)+1;
		this._cards.push(newCard); 
		this._cardsValue = this.calcCardsValue();
	}

	//remise à zéro de la main des joueurs
	resetCards() { for (let i = 0 ; i > this._cards.length ; i++) { this._cards.pop() } this._cardsValue = 0; }

	//modification du statut d'un joueur parmi ceux établis dans le tableau status
	setStatus(new_status) { 
		for (let i = 0 ; i < status.length ; i++) {
			if (new_status == status[i]) {
				this._state = new_status;
			}
		}
	}

	showStatus() { console.log(this._state); }

	//calcul du total de la main de chaque joueur
	calcCardsValue() { 
		let res = 0;
		for (let i = 0 ; i < this._cards.length ; i++) { res += this._cards[i]; } 
		return res;
	}


	//affichage console des joueurs (uniquement debug)
	toString() { 
		let res = `Player n°${this._numPlayer} | Pseudo : ${this._pseudo} | Tokens : ${this._tokens} \n Cards :`;

		for (let i = 0 ; i < this._cards.length ; i++) { res += `${this._cards[i]} |`; } 
		res += `\n cardsValue : ${this._cardsValue}`;
		return res;
	}
}

//Ajout d'un joueur à la liste => bouton à implémenter sur l'interface
function addPlayer(pseudo) { let tmp = new Player(pseudo); players.push(tmp); }


//Suppression d'un joueur 
function removePlayer(pseudo) {
	for (let i = 0 ; i < players.length ; i++) { 
		if (players[i]._pseudo == pseudo) {
			players.splice(i,1);
		}
	 } 
}


//comportement complet d'un tour de jeu
function newTurn() {

	//remise à zéro de la main et du statut de chaque joueur au début du tour puis distribution de deux cartes à chacun d'entre eux
	for(let i = 0 ; i < players.length ; i++) {
		players[i].resetCards();
		players[i].setStatus("playing");
	
		for(let i = 0 ; i < players.length ; i++) {
			players[i].addCard();
			players[i].addCard();
		}
	};

	//gestion du tour des joueurs
	for(let i = 1 ; i < players.length ; i++) {
		
		while(players[i].state != "ok" || players[i].state != "loose") {
			//ici faire la demande d'action du joueur ("nouvelle carte / s'arreter") => variable choice 
			/*
			.
			.
			.
			.
			.			
			*/ 
			switch(choice) {
				case "O": players[i].addCard(); break;
				case "N": players[i].setStatus("ok"); break;
			
				default:
					break;
			}
		}
	};

	//gestion du tour du croupier après celui de tout les joueurs
	while(players[0].state != "ok" || players[0].state != "loose") {
		if (players[0].cardsValue < 17 && players[0].state != "loose") {
			players[0].addCard();
		}
		else {
			players[0].setStatus("ok");
		}
	}

	//changement des statuts des joueurs selon leur résultat comparé à celui du croupier
	for(let i = 1 ; i < players.length ; i++) {
		
		if (players[i]._state == "ok") {
			if (players[i]._cardsValue > players[0]._cardsValue) {
				players[i].setStatus("win");
			}
			else {
				if (players[i]._cardsValue == players[0]._cardsValue) {
					players.setStatus("equality");
				}
				else {
					if (players[i]._cardsValue < players[0]._cardsValue) {
						players.setStatus("loose");
					}
				}
			}
		}	
	};
	
}

//appel en "dur" pour simuler le croupier, mais qui se comporte comme un joueur dans les faits.
addPlayer("Croupier");

/*-------------------------*/

/*------ Tour de jeu ------*/

while(true) { newTurn(); }

/*-------------------------*/
