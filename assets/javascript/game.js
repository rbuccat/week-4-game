$(document).ready(function() {

			var starWarsCharacters = {
				name: ["Rey", "Luke Skywalker", "Darth Vader", "Kylo Ren", "AT-AT"],
				hp: [100, 120, 150, 180, 300],
				images: ["assets/images/rey.jpg", "assets/images/lukeskywalker.jpg", "assets/images/darthvader.jpg", "assets/images/kyloren.jpg","assets/images/at-at.PNG"]
			}	

			var defenderHealth;
			var playerHealth;
			var pname;
			var dname;
			var playerWins = 0;
			var playerSelected = false;
			var defenderSelected = false;

			var counterAttack = Math.floor((Math.random() * 25));
			
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

				var makeButton = $('<button>').prepend('<img src="' + starWarsCharacters.images[i] + '" />');
				makeButton.addClass('player-button available swImage');
				$("#buttons").append(makeButton);

				var makeText = $('<p>').prepend(starWarsCharacters.hp[i]);
				makeText.addClass('fullHealth '+ starWarsCharacters.hp[i] + 'hp');
				makeButton.append(makeText);

				makeButton.prepend('<p>' + starWarsCharacters.name[i] + '</p>');
				}
			

			$('.player-button').on(
				'click', function() {
				if (playerSelected === false) {
					$("#mycharacter").append(($(this)));
					$("#enemies").append($("#buttons"));
					$(this).find(".fullHealth").addClass("updatehp1");
					$(".available").removeClass("player-button");
					$(".available").addClass("defender-button");
					playerSelected = true;
				}			
			
					$('.defender-button').on('click', function() {
						if (defenderSelected === false) {
								
							$("#defender").append(($(this)));
							$(this).find(".fullHealth").addClass("updatehp2");
							$(this).find(".fullHealth").removeClass("updatehp1");
							$("#pmessage").empty();
							$("#dmessage").empty();
							defenderSelected = true;
						}
					});
			});			
			

			$("#attack").on('click', function() {
				
				if ($("#mycharacter").find(".fullHealth").hasClass("100hp")) {
					playerHealth = starWarsCharacters.hp[0];
					pname = starWarsCharacters.name[0];
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
					console.log($("#mycharacter").find(".100hp").data("num"));
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("120hp")) {
					playerHealth = starWarsCharacters.hp[1];
					pname = starWarsCharacters.name[1];
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("150hp")) {
					playerHealth = starWarsCharacters.hp[2];
					pname = starWarsCharacters.name[2];
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("180hp")) {
					playerHealth = starWarsCharacters.hp[3];
					pname = starWarsCharacters.name[3];
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#mycharacter").find(".fullHealth").hasClass("300hp")) {
					playerHealth = starWarsCharacters.hp[4];
					pname = starWarsCharacters.name[4];
					$("#pmessage").empty();
					$("#mycharacter").find(".fullHealth").removeClass("fullHealth");
				}
				else {
					$("#pmessage").text("No enemy here!");
				}
				
				if ($("#defender").find(".fullHealth").hasClass("100hp")) {
					defenderHealth = starWarsCharacters.hp[0];
					dname = starWarsCharacters.name[0];
					$("#dmessage").empty();
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("120hp")) {
					defenderHealth = starWarsCharacters.hp[1];
					dname = starWarsCharacters.name[1];
					$("#dmessage").empty();
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("150hp")) {
					defenderHealth = starWarsCharacters.hp[2];
					dname = starWarsCharacters.name[2];
					$("#dmessage").empty();
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("180hp")) {
					defenderHealth = starWarsCharacters.hp[3];
					dname = starWarsCharacters.name[3];
					$("#dmessage").empty();
					$("#defender").find(".fullHealth").removeClass("fullHealth");
				}
				else if ($("#defender").find(".fullHealth").hasClass("300hp")) {
					defenderHealth = starWarsCharacters.hp[4];
					dname = starWarsCharacters.name[4];
					$("#dmessage").empty();
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
						$("#message").text("You have been defeated...GAME OVER! ")
						$("#message").append($('<button>').text("Restart"));
						defenderSelected = false;
					}
					else if (defenderHealth <= 0 && playerWins == 3) {
						$("#defender").empty();
						$("#pmessage").text("You won!!!! GAME OVER!! ");
						$("#message").append($('<button>').text("Restart"));
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

			$('#message').on(
				'click', function() {
					location.reload();
				}
			);

});
