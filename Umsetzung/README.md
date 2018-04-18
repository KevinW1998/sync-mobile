# Die beschte Einkaufsliste der Welt

Jeweils `client` und `server` sind mit node.js/npm konfiguriert. Vorraussetzung für diese Aufgabe ist Node.js 6 oder höher.

Um alle Abhängigkeiten zu installieren muss `npm install` auf dem jeweiligen Subprojekt ausgeführt werden.

* `server` - Beinhaltet den diffsync-server. Kann mit `npm start` gestartet werden.
* `client` - Beinhaltet den diffsync-client. Die HTML-Website ist in `dist/index.html` vorzufinden. Damit NPM-Packages mit dem Webbrowser funktionieren wurde `webpack` verwendet. Um index.html aufzurufen müssen die JavaScript-Dateien im `src`-Ordner vom webpack transpiliert werden. Dazu muss `npm start` ausgeführt werden. Danach kann man die Website `dist/index.html` aufrufen.

## Testen
* Sicherstellen das bei beiden Subprojekten `npm install` aufgerufen wurde
* Konsole öffnen und im Ordner `server` `npm start` ausführen.
* Eine weitere Konsole öffnen und im Ornder `client` `npm start` ausführen. Warten bis das Transpilieren fertig ist.
* Dann `npm run server`, sodass ein HTTP-Server für den Client erstellt wird. Der Link wird in der Konsole angezeigt.
* Den gegeben Link aufrufen und die Browser-Konsole öffnen. 
* Konsole sollte nun `starting sync service` und `Verbunden!` anzeigen.

### Weitere Resourcen

* [diffsync](https://github.com/janmonschke/diffsync)
* [EventTarget.addEventListener](https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener)