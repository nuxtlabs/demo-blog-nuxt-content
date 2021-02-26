---
title: Evitez d'utiliser la fonction array_merge dans une boucle en PHP
img: https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2012/04/Blog_What-is-php.jpg
alt: nice image
author: 
  name: ajdaini-hatim
  bio: All about Baby Yoda and what he does and where he works
  img: https://images.unsplash.com/photo-1533636721434-0e2d61030955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
tags: 
  - docker
---

Je vois assez souvent dans du code PHP l'utilisation de la fonction `array_merge` dans des boucles `for`/`foreach`/`while` 😱 :

```
$arraysToMerge = [ [1, 2], [2, 3], [5, 8] ];

$arraysMerged = [];
foreach($arraysToMerge as $array) {
    $arraysMerged = array_merge($arraysMerged, $array);
}
```

Cette habitude est particulièrement mauvaise car **les performances peuvent devenir désastreuses** (surtout sur l'utilisation mémoire).

Depuis PHP 5.6, il y a un nouvel opérateur : **l'opérateur de décomposition** (ou spread operator).

```
$arraysToMerge = [ [1, 2], [2, 3], [5,8] ];

$arraysMerged = array_merge([], ...$arraysToMerge);
```

-   Plus de problème de performance
-   BONUS : Plus de boucle `for`/`foreach`/`while`
-   BONUS : Traitement effectué en **une ligne**

Regardez maintenant votre base de code, je suis sur que vous pourrez trouver des endroits à améliorer 👩‍💻👨‍💻 !