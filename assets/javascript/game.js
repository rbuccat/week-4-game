$(document).ready(function() {

			var starWarsCharacters = {
				name: ["Rey", "Luke Skywalker", "Darth Vader", "Kylo Ren"],
				hp: [100, 120, 150, 180],
				images: ["assets/images/rey.jpg", "assets/images/lukeskywalker.jpg", "assets/images/darthvader.jpg", "assets/images/kyloren.jpg"]
			}	

			var defenderHealth;
			var playerHealth;
			var pname;
			var dname;
			var playerWins = 0;
			var playerSelected = false;
			var defenderSelected = false;

			var counterAttack = Math.floor((Math.random() * 50) + 1);
			
			var random = Math.floor((Math.random() * 10));
			var baseAP = 0;
			var attacks = [];
			for(var i = 0; i < 20; i++) {
				baseAP = baseAP + random; 
				attacks.push(baseAP);
			}

			var numIndex = 1;
			var attackMore = attacks[0];
			function nextAttack() {
    			attackMore = attacks[numIndex];
    			numIndex = (numIndex + 1) % (attacks.length);
			};

			for (var i = 0; i < starWarsCharacters.hp.length; i++) {
				var b = $('<button>').prepend('<img src="' + starWarsCharacters.images[i] + '" />');
				b.addClass('swImage-button swImage' );
				$("#buttons").append(b);
				b.data('num', starWarsCharacters.hp[i]);

				var c = $('<p>').prepend(starWarsCharacters.hp[i]);
				c.addClass('fullHealth '+ starWarsCharacters.hp[i] + 'hp');
				b.append(c);

				b.prepend('<p>' + starWarsCharacters.name[i] + '</p>');
				}
			

			$('.swImage-button').on(
				'click', function() {

					$("#mycharacter").append(($(this)));
					$("#enemies").append($("#buttons"));
					$(this).find(".fullHealth").addClass("updatehp1");
					
						$('.swImage-button').on('click', function() {
							
							$("#defender").append(($(this)));
							$(this).find(".fullHealth").addClass("updatehp2");
							$(this).find(".fullHealth").removeClass("updatehp1");
							$("#pmessage").empty();
							$("#dmessage").empty();
								
						});

			});

			$("#attack").on('click', function() {
				
				if ($("#mycharacter").find(".fullHealth").hasClass("100hp")) {
					playerHealth = 100;
					pname = "Rey";
					playerSelected = true;
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("120hp")) {
					playerHealth = 120;
					pname = "Luke Skywalker";
					playerSelected = true;
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("150hp")) {
					playerHealth = 150;
					pname = "Darth Vader";
					playerSelected = true;
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("180hp")) {
					playerHealth = 180;
					pname = "Kylo Ren";
					playerSelected = true;
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else {
					$("#pmessage").text("No enemy here!");
				}
				
				if ($("#defender").find(".fullHealth").hasClass("100hp")) {
					defenderHealth = 100;
					dname = "Rey";
					$("#dmessage").empty();
					defenderSelected = true;
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("120hp")) {
					defenderHealth = 120;
					dname = "Luke Skywalker";
					$("#dmessage").empty();
					defenderSelected = true;
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("150hp")) {
					defenderHealth = 150;
					dname = "Darth Vader";
					$("#dmessage").empty();
					defenderSelected = true;
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("180hp")) {
					defenderHealth = 180;
					dname = "Kylo Ren";
					$("#dmessage").empty();
					defenderSelected = true;
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else {
					$("#pmessage").text("No enemy here!");
				}
				
				if (playerSelected == true && defenderSelected == true) {
					defenderHealth = defenderHealth - attackMore;
					playerHealth = playerHealth - counterAttack;
					$("#pmessage").text("You attacked " + dname + " for " + attackMore + " damage.");
					$("#dmessage").text(dname + " attacked you back for " + counterAttack + " damage.");

					$(".updatehp1").text(playerHealth);
					$(".updatehp2").text(defenderHealth);
					nextAttack();

					if (playerHealth <= 0) {
						$("#message").text("You have been defeated...GAME OVER!")
						$("#restart").append($('<button>').text("Restart"));
						defenderSelected = false;
					}
					else if (defenderHealth <= 0 && playerWins == 2) {
						$("#defender").empty();
						$("#pmessage").text("You won!!!! GAME OVER!!");
						$("#restart").append($('<button>').text("Restart"));
						$("#dmessage").empty();
						defenderSelected = false;
					}
					else if (defenderHealth <= 0) {
						$("#defender").empty();
						$("#pmessage").text("You have defeated " + dname + ", you can choose to fight another enemy.");
						$("#dmessage").empty();
						playerWins++;
						defenderSelected = false;	
					}
					}			
			});

			$('#restart').on(
				'click', function() {
					location.reload();
				}
			);

});
