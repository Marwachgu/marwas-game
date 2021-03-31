'use strict';

window.addEventListener('DOMContentLoaded', function(){

    console.log('Document loaded');

    var canvasElement = document.getElementById('jeuCanvas');
    var context = canvasElement.getContext('2d');
    
    // paramètres du canvas 
    canvasElement.width=600;
    canvasElement.height=300;
    canvasElement.style.margin= 'auto';
    canvasElement.style.background= '#fadd34';
  
 
    // Variables
    var ilSaute = 0;
    
    //Compétences à afficher chaque 3 sauts
    let competences = ['0','HTML/CSS', ' Javascript ', ' Angular ', ' Bootstrap', 'Node', 'GAGNÉ!!']
    
    //Mon personnage rectangle rouge
    let personnage = {
        position: {
            x: 10,
            y: 255,
        },
    };

    function drawPersonnage () {
        context.fillStyle = 'rgb(236,81,54)';
        // j'ai relié les attributs de mon objet personnage au context fill rect
        context.fillRect(personnage.position.x, personnage.position.y, 20, 45);
        context.fill();
    }

    context.save();

    context.restore();

  
   //Gestion du saut

   //détection de clique sur espace
    document.body.onkeyup = function(e) {
     console.log('clique sur espace')
        
    //la valeur 32 correspond à l'espace. 
        if (e.keyCode ===32 ){
            ilSaute++;
                saut()
                    }
    personnage.position.y = 90
        setTimeout(function(){ personnage.position.y = 255
            return }, 200); } 
 //definition de la fonction saut
        function saut(){
               if (personnage.position.y < 150) {
            personnage.position.y = 255
           
        } else {
            personnage.position.y -= 5;
        }} 
        
        

    //Mon obstacle rectangle blanc
    let obstacle = {
        position: {
            x: 600,
            y: 280,
        },
    };

    function drawObstacle () {
        context.fillStyle = 'rgb(255,255,255)';
        // j'ai relié les attributs de mon objet obstacle au context fill rect
        context.fillRect(obstacle.position.x, obstacle.position.y, 20, 20);
        context.fill();
    }


    //Gestion du "score", j'ai choisi de mettre mes compétences en tant que score. Chaque 3 sauts une compétence s'affiche
    function score () {
      
        if(ilSaute == 0)
        {
            document.getElementById("score").innerHTML = competences[0];
        }
        if(ilSaute == 3)
        {
            document.getElementById("score").innerHTML = competences[1];
        }
        if(ilSaute == 6)
        {
            document.getElementById("score").innerHTML = competences[2];
        }
        if(ilSaute == 9)
        {
            document.getElementById("score").innerHTML = competences[3];
        }
        if(ilSaute == 12)
        {
            document.getElementById("score").innerHTML = competences[4];
        }
        if(ilSaute == 15)
        {
            document.getElementById("score").innerHTML = competences[5];
        }
        if(ilSaute == 18)
        {
            document.getElementById("score").innerHTML = competences[6];
        }
          
    }

    //Gestion fin du jeu
    function gameOver () {
        context.fillStyle = 'rgb(0,0,0)';
        context.font = "50px Arial";
        context.fillText("Game Over", 100, 100);
        context.fill();
    }
    context.save();

    context.restore();

    //Gestion de la collision entre personnage et obstacle / Gestion de la trajectoire de mon obstacle
   var interval =  setInterval(() => {
        
        context.clearRect(0, 0, 626, 313)
      
        drawPersonnage();
        drawObstacle();
        score();

        var rect1 = {x: personnage.position.x, y: personnage.position.y, width: 20, height: 45}
        var rect2 = {x: obstacle.position.x, y: obstacle.position.y, width: 20, height: 20}

        if (rect1.x < rect2.x + rect2.width && 
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
    clearInterval(interval);
    gameOver();
}


        // Si l'obstacle est à gauche il retourne à droite
        if (obstacle.position.x < -20) {
            obstacle.position.x = 600
        } else {
            // Sinon il continu son trajet vers la gauche
            obstacle.position.x -= 5;
        }
    }, 10)

   
});
