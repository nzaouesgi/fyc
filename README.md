# FYC: application de test

Cette application a été créée pour illustrer les vulnérabilités abordées dans le cours FYC portant sur la sécurité des applications web.

## Branches

Vous pouvez vous baser sur deux branches différentes pour tester l'application:

- La branche master contient une version vulnérable de l'application.
- La branche secure contient une version corrigée de l'application.

## Installation

Cette application nécessite uniquement Node.js pour fonctionner.

Attention, pour des raisons pratiques et pour faciliter le lancement de l'application, de nombreuses propriétés applicatives sont codées en dur dans le code. Elles seront annotées spécialement pour rappeler que ce genre de pratique ne doit pas avoir lieu dans une application réelle.

Pour lancer l'application, on fait un coup de `npm install`, puis `npm start`.

Si on veut faire des changements pour effectuer différents test, on peut utiliser `npm run watch` pour que l'application redémarre à chaque modification du code.

La variable d'environnement NODE_ENV est la seule ayant un réel impact sur le fonctionnement de l'application.

## Vulnérabilités

De nombreuses vulnérabilités sont présentes dans la branche `master`.

On trouve notamment:

- De l'XSS enregistré, à la fois basé sur le DOM, mais aussi (et surtout) basé sur de l'absence d'encodage sur les pages générées par le serveur.
- Du CSRF, sur tous les formulaires
- Des problématiques de contrôle d'accès
- Un systèmes de hashage de mot de passe douteux
- Des injections SQL sur une grande majorité des fonctionnalités impliquant des actions sur les données persistantes.

Vous pouvez vous amuser, c'est 100% légal !

## Challenge (vulnérabilité secrète)

Si cela vous tente, il existe une vulnérabilité cachée dans l'application. Celle-ci est particulièrement dangereuse car elle permet de faire de l'exécution de code arbitraire directement sur le serveur...

Petit indice: elle est liée à une des fonctionnalités de l'API utilisateur.

Et non, elle n'a pas été corrigée dans la branche `secure`, ce serait trop simple sinon ! :)

Vous avez trouvé ? Voici la réponse en base64:

```
TGEgdnVsbsOpcmFiaWxpdMOpIHNlIHRyb3V2ZSBkYW5zIGxlIHN5c3TDqG1lIGQndXBsb2FkIGRlIGZpY2hpZXIgZHUgcHJvZmlsIHV0aWxpc2F0ZXVyLgoKSWwgZXN0IHBvc3NpYmxlIHBvdXIgdW4gYXR0YXF1YW50IGQnaW5zw6lyZXIgZGVzIGNoZW1pbnMgY29tcGxldCBkYW5zIGwnYXR0cmlidXQgYGZpbGVuYW1lYCBkdSBjaGFtcCBkZSBib2R5IG11bHRpcGFydCBlbnZvecOpIHBvdXIgdXBsb2FkZXIgdW5lIHBob3RvIGRlIHByb2ZpbC4gQ2UgYGZpbGVuYW1lYCBlc3QgZGlyZWN0ZW1lbnQgdXRpbGlzw6kgcG91ciBjcsOpZXIgbGEgY29waWUgZHUgZmljaGllciBjw7R0w6kgc2VydmV1ci4gSWwgeSBhIGljaSB1bmUgcG9zc2liaWxpdMOpIGRlICJEaXJlY3RvcnkgVHJhdmVyc2FsIiwgYydlc3Qgw6AgZGlyZSBxdWUgbCdhdHRhcXVhbnQgcGV1dCByZW1vbnRlciBkYW5zIGwnYXJib3Jlc2NlbmNlIGR1IHN5c3TDqG1lIGRlIGZpY2hpZXIgZ3LDomNlIMOgIGRlcyBjaGHDrm5lcyBgLi4vYCBqdXNxdSfDoCBjZSBxdSdpbCB0b21iZSBkYW5zIHVuIHLDqXBlcnRvaXJlIHF1aSBsJ2ludMOpcmVzc2UsIGV0IGZpbmFsZW1lbnQgeSBkw6lwb3NlciBsZSBub3V2ZWF1IGZpY2hpZXIuIEF1c3NpLCBsZSBub20gY29tcGxldCBkdSBmaWNoaWVyIGVzdCB1dGlsaXPDqSBwb3VyIGxlIG5vbSBkZSBsYSBjb3BpZSwgcXVlbGxlIHF1ZSBzb2l0IGwnZXh0ZW5zaW9uIChsZXMgc2V1bGVzIHbDqXJpZmljYXRpb25zIGRlIGwnZXh0ZW5zaW9uIHNvbnQgZmFpdGVzIHN1ciB1biBzY3JpcHQgY2xpZW50KS4KCk9uIHBldXQgZG9uYyB1cGxvYWRlciBuJ2ltcG9ydGUgcXVlbCBmaWNoaWVyIHN1ciBsZSBzZXJ2ZXVyIChob3JzIGNvbmZsaXRzIGRlIHBlcm1pc3Npb25zKS4KCkwnZXjDqWN1dGlvbiBkZSBjb2RlIGFyYml0cmFpcmUgcGV1dCBzZSBmYWlyZSBhc3NleiBmYWNpbGVtZW50IGVuIMOpY3Jhc2FudCB1biBmaWNoaWVyIGAuZWpzYCBjb250ZW5hbnQgdW4gdGVtcGxhdGUgRUpTLiBMZSBidXQgZGUgbCdhdHRhcXVhbnQgc2VyYSBkZSByw6nDqWNyaXJlIHVuZSB2ZXJzaW9uIHZhbGlkZSBzeW50YXhpcXVlbWVudCBldCByZWNvcGlhbnQgbGEgcGFnZSBvcmlnaW5hbGUgcG91ciDDqXZpdGVyIGRlIGNhc3NlciBsZSBzaXRlIChldCDDqXZlaWxsZXIgbGVzIHNvdXDDp29ucyksIGVuIGludMOpZ3JhbnQgw6AgbCdpbnTDqXJpZXVyIHVuZSBzaW1wbGUgYmFsaXNlIDwlIC4uLmNvZGUuLi4gJT4gZGVzdGluw6llIMOgIGNvbnRlbmlyIGR1IGNvZGUgYXJiaXRyYWlyZS4gQ2VydGFpbmVzIEFQSXMgTm9kZSBuZSBzZXJvbnQgcGFzIGRpcmVjdGVtZW50IGRpc3BvbmlibGVzLCBtYWlzIGlsIHBldXQgYWNjw6lkZXIgw6AgdG91dGUgbGEgY2hhw65uZSBkJ2luY2x1c2lvbiBkZSBtb2R1bGVzIHZpYSBsJ29iamV0IGBtYWluTW9kdWxlYC4gCgpDJ2VzdCB1biB0csOocyBib24gZXhlbXBsZSBwb3VyIGlsbHVzdHJlciBsZSBmYWl0IHF1J2lsIG5lIGZhdXQgamFtYWlzIHLDqXV0aWxpc2VyIGxlcyBtw6l0YWRvbm7DqWVzIGQndW4gZmljaGllciB1cGxvYWTDqSBwYXIgdW4gdXRpbGlzYXRldXIgcG91ciBjcsOpZXIgc2EgY29waWUgc3VyIHVuIHN5c3TDqG1lIGRlIGZpY2hpZXIgY8O0dMOpIHNlcnZldXIuIFRvdXRlcyBjZXMgbcOpdGFkb25uw6llcyBkb2l2ZW50IGFsbGVyIHVuaXF1ZW1lbnQgZW4gYmFzZSBkZSBkb25uw6llcyBzaSBlbGxlcyBzb250IG7DqWNlc3NhaXJlcyBwb3VyIGwnYXBwbGljYXRpb24uIExlIG5vbSBkZSBmaWNoaWVyLCBlbiBsJ2VzcMOoY2UsIGRvaXQgYWJzb2x1bWVudCDDqnRyZSBjaG9pc2kgcGFyIGxlIHNlcnZldXIgKG5vbSBhbMOpYXRvaXJlIHBhciBleGVtcGxlKSBhdmFudCBkJ8OqdHJlIGVucmVnaXN0csOpIHN1ciBsZSBzZXJ2ZXVyLgo=
```

