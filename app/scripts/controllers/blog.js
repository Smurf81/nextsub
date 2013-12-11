'use strict';

angular.module('nextsubApp')
  .controller('BlogCtrl', function ($scope, $http) {
    var firstPost = {
        title : 'POC NodeJS, Angular et MongoDB en 5 minutes',
        date : '09/12/2013',
        message : '<p>' +
            'Bonjour, je vais tester de mettre par écrit comment j\'ai mis en place une plateforme basé sur NodeJS assez facilement.' +
            '<br>' +
            '<br>' +
            '<h3>NodeJS</h3>' +
            'Commencez par installer <code>NodeJS</code>.' +
            '<p class="text-danger">Attention si vous utiliser les dépôts officiels de votre distrib, vous n\'aurez certainement pas la dernière version de Node.<br>' +
            ' Vous pouvez rajouter le PPA de Chris Lea avec la commande suivante :</p>' +
            '<pre><code>sudo add-apt-repository ppa:chris-lea/node.js</code><br><code>sudo apt-get update</code></pre>' +
            '<br>' +
            '<pre><code>sudo apt-get install nodejs</code></pre>' +
            'Vous devez avoir au moins un version 0.10 sinon les prochains outils ne marcheront pas. On teste avec ' +
            '<pre><code>nodejs --version</code></pre>' +
            '<br>' +
            'Avec NodeJS, nous avons un outil merveilleux qui s\'appel <code>npm</code> (Node Packaged Modules - un gestionnaire de paquets).' +
            ' Il va nous permettre d\'installer plein d\'outils à utiliser avec NodeJS. Pour l\'utiliser il suffit de faire un :' +
            '<pre><code>npm install -g package</code></pre>' +
            '<br> ' +
            '<h3>Yeoman</h3>' +
            '<br> ' +
            'le premier outil qui nous interesse s appelle <code>Yeoman</code>, il vous nous permettre de créer la structure de notre application en lui donnant juste son nom.' +
            'Yoeman se base sur Yo, Grunt et Bower.' +
            '<ul>' +
            '<br>' +
            '<li>Yo va créer la structure de notre application et écrire les fichiers de configuration Grunt</li>' +
            '<li>Grunt va construire notre application suivant les tâches écritent dans le fichier <g>Gruntfiles.js</g></li>' +
            '<li>Bower va installer les dépendances pour l\'application en téléchargeant les sources sur GIT</li>' +
            '</ul>' +
            'Un petit <pre><code>npm install -g yo</code></pre> et nous avons tous nos outils installés.<br><br>' +
            'Vous pouvez maintenant générer différents types d\'applications mais avant nous avons besoin de plugins yeoman ou "generators".' +
            'Le générateur qui nous intéresse s\'appel <code>generator-angular-fullstack</code>' +
            '<pre><code>npm install -g generator-angular-fullstack</code></pre>' +
            'Puis créez un répertoire' +
            '<pre><code>mkdir my-new-project && cd $_</code></pre>' +
            'Puis on lance la commande magique ( app-name est à remplacer par le nom de votre appli )' +
            '<pre><code>yo angular-fullstack [app-name]</code></pre>' +
            'On précise si on veut inclure Bootstrap, les modules Angular que l\'on veut inclure et enfin on précise si l\'on veut inclure MongoDB via Mongoose.<br>' +
            'Hop notre dossier vient de se remplir de plein de fichiers et répertoire.' +
            '<pre class="language-markup">' +
            '<code class="language-markup">' +
            '- app/                     ( Dossier de notre application Angular ) <br>' +
            '--- bower_components/      ( Dossier d\'install des composants bower ) <br>' +
            '--- index.html <br>' +
            '--- scripts/ <br>' +
            '------ controllers/ <br>' +
            '--------- main.js <br>' +
            '------ services/ <br>' +
            '------ app.js <br>' +
            '--- views/ <br>' +
            '------ main.html <br>' +
            '- bower.json               ( Fichier de configuration Bower des dépendances de l\'application )<br>' +
            '- Gruntfiles.js            ( Fichier de configuration Grunt pour le build de l\'application )<br>' +
            '- lib/ <br>' +
            '- node_modules/ <br>' +
            '- package.json             ( Fichier de configuration npm pour installer les modules/dépendances)<br>' +
            '- public/                  ( Dossier destination du build Grunt )<br>' +
            '- server.js                ( Fichier de configuration de NodeJS ) <br>' +
            '</code>' +
            '</pre>' +
            'Un petit ' +
            '<pre><code>grunt server</code></pre>' +
            'et notre serveur est lancé en localhost avec même un peu de responsive si on a ajouté Bootstrap.' +
            ' Le serveur va regarder les fichiers présents dans le répertoire <code>app/</code> et redémarrer le serveur si il détecte un changement.<br>' +
            'La commande ' +
            '<pre><code>grunt server:dist</code></pre>' +
            'va lancé le serveur en mode production cad avec mimification et l\'optimisation des CSS,JS,HTML,Images. ' +
            'Bien pratique pour tester vos optimisations avant de passer réellement en PROD.' +
            '<pre><p class="text-danger">Ne pas utiliser en production car si votre serveur tombe en erreur ( timeout,erreur de parsing, ... ), il s\'arrête tout simplement.' +
            'Nous verrons dans un autre post comment gérer la production pour avoir un service fonctionnel en continue.</p></pre>' +
            '<br>' +
            '<h3>Angular-Fullstack</h3>' +
            'Maintenant que notre serveur est démarré, on veut pouvoir rajouter des controllers/routes/services/directives/views/services facilement.' +
            '<code>angular-fullstack</code> nous propose tout cela trés facilement.' +
            'Par exemple, pour une route :' +
            '<pre><code>yo angular-fullstack:route [myRoute]</code></pre>' +
            'va générer un controller et une vue puis configurer le fichier <code>app/scripts/app.js</code> pour relier l\'ensemble.<br>' +
            'Le controller sera <code>app/scripts/controllers/myroute.js</code>' +
            '<pre><code>' +
            'angular.module(\'myApp\').controller(\'myRouteCtrl\',function($scope){' +
            '...' +
            '});' +
            '</code></pre>' +
            'Et une vue <code>app/views/myroute.html</code>.' +
            'L\'organisation est idéale pour un petit projet.<br>' +
            ' Par contre dés que tout cela grossit, il faudrait rajouter des répertoires en fonction des fonctionnalités ' +
            '( avec un IDE c\'est assez simple de faire une migration des fichiers ).' +
            '<h3>Grunt</h3>' +
            'Grunt va vous permettre de deployer votre application pour développer mais aussi de construire le build pour votre environnement de production. ' +
            'Il est basé sur des plugins et utiliser des tâches pour se lancer.<br>' +
            'Les plugins les plus intéressants sont les suivants :' +
            '<ul>' +
            '<li>grunt-contrib-concat : concaténation des fichiers</li>' +
            '<li>grunt-contrib-cssmin : compression des css</li>' +
            '<li>grunt-contrib-htmlmin : compression des html</li>' +
            '<li>grunt-contrib-imagemin : compression des images</li>' +
            '<li>grunt-contrib-uglify : compression des JS</li>' +
            '<li>grunt-contrib-watch : check les modifications sur les fichiers et relance ExpressJS </li>' +
            '<li>grunt-usemin : remplacement des references</li>' +
            '</ul>' +
            '<br>' +
            'Un exemple d\'utilisation de Grunt peut être le suivant. En dev, on utilise le fichier angular.js presént dans le répertoire <code>app/bower_components/angular/angular.js</code>' +
            'alors qu\'en prod on va utiliser les CDN google juste avec le code suivant :' +
            '<pre>' +
            '<code>' +
            '<span class="sh_symbol">&lt;!--</span> build:js //ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.min.js <span class="sh_symbol">--&gt;</span><br>'+
            '<span class="sh_symbol">&lt;</span>script src="bower_components/angular/angular.js"></script><br>'+
            '<span class="sh_symbol">&lt;!--</span> endbuild <span class="sh_symbol">--&gt;</span>' +
            '</code>' +
            '</pre>' +
            '<h3>ExpressJS</h3>' +
            '<code>Angular-fullstack</code> se base sur <code>ExpressJS</code> un framework un peu plus simple d\'accès à programmer que NodeJS.' +
            ' Il offre des fonctionnalités intéressantes pour la gestion des routes notamment. Voici le fichier <code>server.js</code>:' +
            '<pre>' +
            '<code>' +
            'var express = require(\'express\'),                        //déclaration de express<br>' +
            'path = require(\'path\'), <br>' +
            'fs = require(\'fs\'); <br>' +
            '<br>' +
            'var app = express();<br>' +
            '<br>' +
            'var db = require(\'./lib/db/mongo\');                      // connection à la base mongo<br>' +
            '<br>' +
            'var modelsPath = path.join(__dirname, \'lib/models\');     // Bootstrap Model<br>' +
            'fs.readdirSync(modelsPath).forEach(function (file) {<br>' +
            '  require(modelsPath + '/' + file);<br>' +
            '});<br>' +
            '<br>' +
            'require(\'./lib/db/dummydata\');                           // Chargement des données<br>' +
            '<br>' +
            'var api = require(\'./lib/controllers/api\');              // Controllers <br>' +
            '<br>' +
            'app.get(\'/api/awesomeThings\', api.awesomeThings);        // Route : si le server reçoit un GET sur /api/awesomeThing,<br>' +
            '                                                           // il va faire appel à la méthode awesomeThings du controller' +
            '                                                           // api défini au dessus<br>' +
            'var port = process.env.PORT || 3000;                       // Démarrage du serveur sur le port défini par l\'environnement' +
            '                                                           // (via Grunt) sinon on prend le port 3000<br>' +
            'app.listen(port, function () {<br>' +
            '   console.log(\'Express server listening on port %d in %s mode\', port, app.get(\'env\'));<br>' +
            '});<br>' +
            '</code>' +
            '</pre>' +
            '' +
            '</p>'
    }

        $scope.post = firstPost;
  });
