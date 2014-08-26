enyo.kind({
	name: "App",
	kind: "Panels",
	fit: true,
	classes: "app-panels",
	arrangerKind: "CollapsingArranger",	
	components: [
		{name: "MyStartPanel", 	kind: "FittableRows",	classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", classes: "onyx-menu-toolbar", components: [
				{kind: "onyx.Grabber"},
				{name: "meineFilmeCount", content: "meine xxx Filme"},
				{name: "spinner", kind: "onyx.Spinner", classes: "onyx-dark", showing: false},
				{kind: "onyx.MenuDecorator", name:"einstellungen", onSelect: "configMenuSelected",  components: [
					{kind: "onyx.Button",  components: [
						{kind: "onyx.Icon", src: "assets/cogwheels-24.png", style: "height: 24px"}
					]},
					{kind: "onyx.Tooltip", content: "Einstellungen ..."},
					{kind: "onyx.Menu", floating: true, maxHeight: 400, components: [						
						{content: "Einstellungen..."},
						{content: "neue Filme..."},
						{content: "suchen..."},
						{classes: "onyx-menu-divider"},
						{content: "sortieren nach...",classes: "onyx-menu-label" },
						{content: "Alphabetisch"},
						{content: "Datum"},
						{content: "Dateigröße"},						
						{content: "IMDB-Bewertung"},

						{kind: "appConfigSheet", name: "configPopup", onClose: "updateConfig"  },
						{kind: "appNewFileSheet", name: "newFilePopup", onClose: "getNewFiles", multiple: true },

					]}
				]},
				{kind: "onyx.MenuDecorator", name:"loeschen", ontap:"doDeleteConfirm", style: "margin:0", showing: false, components: [
					{kind: "onyx.Button", components: [
						{kind: "onyx.Icon", src: "assets/trashbin.png" }
					]},
					{kind: "onyx.Tooltip", content: "Lösche Eintrag"},
					{kind:"appConfirmPopup", name: "confirmDel", onHide: "doDelete"}
				
				]},
				{kind: "onyx.Button", ontap:"loadDir", showing: false, components: [
					{content: "Load Dir"}
				]},				

			]},
			{kind: "FittableColumns", name: "Suchergebnis", /*classes:"onyx-toolbar-inline", */  showing: false, components: [
				{name: "Ergebnistext",  content: ""},
				
				{kind: "onyx.Button",   ontap: "searchback", style: "right: 0", components:[
					{content: "zurück"}
				]}

			]},
	    	{tag: "hr"},			
	     	{kind: "FittableColumns",  name: "suchEingabe", classes:"onyx-toolbar-inline", showing: false, components:[

     			    	{kind:"onyx.Input", name:"seachInput", placeholder: "Suche eingeben..",  style: "width: 60%; height: 20px", onkeyup: "keyUp", 	oninput: "input",},
						{kind: "onyx.Button", ontap:"closeSearch", components: [
							{kind: "onyx.Icon", src: "lib/onyx/images/search-input-cancel.png", style: "height: 20px"}
						]},



     			] 
     		},
     		
			{tag: "hr"},
			{kind: "FittableColumns", name: "Sucheingabe", classes:"onyx-toolbar-inline", showing: false, components: [
				{content: "Filme: "},
				//{kind: "onyx.Button", ontap:"loadJSON", components: [
				//	{content: "meine Filme"}
				//]},				
				{kind: "onyx.Button", ontap:"dbGetAll", showing: false,  components: [
					{content: "Load Database"}
				]},

				{kind: "onyx.Input",  name:"query", placeholder: "Suche eingeben..", style: "width:300",/* value:'', onchange:"fetch"*/ }, 
				{kind: "onyx.Button", ontap:"search",  components: [
					{kind: "onyx.Icon", src: "assets/search-input-search.png"},
					{content: "Suchen.."}
				]}
			]},
			{kind: "Scroller", name:"suche", thumb: true, fit:true, style: "height: 100%", components: [
				{name: "filmListe", kind: "Repeater",  onSetupItem:"setupItem", components: [
					{name:"filmItem", classes:"repeater-sample-item enyo-fit", ontap: "itemTap", components: [
						{kind: "FittableColumns",   components: [
							{tag:"img", name: "filmImg", src:"", classes : "repeater-poster-klein"  },
							{kind: "FittableRows", components: [
								{ name: "filmNumber" },
								{ name: "filmJahr", classes: "year"}, 
								{ name: "filmName" , classes: "title"}
								
							]},
							{ tag:"img", name: "filmMarker", src:"assets/marker.png", classes: "repeater-zeiger-klein" }
						]}
					]}
				]}
			]},
			{kind: "Scroller", name:"meine", thumb: true,  fit:true, style: "height: 100%", components: [
				{name: "filmMyListe", kind: "Repeater",  onSetupItem:"setupMyItem", components: [
					{name:"filmMyItem", classes:"repeater-sample-item enyo-fit", ontap: "myitemTap", components: [
						{kind: "FittableColumns",   components: [
							{tag:"img", name: "filmMyImg", src:"", classes : "repeater-poster-klein"  },
							{kind: "FittableRows", fit: true,  components: [
								
								{ name: "filmMyDetail", classes: "year"}, 
								{ name: "filmFileName", classes: "file" },
								{ name: "filmMyName" , classes: "title",  showing: false},
								{kind: "FittableColumns", name:"filmMyInfo" , fit: true,  components: [
									{ name: "filmMyNumber", classes: "tmdbid" },
									{ name: "filmMySize", classes: "size", fit: true },
									{ name: "filmMyRateing", classes: "imdbRateing" }
								]}
							]},
							{ tag:"img", name: "filmMyMarker", src:"assets/marker.png", classes: "repeater-zeiger-klein",  showing: false}
						]}
					]}
				]}
			]}


		]},
		{name: "MyMiddlePanel", kind: "FittableRows",	classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", name: "details", classes: "onyx-menu-toolbar", components: [ 
				{kind: "onyx.Grabber"},
				{content: "Film Details"},
				{name: "spinner2", kind: "onyx.Spinner", classes: "onyx-dark", showing: false},
				{kind: "onyx.Button", name: "imdb",   components:[
					{kind: "enyo.Image", style: "width: 35px", src: "assets/imdb.png"},
					{name: "rating", content: "Bewertung"}
				]},
			]},
			{kind: "FittableColumns",  name: "update", classes:"onyx-toolbar-inline", showing: false, components: [
				{kind: "onyx.TooltipDecorator", /*name:"update", showing: false,*/ components: [
					{kind: "onyx.Button", classes: "onyx-affirmative",   ontap: "addInfo",  components:[
						{content: "Infos setzen oder updaten!"}
					]},
					{kind: "onyx.Tooltip", content: "Gefundene Informationen in Datenbank updaten!"}
				]},
				{kind: "onyx.TooltipDecorator",  /*name:"back",  showing: false,*/ components: [
					{kind: "onyx.Button", classes: "onyx-negative", /* fit:true, */ ontap: "back",  components:[
						{content: " zurück "}
					]},
					{kind: "onyx.Tooltip", content: "nicht Datenbank speichern und zurück!"}
				]}
			]},
			{name: "FilmDetails", 	kind: "Scroller", fit:true,  components: [
			    {kind: "onyx.Item", components: [
					
					{tag:"div", name: "filmTypeLandJahr", classes: "filmtype", fit:true},
					{tag: "br"},
					{tag:"div", name: "filmTitel", fit:true, classes: "title"},
					{tag: "br"},
					{tag:"div", fit:true, classes: "splot-titel", content: "Short_Plot:"},
					{tag:"div", name: "filmStoryShort",classes: "nice-padding", fit:true},
					{tag: "br"},
					{tag:"div", fit:true, classes: "actors-titel", content: "Actors:"},
					{tag:"pre", name: "filmActors", classes: "nice-padding", fit:true},
					{tag: "br"},
					{tag:"div", fit:true, classes: "actors-titel", content: "Crew:"},
					{tag:"pre", name: "filmCrew", classes: "nice-padding", fit:true}
				]}	
			]}

			
				
			
		]},
		{name: "MyLastPanel", classes: "enyo-fit", components: [			
			{kind: "onyx.Toolbar", classes: "onyx-menu-toolbar", components: [ 
				{kind: "onyx.Grabber"},
				{content: "Film Poster"}
			]},
			{kind: "FittableColumns", name: "Links", classes:"onyx-toolbar-inline",  /*showing: false,*/ components: [		
				{kind: "onyx.Item", name: "btnIMDBLink", classes: "onyx-button btn-link",/* style: "width: 50%",*/ showing: false, components:[
					{tag: "a", name: "imdbLink", content:"IMDB", attributes:{href:"http://enyojs.com"} }
				]},
				{kind: "onyx.Item", name: "btnWEBLink", classes: "onyx-button btn-link", /*style: "width: 50%",*/ showing: false, components:[
					{tag: "a", name: "filmLink", content: "Web", attributes:{href:"http://enyojs.com"} }
				]}
			]},
			/*
			{tag: "br"},
			{tag: "a", name: "filmLink", content:"Link!", attributes:{href:"http://enyojs.com"}, showing: false}, 
			{tag: "br"},
			{kind: "enyo.Image", name: "imdbImg", style: "width: 35px", src: "assets/imdb.png", showing: false},
			{tag: "a", name: "imdbLink", content:"Öffne Film auf IMDB!", attributes:{href:"http://enyojs.com"}, showing: false}, 
			//{kind: "enyo.Control", name: "filmLink", tag: "a", attributes: { href: "http://enyojs.com"; },	content: "Link to Enyo website" },
			*/
			{tag: "hr"},
			{tag:"img", name: "filmPoster", src:"", classes: "panel-poster" },
			{tag: "hr"}
		]},

	],

	filme: [],
	meineFilme: [],
	filmTitels:[],
	aktFilm: {},
	TMDBconfiguration: {},
	marker: 0,
	myMarker:-1,
	mySearchMarker:0,
	index:0,
	appConfiguration: {
		allowDel: false,
		allowEdit: false,
		sortMethodeOnStart: 0
	}, 


	create: function() {
		this.inherited(arguments);
	},
	
	rendered: function() {
		this.inherited(arguments);
		this.$.imdb.hide();
		this.$.suche.hide();
		this.getTMDBConfiguration();
       // this.$.filmMyListe.applyStyle("width", this.$.filmMyListe.hasNode().scrollWidth + "px");
       if( this.readCookie("SortMethode") ){
       		this.appConfiguration.sortMethodeOnStart =  this.readCookie("SortMethode") ;
       };

	},
	testIMDB: function(imdb_tt){
		var req = new XMLHttpRequest();
		var req = new enyo.Ajax({
				url: "http://www.stefan-keimeier.de/mt/get_imdb_rating.php?tt="+imdb_tt
		});
		req.go();
		req.response(this, "process_imdb");
		req.error(this, "processError");
	},
	process_imdb: function(inSender, inResponse){
		var rate = inResponse;
		this.$.rating.setContent(rate.ratingValue+"/10  bei "+rate.ratingCount+" Votes");
		this.$.imdb.show();
		this.aktFilm.imdbRating = rate.ratingValue;

		if(this.$.meine.getShowing()){
			var film = this.meineFilme[this.index];
			if(film.tmdbID && (film.imdbRating != rate.ratingValue) ){
				film.imdbRating = rate.ratingValue;
				this.dbChange(film.id,film);
			}
		}

	},
	drawFilmDetail: function(film) {
	    var textContent = '';
		this.aktFilm = film;		
		this.$.imdb.hide();
		this.$.filmLink.hide();
		this.$.btnIMDBLink.hide();
		this.$.btnWEBLink.hide();
		this.$.imdbLink.hide();
		this.$.filmPoster.hide();
		if(film.imdb_id){
			this.testIMDB(film.imdb_id);


		}
		for(var i in film.genres){
			textContent += film.genres[i].name + ", ";
		};
		textContent += ' / ';
		for(var i in film.production_countries){
			textContent += film.production_countries[i].iso_3166_1 + " ";
		}
		textContent += ' / ';
		textContent += film.release_date;
		textContent += ' / ';
		textContent += film.runtime + " min";

		this.$.filmTypeLandJahr.setContent(textContent);
		textContent = film.title;
		this.$.filmTitel.setContent(textContent);
		textContent = film.overview;
		this.$.filmStoryShort.setContent(textContent);
		textContent = "";
		for(var i in film.casts.cast){
			textContent += film.casts.cast[i].name;
			if(film.casts.cast[i].character){
				textContent += ' (als: ' + film.casts.cast[i].character +')';
			}
			textContent += ',\n';
		};
		this.$.filmActors.setContent(textContent);

		textContent = "";
		for(var i in film.casts.crew){
			
			if(film.casts.crew[i].job){
				textContent += film.casts.crew[i].job +': ' + film.casts.crew[i].name;
			}
			textContent += ',\n';
		};
		this.$.filmCrew.setContent(textContent);

		if(film.homepage){
			this.$.filmLink.setContent("Film im WEB: "+film.title);
			this.$.filmLink.setAttributes({href:film.homepage, target:"ID"+film.id});
			this.$.filmLink.show();
			this.$.btnWEBLink.show();
		}
 		if(film.imdb_id){
 			this.$.btnIMDBLink.show();
 			//this.$.imdbLink.setContent();
 			this.$.imdbLink.setAttributes({href:"http://www.imdb.com/title/"+film.imdb_id, target:film.imdb_id});

			this.$.imdbLink.show();
	
 		}
		this.$.filmPoster.show();


	},
	
	itemTap: function(inSender, inEvent) {
		var index = inEvent.index;
		if(index == this.mySearchMarker){ return; };
		var item = this.$.filmListe.controls[this.mySearchMarker];
		item.$.filmItem.setClasses("repeater-sample-item");
		item.$.filmMarker.hide();
		
		this.mySearchMarker = index;
		item = this.$.filmListe.controls[index];
		item.$.filmMarker.show();
		item.$.filmItem.setClasses("repeater-sample-item-marked");

		var id = this.filme[index].id;
		this.setPosterPage(this.filme[index]);
		
		this.getFilmDetails(id);
	},
	myitemTap: function(inSender, inEvent) {
		var index = inEvent.index;
		this.index = index;
		if(index == this.myMarker){ return; };
		if( this.myMarker == -1) {
			this.myMarker = this.index;
		}
		var item = this.$.filmMyListe.controls[this.myMarker];
		item.$.filmMyMarker.hide();
		item.$.filmMyItem.setClasses("repeater-sample-item");

		this.myMarker = index;
		item = this.$.filmMyListe.controls[index];
		item.$.filmMyMarker.show();
		item.$.filmMyItem.setClasses("repeater-sample-item-marked");
		var film = this.meineFilme[index];
		var ersatz = this.splitFullFileName(film.full_filename);

		var name = film.name ? film.name : ersatz.titel;

		//this.setPosterPage(this.filme[index]);
		if( film.tmdbID ){
			this.$.query.setValue("");
			this.getFilmDetails(film.tmdbID);
			this.setPosterPage(film);
		}else{
			this.$.loeschen.hide();	
			this.$.einstellungen.hide();
			this.$.meine.hide();
			this.$.meineFilmeCount.setContent("Suche ...")

			this.$.query.setValue(name);			
			this.getMyFilmAuswahl(name);		
		}

	},
	search: function() {
		var suche = this.$.query.getValue(name);
		this.$.meineFilmeCount.setContent("Suche ...")

		this.getMyFilmAuswahl(suche);		

	},
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;
		var film = this.filme[index];
		item.$.filmImg.setSrc( film.poster_path ? this.getPosterIcon(film) : "assets/no-poster-w92.jpg"  );
		item.$.filmName.setContent( film.title ? film.title : ' ');
		item.$.filmJahr.setContent( film.release_date ? film.release_date : " ");
		item.$.filmMarker.setShowing(index == 0 ? true : false);
		item.$.filmItem.setClasses(index == this.mySearchMarker ? "repeater-sample-item-marked" : "repeater-sample-item");
	},
	setupMyItem: function(inSender, inEvent) {
		var index = inEvent.index;
		this.index = index;
		var item = inEvent.item;
		var film = this.meineFilme[index];
		var ersatz = this.splitFullFileName(film.full_filename);

		item.$.filmMyMarker.setShowing(index == this.myMarker ? true : false);
		item.$.filmMyItem.setClasses(index == this.myMarker ? "repeater-sample-item-marked" : "repeater-sample-item");

		item.$.filmMyImg.setSrc( film.poster_path ? this.getPosterIcon(film) : "assets/no-poster-w92.jpg"  );
		if(film.origTitle){
			item.$.filmMyName.setContent( film.origTitle );
			item.$.filmMyName.show();
			item.$.filmFileName.hide();
		
		}else{
			item.$.filmFileName.setContent( film.origTitle ? film.origTitle : ersatz.titel);
			item.$.filmFileName.show();
			item.$.filmMyName.hide();
		};
		item.$.filmFileName.setContent( film.origTitle ? film.origTitle : ersatz.titel);
		item.$.filmMyDetail.setContent( film.detail ? film.detail : ersatz.detail);

		if(film.tmdbID){
			item.$.filmMyNumber.setContent(  "tmdb#: "+film.tmdbID);

			var size = film.size.split('.'); 
			var XByte = ["byte","kB","MB","GB","TB"];
			var fsize = size[0]+','+ size[1] + " " + XByte[size.length-1];
			item.$.filmMySize.setContent( fsize );
			item.$.filmMyRateing.setContent( "IMDB: " + film.imdbRating);
		}else{		
			item.$.filmMyNumber.setContent(this.getFileInfo(film));
		}
		return true;
	},
	getTMDBConfiguration: function() {
		var apiKey = 'd95d1f942d3f7bb15d036eb9e13b0182';
		var jsonp = new enyo.Ajax({
			//url:  'http://themoviedb.apiary.io/3/configuration',
			url: 'http://api.themoviedb.org/3/configuration', // ?api_key=' + api_key, + '&query=fight+club',
			callbackName: "callback"
		});
		// send parameters the remote service using the 'go()' method
		jsonp.go('api_key=d95d1f942d3f7bb15d036eb9e13b0182');
		
		// attach responders to the transaction object
		jsonp.response(this, "processTMDBConfig");
		this.$.spinner.start();
	},
	processTMDBConfig: function(inSender, inResponse) {
		// do something with it
		this.TMDBconfiguration = inResponse;
		this.dbGetAll();
		
	},
	doDeleteConfirm:  function(inSender,inEvent){

		this.$.confirmDel.show();
		//this.doDelete();
		return true;

	},
	doDelete: function(){
		var res = this.$.confirmDel.getDialogResult();
		if(res){
			var film = this.meineFilme[this.myMarker];
			if(film){
				this.dbDelete(film.id);
				var index = this.myMarker;
				var item = this.$.filmMyListe.controls[index];
				item.$.filmMyMarker.hide();
				item.$.filmMyItem.setClasses("repeater-sample-item");

				this.meineFilme.splice(this.myMarker,1);
				this.index = this.myMarker > 0 ? this.myMarker-1 : 0;
				this.myMarker = this.index;

				this.$.filmMyListe.setCount(this.meineFilme.length);
				this.$.meineFilmeCount.setContent("meine "+this.meineFilme.length + " Filme");

			}
		}
		return true;

	},

	getFilmDetails: function(filmID) {
		var apiKey = 'd95d1f942d3f7bb15d036eb9e13b0182';
		var jsonp = new enyo.Ajax({
			//url:  'http://themoviedb.apiary.io/3/movie/',
			url: 'http://api.themoviedb.org/3/movie/'+filmID, 
			callbackName: "callback",
			timeout: 3000
		});
		// send parameters the remote service using the 'go()' method
		jsonp.go(
			'api_key=d95d1f942d3f7bb15d036eb9e13b0182'+'&language=de'+'&append_to_response=casts'
		);
		
		// attach responders to the transaction object
		jsonp.response(this, "processFilmDetail");
		jsonp.error(this, "processError");
		this.$.spinner2.start();
	},
	getMyFilmAuswahl: function(filmName) {
		var apiKey = 'd95d1f942d3f7bb15d036eb9e13b0182';
		var jsonp = new enyo.Ajax({
			url: 'http://api.themoviedb.org/3/search/movie', 
			callbackName: "callback",
			timeout:5000
		});
		// send parameters the remote service using the 'go()' method
		jsonp.go(
			'api_key=' + apiKey + '&query=' + filmName + '&language=de'
		);
		
		// attach responders to the transaction object
		jsonp.response(this, "processFilmListe");
		jsonp.error(this, "processError");
		this.$.spinner.start();
	},
	processFilmDetail: function(inSender, inResponse) {
		// do something with it
		this.$.spinner2.stop();	
		this.aktFilm = inResponse;
		this.drawFilmDetail(inResponse);

	},
	
	fetch: function() {    
		var apiKey = 'd95d1f942d3f7bb15d036eb9e13b0182';
		var jsonp = new enyo.Ajax({
			url: 'http://api.themoviedb.org/3/search/movie', // ?api_key=' + api_key, + '&query=fight+club',

			callbackName: "callback"

		});
		// send parameters the remote service using the 'go()' method
		var searchFor = this.$.query.getValue();
		if(searchFor === ''){ return };
		jsonp.go(
			'api_key=' + apiKey + '&query=' + this.$.query.getValue() + '&language=de'
		);
		// attach responders to the transaction object
		jsonp.response(this, "processResponse");
		jsonp.error(this, "processError");
		this.$.spinner.start();
	},
	fetchAlternate: function() {    // nicht Deutsche Alternative
		var apiKey = 'd95d1f942d3f7bb15d036eb9e13b0182';
		var jsonp = new enyo.Ajax({
			//http://imdbapi.org/?title=moon&type=jsonp&plot=simple&episode=0&limit=10&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0
			//url: "http://imdbapi.org/",
			url: 'http://api.themoviedb.org/3/search/movie', // ?api_key=' + api_key, + '&query=fight+club',

			callbackName: "callback"

		});
		// send parameters the remote service using the 'go()' method
		var searchFor = this.$.query.getValue();
		if(searchFor === ''){ return };
		jsonp.go(
			//'api_key=' + apiKey + '&query=' + 'fight+club' //,"+this.$.query.getValue()+"&type=json&plot=simple&episode=0&limit=10&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0"
			'api_key=' + apiKey + '&query=' + this.$.query.getValue()
		);
		// attach responders to the transaction object
		jsonp.response(this, "processResponseAlternate");
		jsonp.error(this, "processError");
		this.$.spinner.start();
	},	
	processError: function(inSender, inResponse) {
		this.$.spinner2.stop();
	
		alert("Externer Server antwortet nicht!" )
	},

	
	processResponse: function(inSender, inResponse) {
		this.$.spinner.stop();
		if(inResponse.results.length){
			this.filme = inResponse.results;
			this.$.filmListe.setCount(this.filme.length);

			//this.setPosterPage(this.filme[0]);
			//this.drawFilmDetail(0);			
			
			var id = this.filme[0].id;
			this.setPosterPage(this.filme[0]);
		
			this.getFilmDetails(id);

		}else{
			this.fetchAlternate();
		}
	},
	processFilmListe: function(inSender, inResponse) {
		if(inResponse.results.length){
			this.filme = inResponse.results;
			this.mySearchMarker = 0;
			this.$.loeschen.hide();	
			this.$.einstellungen.hide();
			this.$.meine.hide();



			this.$.filmListe.setCount(this.filme.length);
			this.$.meineFilmeCount.setContent(this.filme.length + " gefundene Filme")

			//this.setPosterPage(this.filme[0]);
			//this.drawFilmDetail(0);			
			this.$.suche.show();
			//this.$.back.show();
			this.$.update.show();
			
			var id = this.filme[0].id;
			this.setPosterPage(this.filme[0]);
		
			this.getFilmDetails(id);

		}else{
			this.fetchAlternate();
		}
		this.$.spinner.stop();
	},
	processResponseAlternate: function(inSender, inResponse) {
		// do something with it
		//this.$.textArea.setValue(JSON.stringify(inResponse, null, 2));
		if(inResponse.results.length){
			this.filme = inResponse.results;
			this.$.meine.hide();
			
			this.$.suche.show();
			//this.$.back.show();
			this.$.update.show();

			this.$.filmListe.setCount(this.filme.length);
			//this.setPosterPage(this.filme[0]);
			//this.drawFilmDetail(0);			
			
			var id = this.filme[0].id;
			this.setPosterPage(this.filme[0]);
		
			this.getFilmDetails(id);

		}else{
		 //toDo
			this.$.meineFilmeCount.setContent("Nichts gefunden! Manuelle Suche?")

			this.$.Ergebnistext.setContent("Nichts gefunden! Manuelle Suche?");
			this.$.Suchergebnis.show();
		 	this.$.Sucheingabe.show();

		}
		this.$.spinner.stop();
	},
	searchback: function() {

			this.$.Suchergebnis.hide();
		 	this.$.Sucheingabe.hide();
			//this.$.back.hide();
			this.$.update.hide();
			this.$.suche.hide();

			this.$.einstellungen.show();
	    	this.$.loeschen.setShowing(this.appConfiguration.allowDel);	
			this.$.meine.show();
			this.$.meineFilmeCount.setContent("meine "+this.meineFilme.length + " Filme")



		
	},
	setPosterPage: function(vonFilm) {
		var parentWidth = this.$.filmPoster.parent.width - 10;
		var size, w;
		for (var i = 0; i < this.TMDBconfiguration.images.poster_sizes.length-1 ;i++) {
			size = this.TMDBconfiguration.images.poster_sizes[i];
			w = size.slice(1); 
			if( parseInt(w) && parentWidth < parseInt(w) ){
				size = i-1;
				break;
			}
		};
		if(vonFilm.poster_path){
			var url = this.TMDBconfiguration.images.base_url;
			url += this.TMDBconfiguration.images.poster_sizes[size];
			url += vonFilm.poster_path;
		}else{
			url =  "assets/no-poster-w92.jpg";
		};
		this.$.filmPoster.setSrc(url);
		
	},
	getPosterIcon: function(vonFilm) {
		var url = this.TMDBconfiguration.images.base_url;
		url += this.TMDBconfiguration.images.logo_sizes[0];
		url += vonFilm.poster_path;
		return url;		
	},
	loadJSON: function () {
		if(this.meineFilme.length){
			this.$.suche.hide();
			this.$.meine.show();	       	   
		}else{
			var data_file = "assets/filme.txt";
			//var http_request = new XMLHttpRequest();
			var request = new enyo.Ajax({
				url: "assets/filme.txt"
			});
			/*
			try{
				// Opera 8.0+, Firefox, Chrome, Safari
				http_request = new XMLHttpRequest();
			}catch (e){
				// Internet Explorer Browsers
				try{
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				}catch (e) {
					try{
						http_request = new ActiveXObject("Microsoft.XMLHTTP");
					}catch (e){
						// Something went wrong
						alert("Your browser broke!");
						return false;
					}
				}
			}
			*/
			request.go();
			request.response(this, "onLoadJSONready");
			request.error(this, "processError");
		}
	   
	},
	onLoadJSONready: function(inSender, inResponse){
		//if (http_request.readyState == 4  )
		//{
		// Javascript function JSON.parse to parse JSON data
		var jsonObj = inResponse;
		this.meineFilme = jsonObj.filme;	
		// jsonObj variable now contains the data structure and can
		// be accessed as jsonObj.name and jsonObj.country.
		// document.getElementById("Name").innerHTML =  jsonObj.name;
		// document.getElementById("Country").innerHTML = jsonObj.country;
		this.$.suche.hide();
		this.$.update.hide();
		this.$.meine.show();
		this.$.filmMyListe.setCount(this.meineFilme.length);

		//}
	},
	addInfo: function() {
	    var film = this.meineFilme[this.myMarker];
		film.tmdbID = this.aktFilm.id;
		film.origTitle = this.aktFilm.title.replace(/'/g, "");
		film.imdbID = this.aktFilm.imdb_id;
		film.poster_path = this.aktFilm.poster_path;
		film.imdbRating = this.aktFilm.imdbRating;

		var item = this.$.filmMyListe.controls[this.myMarker];
		item.$.filmMyNumber.setContent(  "tmdb#: "+film.tmdbID);
		var size = film.size.split('.'); 
		var XByte = ["byte","kB","MB","GB","TB"];
		var fsize = size[0]+','+ size[1] + " " + XByte[size.length-1];
		item.$.filmMySize.setContent( fsize );
		item.$.filmMyRateing.setContent( "IMDB: " + film.imdbRating);
		//item.$.filmMyNumber.setContent( "tmdb#: "+this.aktFilm.id );
		item.$.filmMyName.setContent( film.origTitle);
		item.$.filmMyName.show();
		item.$.filmFileName.hide();
		item.$.filmMyImg.setSrc( film.poster_path ? this.getPosterIcon(this.aktFilm) : "assets/no-poster-w92.jpg"  );
		
		this.dbChange(film.id, film);
	

		this.$.update.hide();
		//this.$.back.hide();
		this.$.suche.hide();
		this.searchback();
		
	    this.$.loeschen.setShowing(this.appConfiguration.allowDel);			
		this.$.meine.show();

	       	   

		//this.loadJSON();
		
	}, 
	back: function() {
		this.$.update.hide();
		this.$.suche.hide();
		//this.$.back.hide();
		this.$.Sucheingabe.hide();
		this.$.Suchergebnis.hide();


		this.$.einstellungen.show();
		this.$.meineFilmeCount.setContent("meine "+this.meineFilme.length + " Filme")

		this.$.loeschen.setShowing(this.appConfiguration.allowDel);			
		this.$.meine.show();

	},
	loadDir: function(){
			var request = new enyo.Ajax({
				url: "assets/neueFilme.json"
			});
			request.go();
			request.response(this, "onJsonDirReady");
			request.error(this, "processError");
		

	
	},
	onJsonDirReady: function (inSender, inResponse){
		var jsonObj = inResponse;
		//this.meineFilme = jsonObj;
		
		for( n in jsonObj){
			//var file = this.splitFullFileName(jsonObj[n].full_filename);		
			this.dbNew(jsonObj[n]);
			this.meineFilme.push(jsonObj[n]);
		}
		
		
		
		this.$.suche.hide();
		this.$.update.hide();
		this.$.meine.show();
		this.$.filmMyListe.setCount(this.meineFilme.length);
	
	
	
	},
	splitFullFileName: function(filename){
			var result = {};
			//TITEL
			var regExp = /^[^(]*/;
			result.titel = regExp.exec(filename)[0];
			result.titel = result.titel.replace(/_/g, " ");
			result.titel = result.titel.replace(/\./g, " ");
			result.titel = result.titel.trim();
			//DETAIL
			var regExp = /\([^\)]*\)/;
			var exp = regExp.exec(filename);
			result.detail = exp ? regExp.exec(filename)[0] : "no Detail";
			//FLETYPE
			//var regExp = /\([^\)]*\)/;
			try{
				result.filetype = filename.slice(-4);
			}catch (e){
				alert("Split: Fehler bei Index: ",this.index);
			}
			return result;	
	},
	getFileInfo: function(film) {
		var type = this.splitFullFileName(film.full_filename).filetype;
		return "FileInfo: Type:"+type+" Länge: "+film.size;
	},
	dbNew: function(film) {
		var req = new enyo.Ajax({
			url: "http://www.stefan-keimeier.de/mt/eintag_neu2.php"
		});

		req.go("film="+JSON.stringify(film));
		req.response(this, "on_dbNewReady");
		req.error(this, "processError");
	},
	dbChange: function(id, film) {
		var req = new enyo.Ajax({
			url: "http://www.stefan-keimeier.de/mt/eintag_aendern.php"
		});

		req.go("id="+id+"&"+"film="+JSON.stringify(film));
		//req.response(this, "on_dbChangeReady");
		req.error(this, "processError");
	
	},
	dbDelete: function(id) {
		var req = new enyo.Ajax({
			url: "http://www.stefan-keimeier.de/mt/eintag_loeschen.php"
		});

		req.go("id="+id );
		req.error(this, "processError");
	
	},
	dbGetAll: function () {
		var req = new enyo.Ajax({
			url: "http://www.stefan-keimeier.de/mt/abfrage_to_json.php",
		});

		req.go();
		req.response(this, "on_dbGetAllReady");
		req.error(this, "processError");
	
	},
	on_dbGetAllReady: function (inSender, inResponse){
		var jsonObj = inResponse;
		this.meineFilme = jsonObj;
		if(this.appConfiguration.sortMethodeOnStart != "0"){
			this.sortOnStart(this.appConfiguration.sortMethodeOnStart);
		}

		this.$.suche.hide();
		this.$.update.hide();
		//this.$.back.hide();
		this.$.filmMyListe.setCount(this.meineFilme.length);
		this.$.meineFilmeCount.setContent("meine "+this.meineFilme.length + " Filme")
		this.$.spinner.stop();

		this.$.meine.show();
		this.index = 0;
		var tmdbID = this.meineFilme[0].tmdbID;
		this.setPosterPage(this.meineFilme[0]);
	
		this.getFilmDetails(tmdbID);
	},
	on_dbNewReady: function(inSender,inResponse){
		var jsonObj = inResponse;
		if(inResponse){
			for (var i = this.meineFilme.length - 1; i >= 0; i--) {
				if(this.meineFilme[i].full_filename == inResponse.full_filename){
					this.meineFilme[i].id = inResponse.id;
					return;
				}
			};
		};
	},
	sortMyFilme: function(sortFunc) {
		this.meineFilme.sort(sortFunc /*this.sortByName*/);

		this.$.filmMyListe.setCount(0);
		this.index = 0;
		this.myMarker = -1;
		this.$.filmMyListe.setCount(this.meineFilme.length);
		var tmdbID = this.meineFilme[0].tmdbID;
		this.setPosterPage(this.meineFilme[0]);
		this.getFilmDetails(tmdbID);

		
	},	
	sortByName: function(a, b){
			//var ersatz = this.splitFullFileName(a.full_filename);
			var titelA = a.origTitle ? a.origTitle.toLowerCase( ) : a.full_filename.toLowerCase( );
			
			//ersatz = this.splitFullFileName(b.full_filename);
			var titelB = b.origTitle ? b.origTitle.toLowerCase( ) : b.full_filename.toLowerCase( );
			
			if (titelA < titelB) //sort string ascending
				return -1
			if (titelA > titelB)
				return 1
			return 0 //default return value (no sorting)
	},
	sortByDate: function(a, b){
			
			var dateA = a.date.split(".").reverse().join("")  + a.time.split(":").join("");
			var dateB = b.date.split(".").reverse().join("")  + b.time.split(":").join("");
			
			if (dateA < dateB) //sort string ascending
				return -1
			if (dateA > dateB)
				return 1
			return 0 //default return value (no sorting)
	},
	sortBySize: function(a, b){
			
			var dateA = parseInt(a.size.split(".").join(""));
			var dateB = parseInt(b.size.split(".").join(""));
			
			if (dateA < dateB) //sort int ascending
				return -1
			if (dateA > dateB)
				return 1
			return 0 //default return value (no sorting)
	},
	sortByIMDB: function(a, b){
			
			var dateA = parseFloat(a.imdbRating || 0) ;
			var dateB = parseFloat(b.imdbRating || 0);
			
			if (dateA < dateB) //sort int ascending
				return 1
			if (dateA > dateB)
				return -1
			return 0 //default return value (no sorting)
	},
	sortOnStart:  function(methode) {
		switch (methode) {	
			case "1":
				this.sortMyFilme(this.sortByName);
				break;
			case "2":
				this.sortMyFilme(this.sortByDate);
				break;
			case "3":
				this.sortMyFilme(this.sortBySize);
				break;
			case "4":
				this.sortMyFilme(this.sortByIMDB);
				break;
			default:			
				break;
		}
	},
	configMenuSelected:  function(inSender, inEvent) {
		//this.$.configPopup.show();
		var wahl = inEvent.originator.content.slice(0,5);
		//Menu items send an onSelect event with a reference to themselves & any directly displayed content
		switch (wahl) {	
			case "Einst":
				this.appConfig();
				break;
			case "neue ":
				this.appNeueFilme();
				break;
			case "suche":
				this.$.suchEingabe.show();
				this.$.seachInput.focus();
				break;
			case "Alpha":
				this.sortMyFilme(this.sortByName);
				break;
			case "Datum":
				this.sortMyFilme(this.sortByDate);
				break;
			case "Datei":
				this.sortMyFilme(this.sortBySize);
				break;
			case "IMDB-":
				this.sortMyFilme(this.sortByIMDB);
				break;
			default:			
				break;
		}		
	},
	appConfig: function(inSender,inEvent){
		this.$.configPopup.setErlauben( this.appConfiguration.allowDel);
		this.$.configPopup.setSortMethode(this.appConfiguration.sortMethodeOnStart);
		this.$.configPopup.show();
 	},
	updateConfig: function(inSender,inEvent){
		if(inEvent.result){
				this.appConfiguration.allowDel = this.$.configPopup.getErlauben();
   	    		this.$.loeschen.setShowing(this.appConfiguration.allowDel);			
				this.appConfiguration.sortMethodeOnStart = this.$.configPopup.getSortMethode();
				//this.eraseCookie("SortMethode");
				this.createCookie("SortMethode", this.appConfiguration.sortMethodeOnStart, 30)
  		}else{

  		}
  		return true;
	},
	createCookie: function(name,value,days) {
		if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	},

	readCookie: function(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	},

	eraseCookie: function(name) {
	   this.createCookie(name,"",-1);
	},
	appNeueFilme: function(){
		this.$.newFilePopup.show();
	},
	getNewFiles: function(inSender,inEvent){
	 	var newFilms = inEvent;
	 	if(inEvent.length){
			for( var n = 0; n < inEvent.length; n++){
				this.dbNew(newFilms[n]);
				this.meineFilme.push(newFilms[n]);
			}
	 	}
		//this.$.suche.hide();
		//this.$.update.hide();
		this.$.meine.show();
		this.$.filmMyListe.setCount(this.meineFilme.length);
		this.$.meineFilmeCount.setContent("meine "+this.meineFilme.length + " Filme")

		this.$.meine.scrollToBottom();
	},
	keyUp: function(inSender,inEvent){
	 	var event = inEvent.which;
	 	if(event == 27){
	 		this.closeSearch();
	 	}  //ESC
	},
	closeSearch: function(inSender,inEvent){
	 		this.showAll();
	 		this.$.suchEingabe.hide();
	 		this.$.seachInput.setValue("");
	},

	input: function(inSender,inEvent){
	 	var value = this.$.seachInput.getValue();
	 	
	 	for (var i = 0; i < this.meineFilme.length; i++) {
	 		var title = this.meineFilme[i].origTitle;
			if( this.filter(value, title) ) {
					var item = this.$.filmMyListe.controls[i].$.filmMyItem;
					item.setShowing(true);
					
			}else{
					var item = this.$.filmMyListe.controls[i].$.filmMyItem;
					item.setShowing(false);

			}

	 	};
   
	},
	escapeRegExp: function(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	},
	filter: function(input, value) {
		return new RegExp(this.escapeRegExp(input), /*this.caseSensitive ? "g" :*/ "ig").test(value);
	},
	showAll: function() {
	 	for (var i = 0; i < this.meineFilme.length; i++) {
			this.$.filmMyListe.controls[i].$.filmMyItem.setShowing(true);					
		}
	}




	
	
	
	

});

enyo.kind({
	name: "appConfigSheet",
	kind:"onyx.Popup", centered: true, allowDefault:true, modal:true, floating: true, scrim: true, autoDismiss:false, style: "width:240px", 
 
	published:{
	    erlauben: '',
	    sortMethode: '',
	    dialogResult: false		
	},
	events: {
    	onClose: ''
  	},
	components: [ 
    	{kind: "onyx.GroupboxHeader", content: "Konfiguration"},
 		{classes: "onyx-menu-divider"},
       	{content: "Löschen Erlauben ?"},
       	{kind: "onyx.ToggleButton", name: "btnErlauben", classes: "onyx-toggle-button", onChange:"toggleChanged",  value: true, active: true, onContent: "ja", offContent: "nein"},
   		{classes: "onyx-menu-divider"},

    	{kind: "onyx.GroupboxHeader", content: "Sortierung beim Start"},
 		{kind: "enyo.Group", name: "grpSortMethode", onActivate: "groupTapped", classes: "grouping", components: [
   	    		{kind: "onyx.Checkbox", classes: "onyx-checkbox checkBox", name:"chkBox0", content: "keine", style: "padding-lefttext-allign:right" },
   	    		{tag: "br"},
				{kind: "onyx.Checkbox", classes: "checkBox", name:"chkBox1", content: "Alphabetisch"},
				{tag: "br"},
				{kind: "onyx.Checkbox", classes: "checkBox", name:"chkBox2", content: "Datum"},
				{tag: "br"},
				{kind: "onyx.Checkbox", classes: "checkBox", name:"chkBox3", content: "Dateigröße"},	
				{tag: "br"},					
				{kind: "onyx.Checkbox", classes: "checkBox", name:"chkBox4", content: "IMDB-Bewertung", active: true},
				{tag: "br"},
			
			
		]},
		{classes: "onyx-menu-divider"},
    	{kind: "FittableColumns", components:[
			{kind: "onyx.Button", content: "Übernehmen", ontap: "close", classes: "onyx-affirmative"},
			{kind: "onyx.Button", content: "Verwerfen", ontap: "cancle", classes: "onyx-negative"}
    	]}

		
	],
	create: function() {
		this.inherited(arguments);
		//Do stuff onCreate
	},
	rendered : function() {
		this.inherited(arguments);
		//Do stuff afterRendered
	},

	groupTapped: function(inSender,inEvent){
		var selected = inEvent.originator.indexInContainer();
		this.sortMethode = selected/2;	
		return true;
	},
	toggleChanged: function(inSender,inEvent){
		//inSender.setActive(true);
		this.setErlauben(inEvent.value);
		return true;
	},
	tapped: function(inSender,inEvent){
		return true;
	},
	cancle: function(inSender,inEvent){
		this.doClose({result:false})
		this.hide();

	},
	close: function(inSender,inEvent){
		this.doClose({result:true})
		this.hide();
	 	
	 }, 
	 erlaubenChanged:  function(inSender,inEvent){
	 	this.$.btnErlauben.setValue(this.erlauben);
	 },
	 sortMethodeChanged:  function(inSender,inEvent){
	 	var index = this.sortMethode;
	 	var cboxName = "chkBox"+index;
	 	this.$[cboxName].setActive(true);
	 	return true;
	 },
	 linkToIMDB: function(inSender,inEvent){
	 	//Do Something
	 },
	 linkToWEB: function(inSender,inEvent){
	 	//Do Something
	 }

});

enyo.kind({
	name: "appNewFileSheet",
	kind:"onyx.Popup", centered: true, allowDefault:true, modal:true, floating: true, scrim: true, autoDismiss:false, style: "width:380px;  maxHeight: 500px",
	published:{
	    auswahlListe: [],
	    anzahlNeue: 0,
	    dialogResult: false		
	},
	events: {
    	onClose: ''
  	},
	components: [ 
    	{kind: "onyx.GroupboxHeader", content: "Neue Filme hinzufügen"},
		{classes: "onyx-menu-divider"},
		{kind:"FittableColumns", components: [
			{kind:"enyo.FileInputDecorator", name: "newFileInput",  multiple: true, onSelect: "newFileSelected"},
			{kind:"onyx.Button", content: "Übernehmen", classes: "onyx-affirmative", ontap: "uebernehmen",},
		    {kind:"onyx.Button", content: "Abbrechen", classes: "onyx-negative", ontap: "beenden",},
		]},
		{classes: "onyx-menu-divider"},
    	{kind: "onyx.GroupboxHeader", name: "FileAuswahl", content: "Auswahl"},
    	{kind: "Scroller", thumb: true, fit:true, style: "max-height: 300px", components: [
			{name: "newFiles", kind: "Repeater",  onSetupItem:"setupItem", components: [
				{name:"fileItem", classes:"repeater-sample-item", ontap: "itemTap", components: [
					{kind: "FittableRows", components: [
						{ name: "fileName" },
						{ name: "fileSize"}, 
						{ name: "fileDate"}
							
					]}
				]}
			]}

    	]}




    ],
    fileListe: [],

	create: function() {
		this.inherited(arguments);
		//Do stuff onCreate
	},
	rendered : function() {
		this.inherited(arguments);
		//Do stuff afterRendered
	},
	newFileSelected: function(inSender,inEvent){
		for (var i = 0,f; f = inEvent.files[i]; i++) {
			this.fileListe.push(f);
		};
		this.$.newFiles.setCount(this.fileListe.length);
		this.$.FileAuswahl.setContent("Auswahl: "+this.fileListe.length+" Filme");
	},
	setupItem: function(inSender,inEvent){		
		var index = inEvent.index;
		var item = inEvent.item;
		var file = this.fileListe[index];
		if(file){
			item.$.fileName.setContent(file.name);
			
			var mySizeStr = this.formatSize(file.size);
			item.$.fileSize.setContent(mySizeStr);

			var fileDate = this.formatDate(file.lastModifiedDate);
			var fileTime = this.formatTime(file.lastModifiedDate);
			item.$.fileDate.setContent(fileDate + " " + fileTime);
		}

	},
	uebernehmen: function(inSender,inEvent){
        var filmFileObj = [];
        // json format: { "date":"17.11.2008","time":"01:52","size":"1.169.948.563","full_filename":"10000BC_(DPHR_DVD5_STK).m4v" }
     	var file;
		//this.$.newFiles.setCount(this.fileListe.length);	
     	for (var i = 0; i < this.fileListe.length; i++) {
    	 	file = this.fileListe[i];
    	 	filmFileObj[i] = new Object();
    	 	filmFileObj[i].date = this.formatDate(file.lastModifiedDate);
    	 	filmFileObj[i].time = this.formatTime(file.lastModifiedDate);
    	 	filmFileObj[i].size = this.formatSize(file.size);
    	 	filmFileObj[i].full_filename = file.name;
    	 	this.auswahlListe.push(filmFileObj[i]);	
		};
		if(this.auswahlListe.length){
			this.anzahlNeue = this.auswahlListe.length;
			this.dialogResult = true;
		}	
		this.fileListe.length = 0;
		this.$.newFiles.setCount(this.auswahlListe.length);	
		this.hide();
		this.doClose(this.auswahlListe);
	},
 		
	beenden: function(inSender,inEvent){
		this.fileListe.length = 0;
		this.$.newFiles.setCount(this.fileListe.length);	
		this.hide();		
	}, 
	formatDate: function(date){
		var fileDate = "";
		var n = date.getDate();
		n = n < 10 ? "0" + n : n;
		fileDate += n+".";
		n = date.getMonth();
		n = n < 10 ? "0" + n : n;
		fileDate += n+".";
		fileDate += date.getFullYear();
		return 	fileDate;
	}, 
	formatTime: function(date){
		var fileTime = "";
		n = date.getHours();
		n = n < 10 ? "0" + n : n;
		fileTime += n + ":";
		n = date.getMinutes();
		n = n < 10 ? "0" + n : n;
		fileTime += n;
		return fileTime;
	},
	formatSize: function(size){
		var sizeStr = "" + size;
		var s = "";
		var l = sizeStr.length;
		while(l>3){ 
			s = "."+sizeStr.substr(l-3,3)+s;
			l = l-3;
		}
		s = sizeStr.substr(0,l)+s;
		return s;
	}


});


enyo.kind({
	name: "appConfirmPopup",
	kind:"onyx.Popup", centered: true, allowDefault:true, modal:true, floating: true,  autoDismiss:false, style: "width:270px", 
 
	published:{
	    dialogResult: false		
	},
	components: [ 
    	{kind: "onyx.GroupboxHeader", content: "Bestätigen ..."},
 		{classes: "onyx-menu-divider"},
   	    {tag: "br"},
       	{content: "Datenbankeintrag wirklich löschen ?"},
				{tag: "br"},
		{classes: "onyx-menu-divider"},
    	{kind: "FittableColumns", components:[
			{kind: "onyx.Button", content: "JA", ontap: "close", classes: "onyx-affirmative"},
			{kind: "onyx.Button", content: "Nein", ontap: "cancle", classes: "onyx-negative"}
    	]}

		
	],
	create: function() {
		this.inherited(arguments);
		//Do stuff onCreate
	},
	rendered : function() {
		this.inherited(arguments);
		//Do stuff afterRendered
	},

	cancle: function(inSender,inEvent){
		this.dialogResult = false;
		this.hide();
		return true;
	},
	close: function(inSender,inEvent){
		this.dialogResult = true;
		this.hide();
		return true;
	} 
	 
});


