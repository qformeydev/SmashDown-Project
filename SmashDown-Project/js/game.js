		var game = new Phaser.Game(1200, 550, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render});

		// GARDE
			var parade = {
				eklectruc: false,
				nutstick: false
			};

			var paradeNotAttack = {
				eklectruc: false,
				nutstick: false
			};
		

		WebFontConfig = {
		    active: function() { game.time.events.add(Phaser.Timer.SECOND * 0, createText, this); },
		    google: {
		      families: ['Press Start 2P']
		    }

		};

		function preload() {

			// LOAD EKLECTRUC
			    game.load.spritesheet('eklectruc_move', 'sprites/eklectruc/spritesheet_deplacement.png', 220, 360);
			    game.load.spritesheet('eklectruc_sample_1', 'sprites/eklectruc/eklectruc_attaque_sample_1_right.png', 300, 360);

			    game.load.spritesheet('nutstick_move', 'sprites/nutstick/spritesheet_deplacement.png', 220, 360);
			    game.load.spritesheet('nutstick_sample_1', 'sprites/nutstick/nutstick_attaque_sample_1.png', 400, 440);

		    // BACKGROUND
		    	game.load.image("background", "sprites/beach.png");

		    // OTHER SPRITES
		    	game.load.image("block", "sprites/bouclier_block.png");
		    	var block_eklectruc;
		    	var block_nutstick;

		    // SOUND
		    	game.load.audio('bg_music', ['sound/fight_music.mp3']);
		    	var music;
		    	game.load.audio('eklectruc_atk1', ['sound/eklectruc_atk1.mp3']);
		    	var eklectruc_atk1;
		    	game.load.audio('nutstick_atk1', ['sound/nutstick_atk1.wav']);
		    	var nutstick_atk1;

		    // TEXT
			    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
			    var text = null;		    
				var grd;
				var text_eklectruc = null;		    
				var grd_eklectruc;
				var text_nutstick = null;		    
				var grd_nutstick;

				var eklectruc_win = null;
				var grd_eklectruc_win;

				var nutstick_win = null;
				var grd_nutstick_win;


		    // PLAYERS
			    var player_eklectruc;
			    var player_eklectruc_sample;
			    var player_nutstick;
			    var player_nutstick_sample;


		    // KEYBOARD
			    var oKey;
				var lKey;
				var kKey;
				var mKey;
				var nineKey;
				var eightKey;

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

		    // BLOCK SPRITE
				block_eklectruc = game.add.sprite(100, 105, 'block');
				block_nutstick = game.add.sprite(1010, 105, 'block');

		    // MUSIC
			    music = game.add.audio('bg_music', 0.4, true);
	    		music.play();

    		// SOUND ATTACK
		    	eklectruc_atk1 = game.add.audio('eklectruc_atk1', 0.2, false);
	    		nutstick_atk1 = game.add.audio('nutstick_atk1', 0.7, false);

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

					player_nutstick_sample = game.add.sprite(100, 125, 'nutstick_sample_1');
				    game.physics.enable(player_nutstick_sample, Phaser.Physics.ARCADE);

				// EKLECTRUC
				    player_eklectruc = game.add.sprite(32, 200, 'eklectruc_move');
				    game.physics.enable(player_eklectruc, Phaser.Physics.ARCADE);
				    player_eklectruc.body.collideWorldBounds = true;
					player_eklectruc.body.bounce.setTo(0, 0);

				    player_eklectruc_sample = game.add.sprite(32, 190, 'eklectruc_sample_1');
				    game.physics.enable(player_eklectruc_sample, Phaser.Physics.ARCADE);



			// MOVE
				// EKLECTRUC
				player_eklectruc;
				player_eklectruc.animations.add('fix', [0, 1, 2, 3], 9, true);
			    eklectruc_idle = player_eklectruc.animations.add('right', [12, 13, 14, 15, 16, 17], 9, false);
			    eklectruc_idle.onComplete.add(startIdleAnimationEklectruc, this);
			    eklectruc_idle = player_eklectruc.animations.add('left', [18, 19, 20, 21, 22, 23], 9, false);
			    eklectruc_idle.onComplete.add(startIdleAnimationEklectruc, this);
			    
			    var eklectruc_idle = player_eklectruc_sample.animations.add('atk1', [0, 1, 2, 3], 9, false);
			    eklectruc_idle.onComplete.add(startIdleAnimationEklectruc, this);

			    // NUTSTICK
			    player_nutstick;
			    player_nutstick.animations.add('fix', [0, 1], 4, true);
			    nutstick_idle = player_nutstick.animations.add('left', [6, 7], 9, false);
			    nutstick_idle.onComplete.add(startIdleAnimationNutstick, this);
			    nutstick_idle = player_nutstick.animations.add('right', [12, 13], 9, false);
			    nutstick_idle.onComplete.add(startIdleAnimationNutstick, this);

			    var nutstick_idle = player_nutstick_sample.animations.add('atk1', [0, 1, 2, 3], 9, false);
			    nutstick_idle.onComplete.add(startIdleAnimationNutstick, this);

		    // KEYBOARD Config
			    oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);
			    lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
			    kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
			    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
			    nineKey = game.input.keyboard.addKey(Phaser.Keyboard.NINE); 
			    		  nineKey.onDown.add(nutstickAtk1, this);
			   	eightKey = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT); 

			   
			    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
			    qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
			    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
			    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
			    oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
			    		 oneKey.onDown.add(eklectrucAtk1, this);
			   	twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);

			// LIFE POINT
			    player_eklectruc.life = 90;
			    player_eklectruc.lifeForAttack = 90;
			    player_eklectruc.damage = 0;

				player_eklectruc.percentLife = 0;

			    player_nutstick.life = 110;
			    player_nutstick.lifeForAttack = 110;
			    player_nutstick.damage = 0;

				player_nutstick.percentLife = 0;


			// IDLE ANIMATION START AUTO
				player_eklectruc.animations.play('fix');

			    player_eklectruc.alpha = 1;
				player_eklectruc_sample.alpha = 0;


				player_nutstick.animations.play('fix');

			    player_nutstick.alpha = 1;
				player_nutstick_sample.alpha = 0;
		    
		}


		function update() {

			game.physics.arcade.collide(player_eklectruc, player_nutstick);
			game.physics.arcade.collide(player_nutstick, player_eklectruc);
			

			
			// EKLECTRUC ##### MOVE + KEYBOARD
				player_eklectruc_sample.x = player_eklectruc.x;	
				player_eklectruc.body.velocity.x = 0;

				// GESTION BLOCK		
					block_eklectruc.x = player_eklectruc.x;
					block_eklectruc.x += 60;
					block_eklectruc.alpha = 0;

		
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


			    if (twoKey.isDown) {
			    	parade.eklectruc = true;
			    	block_eklectruc.alpha = 1;
			    }
			    else if (twoKey.isUp){
			    	parade.eklectruc = false;
			    	block_eklectruc.alpha = 0;
			    }



			// NUTSTICK ##### MOVE + KEYBOARD
				player_nutstick_sample.x = player_nutstick.x;
				player_nutstick_sample.x -= 180;
			    player_nutstick.body.velocity.x = 0;

				// GESTION BLOCK
					block_nutstick.x = player_nutstick.x;
					block_nutstick.x += 60;
					block_nutstick.alpha = 0;

				
			    if (kKey.isDown) {
			        player_nutstick.body.velocity.x -= 366;
					player_nutstick.animations.play('left');

					player_nutstick.alpha = 1;
			        player_nutstick_sample.alpha = 0; 
			    }
			    else if (mKey.isDown) {
			        player_nutstick.body.velocity.x += 366;
			    	player_nutstick.animations.play('right');

			    	player_nutstick.alpha = 1;
			        player_nutstick_sample.alpha = 0;       
			    }	    


			    if (eightKey.isDown) {
			    	parade.nutstick = true;
					block_nutstick.alpha = 1;
			    }
			    else if (eightKey.isUp){
			    	parade.nutstick = false;
					block_nutstick.alpha = 0;
			    }


			// CONDITION DE WIN
			    if (player_eklectruc.life <= 0) {
				   	nutstick_win.alpha = 1;
				   	player_eklectruc.kill();
				   	player_eklectruc_sample.kill();
				}
				else if (player_nutstick.life <= 0) {
				    eklectruc_win.alpha = 1;
				   	player_nutstick.kill();
				   	player_nutstick_sample.kill();
				}
				else {

				}

		    
		}

		
		function render () {

		    /*game.debug.body(player_eklectruc);
		    game.debug.body(player_eklectruc_sample);

		    game.debug.body(player_nutstick);
		    game.debug.body(player_nutstick_sample);*/

		}


		// IDLE ANIMATION EKLECTRUC
			function startIdleAnimationEklectruc(){


				player_eklectruc.animations.play('fix');

				player_eklectruc.alpha = 1;
				player_eklectruc_sample.alpha = 0;
			}

		// IDLE ANIMATION NUTSTICK
			function startIdleAnimationNutstick(){


				player_nutstick.animations.play('fix');

				player_nutstick.alpha = 1;
				player_nutstick_sample.alpha = 0;
			}

		// ATTAQUE EKLECTRUC #### SAMPLE 1
			function eklectrucAtk1 () {

			    	player_eklectruc_sample.alpha = 1; 
					player_eklectruc_sample.animations.play('atk1');
			
					player_eklectruc.alpha = 0;
					eklectruc_atk1.play();
				if (game.physics.arcade.collide(player_eklectruc_sample, player_nutstick)) {

					if(parade.nutstick == true){
						console.log('PARADE!');
						return;
					}
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

		// ATTAQUE NUTSTICK #### SAMPLE 1
			function nutstickAtk1 () {

					player_nutstick_sample.alpha = 1; 
					player_nutstick_sample.animations.play('atk1');
			
					player_nutstick.alpha = 0;
					nutstick_atk1.play();
				if (game.physics.arcade.collide(player_nutstick_sample, player_eklectruc)) {

					if(parade.eklectruc == true){
						console.log('PARADE!');
						return;
					}
					console.log('HIT');

					// Degat sur .life
					// Calcul des damage sur la barre de vie
					player_eklectruc.life -= 8;
				    player_eklectruc.damage += 8;
				    player_eklectruc.percentLife = (player_eklectruc.damage * 100)/ player_eklectruc.lifeForAttack;
				    player_eklectruc.percentLife = 100 - player_eklectruc.percentLife;
				    this.myHealthBarEklectruc.setPercent(player_eklectruc.percentLife);
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

				// CONDITION DE WIN EKLECTRUC
					console.log('condition de victoire');
					eklectruc_win = game.add.text(game.world.centerX, game.world.centerY, "EKLECTRUC WIN");
				    eklectruc_win.anchor.setTo(0.5);
				    

				    eklectruc_win.font = 'Press Start 2P';
				    eklectruc_win.fontSize = 70;

				    grd_eklectruc_win = eklectruc_win.context.createLinearGradient(0, 0, 0, eklectruc_win.canvas.height);
				    grd_eklectruc_win.addColorStop(0, '#FFFFFF');
				    eklectruc_win.fill = grd_eklectruc_win;

				    eklectruc_win.align = 'center';
				    eklectruc_win.y = 200;
				    eklectruc_win.stroke = '#000000';
				    eklectruc_win.strokeThickness = 2;
				    eklectruc_win.setShadow(5, 5, 'rgba(0,0,0,1)', 5);

				    eklectruc_win.events.onInputOver.add(over, this);
				    eklectruc_win.events.onInputOut.add(out, this);
				    console.log('répétition mamene');
				    eklectruc_win.alpha = 0;
				   
					
				// CONDITION WIN NUTSTICK
					console.log('condition de victoire');
					nutstick_win = game.add.text(game.world.centerX, game.world.centerY, "NUTSTICK WIN");
				    nutstick_win.anchor.setTo(0.5);
				    

				    nutstick_win.font = 'Press Start 2P';
				    nutstick_win.fontSize = 70;

				    grd_nutstick_win = nutstick_win.context.createLinearGradient(0, 0, 0, nutstick_win.canvas.height);
				    grd_nutstick_win.addColorStop(0, '#FFFFFF');
				    nutstick_win.fill = grd_nutstick_win;

				    nutstick_win.align = 'center';
				    nutstick_win.y = 200;
				    nutstick_win.stroke = '#000000';
				    nutstick_win.strokeThickness = 2;
				    nutstick_win.setShadow(5, 5, 'rgba(0,0,0,1)', 5);

				    nutstick_win.events.onInputOver.add(over, this);
				    nutstick_win.events.onInputOut.add(out, this);
				    console.log('répétition mamene');
				    nutstick_win.alpha = 0;

				
			}

			function out() {

			    text.fill = grd;

			    text_eklectruc.fill = grd_eklectruc;
			    text_nutstick.fill = grd_nutstick;

			    eklectruc_win.fill = grd_eklectruc_win;
			    nutstick_win.fill = grd_nutstick_win;

			}

			function over() {

			    text.fill = '#ff00ff';

			    text_eklectruc.fill = '#ff00ff';
			    text_nutstick.fill = '#ff00ff';

			    eklectruc_win.fill = '#ff00ff';
			    nutstick_win.fill = '#ff00ff';

			}



/*
var perso ;
perso.scale.setTo(dimension px);
*/