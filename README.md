# MANUEL D'INSTALLATION

---

### Outils

+ Telecharger et installer [NodeJs](https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi)
+ Télecharger et installer [google Chrome](https://www.google.com/intl/fr_fr/chrome/)

---

### Environnement docker

   1. Récupérer Dockerfile et docker-compose.yml
   2. docker-compose build
   3. docker-compose up -d
   4. Cloner le projet dans un dossier /dev, lui même dans le répertoire des fichiers docker.

---

### Dépendances Ionic

+ Dans un terminal executez la commande `npm install `

---

### Symfony

+ Configurer le back end en passant par les etapes suivantes :

   1. Telecharger et installer [Composer](https://getcomposer.org/Composer-Setup.exe)
   2. Telecharger et installer [Symfony](https://get.symfony.com/cli/setup.exe)


---

### Installation

##### Symfony

   + Dans un terminal executez les commandes :
      
      1. `composer install`
      2. `symfony console doctrine:database:create`
      3. `symfony console doctrine:schema:update --force`
      4. `symfony console doctrine:migrations:migrate`
      5. `symfony console doctrine:fixtures:load`
      6. `symfony serve`

