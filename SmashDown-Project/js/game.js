		var game = new Phaser.Game(1200, 550, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


		WebFontConfig = {
		    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
		    google: {
		      families: ['Press Start 2P']
		    }

		};

		function preload() {

			// LOAD EKLECTRUC
		    game.load.spritesheet('eklectruc_move', 'sprites/eklectruc/spritesheet_deplacement.png', 220, 360);
		    game.load.spritesheet('eklectruc_sample_1', 'sprites/eklectruc/eklectruc_attaque_sample_1_right.png', 300, 360);

		    game.load.spritesheet('nutstick_move', 'sprites/nutstick/nutstick_base.png', 220, 360);

		    // BACKGROUND
		    game.load.image("background", "sprites/beach.png");

		    // MUSIC
		    game.load.audio('bg_music', ['sound/fight_music.mp3']);
		    var music;

		    // TEXT
		    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		    var text = null;		    
			var grd;
			var text_eklectruc = null;		    
			var grd_eklectruc;
			var text_nutstick = null;		    
			var grd_nutstick;
		    
		    var player_eklectruc;
		    var player_eklectruc_sample;
		    var player_nutstick;


		    // KEYBOARD
			    var oKey;
				var lKey;
				var kKey;
				var mKey;

				var zKey;
				var qKey;
				var sKey;
				var dKey;
				var oneKey;

		}

		

		function create() {

			game.physics.startSystem(Phaser.Physics.ARCADE);

			// BACKGROUND
		    	game.add.tileSprite(0, 0, 1200, 720, 'background');

		    // MUSIC
		    music = game.add.audio('bg_music');
    		music.play();

    		// SOUND ATTACK
		    

		    // HEALTHBAR PLAYER_EKLECTRUC
		    	var healthBarEklectruc = {
									width: 450,
								    height: 40,
								    x: 250,
									y: 50,
								    bg: {
								      color: '#8A0808'
								    },
								    bar: {
								      color: '#FFBF00'
								    },
								    animationDuration: 200,
								    flipped: false
								};
				this.myHealthBarEklectruc = new HealthBar(this.game, healthBarEklectruc);
				/*this.myHealthBarEklectruc.setPercent(70);*/

			// HEALTHBAR PLAYER_NUTSTICK
		    	var healthBarNutstick = {
									width: 450,
								    height: 40,
								    x: 950,
									y: 50,
								    bg: {
								      color: '#8A0808'
								    },
								    bar: {
								      color: '#FFBF00'
								    },
								    animationDuration: 200,
								    flipped: true
								};
				this.myHealthBarNutstick = new HealthBar(this.game, healthBarNutstick);
				/*this.myHealthBarNutstick.setPercent();*/

		    // ADD SPRITE
		    	
			    // NUTSTICK
					player_nutstick = game.add.sprite(950, 200, 'nutstick_move');
				    game.physics.enable(player_nutstick, Phaser.Physics.ARCADE);
				    player_nutstick.body.collideWorldBounds = true;
					player_nutstick.body.bounce.setTo(0, 0);

				// EKLECTRUC
				    player_eklectruc = game.add.sprite(32, 200, 'eklectruc_move');
				    game.physics.enable(player_eklectruc, Phaser.Physics.ARCADE);
				    player_eklectruc.body.collideWorldBounds = true;
					player_eklectruc.body.bounce.setTo(0, 0);

				    player_eklectruc_sample = game.add.sprite(32, 190, 'eklectruc_sample_1');
				    game.physics.enable(player_eklectruc_sample, Phaser.Physics.ARCADE);



			// MOVE
				player_eklectruc;
				player_eklectruc.animations.add('fix', [0, 1, 2, 3], 9, true);
			    player_eklectruc.animations.add('right', [12, 13, 14, 15, 16, 17], 9, true);
			    player_eklectruc.animations.add('left', [18, 19, 20, 21, 22, 23], 9, true);
			    player_eklectruc_sample.animations.add('atk1', [0, 1, 2, 3], 9, false);

			    player_nutstick.animations.add('fix', [0, 1], 4, true);

		    // KEYBOARD Config
			    oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
			    lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
			    kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
			    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);   

			   
			    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
			    qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
			    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
			    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
			    oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
			    		 oneKey.onDown.add(eklectrucAtk1, this)

			// LIFE POINT
			    player_eklectruc.life = 90;

			    player_nutstick.life = 110;
			    player_nutstick.lifeForAttack = 110;
			    player_nutstick.damage = 0;

			player_nutstick.percentLife = 0;
		    
		}


		function update() {

			game.physics.arcade.collide(player_eklectruc, player_nutstick);

			
			// EKLECTRUC ##### MOVE + KEYBOARD
				player_eklectruc_sample.x = player_eklectruc.x;
				player_eklectruc.body.velocity.x = 0;

			    if (qKey.isDown) {
			        player_eklectruc.body.velocity.x -= 500;
					player_eklectruc.animations.play('left');

					player_eklectruc.alpha = 1;
			        player_eklectruc_sample.alpha = 0;
			    }
			    else if (dKey.isDown) {
			        player_eklectruc.body.velocity.x += 500;
			    	player_eklectruc.animations.play('right');

			    	player_eklectruc.alpha = 1;
			        player_eklectruc_sample.alpha = 0;      
			    }
			    else if (oneKey.isDown) {
			    	player_eklectruc_sample.alpha = 1; 
					player_eklectruc_sample.animations.play('atk1');
			
					player_eklectruc.alpha = 0;
			    } 
			    else {
			    	player_eklectruc.animations.play('fix');

			    	player_eklectruc.alpha = 1;
					player_eklectruc_sample.alpha = 0;
			    }

			// NUTSTICK ##### MOVE + KEYBOARD
			    player_nutstick.animations.play('fix');
			    player_nutstick.body.velocity.x = 0;

				
			    if (kKey.isDown) {
			        player_nutstick.body.velocity.x -= 366;
					player_nutstick.animations.play('left');

					player_nutstick.alpha = 1;
			    }
			    else if (mKey.isDown) {
			        player_nutstick.body.velocity.x += 366;
			    	player_nutstick.animations.play('right');

			    	player_nutstick.alpha = 1;      
			    }
			    else {
			    	player_nutstick.animations.play('fix');
			    }
		    
		}

		
		function render () {

		    /*game.debug.body(player_eklectruc);
		    game.debug.body(player_eklectruc_sample);

		    game.debug.body(player_nutstick);*/

		}

		function eklectrucAtk1 () {

			if (game.physics.arcade.collide(player_eklectruc_sample, player_nutstick)) {
				console.log('HIT');

				// Degat sur .life
				// Calcul des damage sur la barre de vie
				player_nutstick.life -= 5;
			    player_nutstick.damage += 5;
			    player_nutstick.percentLife = (player_nutstick.damage * 100)/ player_nutstick.lifeForAttack;
			    player_nutstick.percentLife = 100 - player_nutstick.percentLife;
			    this.myHealthBarNutstick.setPercent(player_nutstick.percentLife);
			}
			else {
				console.log('MISS');
			}
			
		}



		// TEXT
		function createText() {

			// TEXT 1
			    text = game.add.text(game.world.centerX, game.world.centerY, "VS");
			    text.anchor.setTo(0.5);
			    

			    text.font = 'Press Start 2P';
			    text.fontSize = 60;


			    //  x0, y0 - x1, y1
			    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
			    grd.addColorStop(0, '#FFFFFF');
			    text.fill = grd;

			    text.align = 'center';
			    text.y = 55;
			    text.stroke = '#000000';
			    text.strokeThickness = 2;
			    text.setShadow(5, 5, 'rgba(0,0,0,1)', 5);

			    text.events.onInputOver.add(over, this);
			    text.events.onInputOut.add(out, this);


			// TEXT EKLECTRUC
			    text_eklectruc = game.add.text(game.world.centerX, game.world.centerY, "Eklectruc");
			    text.anchor.setTo(0.5);

			    text_eklectruc.font = 'Press Start 2P';
			    text_eklectruc.fontSize = 20;

			    //  x0, y0 - x1, y1
			    grd_eklectruc = text_eklectruc.context.createLinearGradient(0, 0, 0, text.canvas.height);
			    grd_eklectruc.addColorStop(0, '#FFFFFF');
			    text_eklectruc.fill = grd_eklectruc;

			    text_eklectruc.x = 25;
			    text_eklectruc.y = 80;
			    text_eklectruc.stroke = '#000000';
			    text_eklectruc.strokeThickness = 2;
			    text_eklectruc.setShadow(5, 5, 'rgba(0,0,0,1)', 5);

			    text_eklectruc.events.onInputOver.add(over, this);
			    text_eklectruc.events.onInputOut.add(out, this);


			// TEXT NUTSTICK
			    text_nutstick = game.add.text(game.world.centerX, game.world.centerY, "Nutstick");
			    text.anchor.setTo(0.5);

			    text_nutstick.font = 'Press Start 2P';
			    text_nutstick.fontSize = 20;

			    //  x0, y0 - x1, y1
			    grd_nutstick = text_nutstick.context.createLinearGradient(0, 0, 0, text.canvas.height);
			    grd_nutstick.addColorStop(0, '#FFFFFF');
			    text_nutstick.fill = grd_nutstick;

			    text_nutstick.x = 1015;
			    text_nutstick.y = 80;
			    text_nutstick.stroke = '#000000';
			    text_nutstick.strokeThickness = 2;
			    text_nutstick.setShadow(5, 5, 'rgba(0,0,0,1)', 5);

			    text_nutstick.events.onInputOver.add(over, this);
			    text_nutstick.events.onInputOut.add(out, this);
		}

		function out() {

		    text.fill = grd;

		    text_eklectruc.fill = grd_eklectruc;
		    text_nutstick.fill = grd_nutstick;

		}

		function over() {

		    text.fill = '#ff00ff';

		    text_eklectruc.fill = '#ff00ff';
		    text_nutstick.fill = '#ff00ff';

		}


/*
var perso ;
perso.scale.setTo(dimension px);
*/