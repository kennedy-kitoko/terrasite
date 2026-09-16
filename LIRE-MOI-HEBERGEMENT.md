# Terra AI — Site bilingue anglais / français

Cette archive contient le site vitrine complet et ses fichiers modifiables. Il s’agit d’un site statique : aucun compte ChatGPT, aucune base de données et aucune étape de compilation ne sont nécessaires pour l’héberger.

## Ouvrir le site

1. Décompressez l’archive dans un dossier.
2. Ouvrez `index.html` dans votre navigateur pour la version anglaise, ou `fr.html` pour la version française.
3. Ouvrez `protocol.html` ou `protocole.html` pour la page dédiée au protocole Terra.
4. Les boutons EN et FR changent de langue en conservant la page et la section consultées.

## L’héberger sur votre serveur

Copiez **le contenu du dossier décompressé** dans le répertoire web de votre hébergement. Les quatre pages HTML, `styles.css`, `protocol.css`, `visuals.css`, `technology.css`, `app.js`, `i18n.js`, `videos.js` et le dossier `assets` doivent conserver leurs positions relatives.

Utilisez `index.html` comme page d’accueil. Le site fonctionne à la racine d’un domaine ou dans un sous-dossier. Aucune variable d’environnement, clé API ou connexion à Sites n’est nécessaire.

Si vous souhaitez faire un essai via un serveur local et que Python est installé, ouvrez un terminal dans ce dossier et lancez :

```bash
python -m http.server 8080
```

Puis ouvrez `http://localhost:8080` dans votre navigateur. Cette commande sert uniquement à une vérification locale ; pour un site public, utilisez votre hébergement web habituel.

## Fichiers à modifier

- `index.html` : textes, structure, liens et galerie en anglais.
- `fr.html` : version française de la page.
- `protocol.html` et `protocole.html` : page dédiée au protocole Terra, dans les deux langues.
- `styles.css` : couleurs, typographie et mise en page responsive.
- `protocol.css` : mise en page de la page du protocole.
- `visuals.css` : écosystème en grand, étapes illustrées, actualités et recommandations.
- `PHOTO-CREDITS.md` : sources et licences des photographies d’illustration à conserver.
- `app.js` : navigation, parcours interactifs, galerie et lien de la vidéo principale.
- `technology.css` : matériel connecté, TerraSoil et vidéothèque.
- `videos.js` : lecteur vidéo intégré, fermeture et liens YouTube de secours.
- `i18n.js` : traductions françaises des parcours interactifs et des commandes.
- `assets/` : photographies, logo et PDF initial fourni pour le projet.

Le PDF joint est le document source initial en anglais, conservé tel qu’il a été fourni. Il peut comporter des informations antérieures aux modifications du site. La version française concerne les pages du site et leurs interactions, pas une traduction du PDF. Les schémas et supports d’essais fournis sont conservés dans leur langue d’origine, avec une légende traduite.

## Vidéos YouTube

La vidéo de présentation est déjà configurée. Pour la remplacer, modifiez cette ligne dans `app.js` :

```js
const TERRA_VIDEO_URL = 'https://youtu.be/OK0nKGFt8v4';
```

Le bouton de la zone vidéo en haut de page ouvre le lecteur intégré, dans les deux versions du site. Les huit vidéos sont regroupées dans la section Vidéos ; la page du protocole propose aussi le déploiement accompagné par un agronome. Les liens YouTube classiques, `youtu.be`, Shorts et Live sont reconnus.

## Galerie d’expériences

La galerie propose un défilement horizontal, des flèches, le balayage tactile et un bouton de lecture/pause. Le défilement automatique s’arrête pendant une interaction et respecte la préférence de réduction des animations du navigateur.

Pour ajouter des photos, placez les images dans `assets/`, puis ajoutez un bloc `figure` de classe `gallery-item` dans la galerie de **chacune des deux pages**. Traduisez sa légende et son texte alternatif. Le script reconnaît automatiquement le nombre de photos.

## Connexions externes

Les fichiers du site et les photos du projet sont inclus. La miniature du Short d’installation fournie par YouTube est chargée à distance, avec une photo locale de secours si elle ne peut pas être chargée. Google Fonts fournit les polices lorsqu’une connexion internet est disponible ; le site utilise sinon des polices de remplacement. Les vidéos intégrées YouTube nécessitent internet. Elles ne sont pas téléchargées dans cette archive. Le lien « Ouvrir sur YouTube » reste disponible si la lecture intégrée est indisponible. Le lien de contact ouvre l’application de messagerie du visiteur.

La copie hébergée sur votre propre serveur dépend des règles d’accès de votre hébergeur. Le contrôle d’accès privé de la version Sites n’est pas inclus dans ces fichiers.

## Photos et publications

Les dix étapes du protocole comprennent chacune une photographie. Les photos d’illustration du web sont créditées sur la page et dans `PHOTO-CREDITS.md` ; conservez les crédits et les liens de licence lorsque vous hébergez ou redistribuez le site. Les images sont incluses dans cette archive, sans chargement externe.

La section Actualités et reconnaissance comprend le stand Terra, la demi-finale HICOOL 2026 et la publication de BIT. La capture de la publication reste consultable en grand dans sa langue d’origine. Le classement indiqué (14e en Chine, ShanghaiRanking 2026) concerne l’université.

## Références du matériel et de TerraSoil

- RAK3112 : https://docs.rakwireless.com/product-categories/wisduo/rak3112-module/datasheet/
- ESP32-S3 et accélération IA : https://www.espressif.com/en/products/socs/esp32-s3
- Kit solaire WisGate : https://store.rakwireless.com/products/wisgate-edge-pro-battery-plus-solar-panel-kit
- TerraSoil : https://terrasoil.netlify.app/
- Sources de TerraSoil : https://github.com/kennedy-kitoko/TerraSoil
- Inscription au registre Arduino vérifiée : https://github.com/arduino/library-registry/blob/main/repositories.txt

Le film PINN / ANN est présenté comme un travail de recherche sur la calibration. Le protocole de nutrition publié conserve Terra Lab et la validation de l’agronome comme références.
