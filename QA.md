# WakeUp Hybrid 2.0 – Prüfprotokoll

Datum: 06.11.2026. Ausgangscommit: `db06ee3948dbc6f84270c2d3c5527b16013afded`.

## Ergebnis

- 25 automatisierte Node-Tests bestanden, 0 fehlgeschlagen.
- JavaScript-Syntaxprüfung für app.js, core.js und sw.js bestanden.
- PNG: beide Größen, sämtliche Chunk-Prüfsummen und vollständige RGB-Dekompression bestanden.
- Statische Asset-Verweise und Manifest geprüft.
- Echter Chromium-Browserdurchlauf über die verwaltete HTTP-Vorschau durchgeführt.
- Keine behauptete Prüfung auf dem persönlichen iPhone. Native Wecker, Sperrbildschirm, Audioqualität, reale Sensorberechtigung und Offline-Installation unter iOS müssen am Gerät getestet werden.
- Der HTTP-Vorschauursprung ist kein sicherer Kontext für Service Worker. Deshalb dort ausdrücklich „Offline nicht verfügbar“. Offline-Routing wurde automatisiert mit einem Worker-Testkontext geprüft; HTTPS-Ende-zu-Ende-Offlineprüfung ist noch offen, bis Pages aktiviert ist.

## Gezielte Prüf- und Verbesserungsdurchläufe

| Nr. | Schwerpunkt | Prüfung / festgestellte Verbesserung | Ergebnis |
|---|---|---|---|
| 1 | Iststand | Aktueller main-Commit und alle bestehenden Dateien geprüft | Ausgangsstand bestätigt |
| 2 | Architektur | Apple-Kurzbefehle, iOS-26-Uhr und AlarmKit dokumentationsgestützt abgegrenzt | Hybrid beibehalten |
| 3 | Publishing | Configure-Pages-Fehler und fehlende angemeldete Browser-Sitzung geprüft; buildloses Branch-Deploy vorbereitet | Aktivierung durch Besitzer offen |
| 4 | Icons | Original-PNGs vollständig decodiert; 512er hatte IDAT-CRC-Fehler; Icons neu gerendert | Beide repariert und geprüft |
| 5 | Profilvalidierung | Wertebereiche, Uhrzeiten, IDs, Duplikate, unbekannte Klänge | Tests 1, 2, 15 bestanden |
| 6 | Zeitrechnung | Mitternacht, Schlafzeitfenster, Folgealarme am nächsten Tag | Tests 3, 4 bestanden |
| 7 | Zustandsautomat | Wiederholtes Starten und zu frühe zweite Bestätigung verhindert | Tests 5–7 bestanden |
| 8 | Pausen | Freie Dauer, Limit einschließlich Null, Wiederaufnahme | Tests 8, 9 und Browser bestanden |
| 9 | Unterbrechungen | Serialisierung, Neuladen, Frist bleibt erhalten | Test 10 und Browser bestanden |
| 10 | Abgelaufene Routinen | Nach zwei Stunden kein falscher Erfolg | Test 11 bestanden |
| 11 | Statistik | Leere Werte, Abbrüche im Nenner, aktive Routinen getrennt | Tests 12, 13 bestanden |
| 12 | Datenmigration | Alte Historie und aktive Routine; fehlende Messwerte nicht erfunden | Tests 14, 23 bestanden |
| 13 | Sicherheit | HTML-Escaping, ungültige Imports, unrealistische Datumswerte | Tests 15, 16, 24 bestanden |
| 14 | Empfehlungen | Regelhinweise nur anhand echter Einträge, keine automatische Profiländerung | Test 17 bestanden |
| 15 | Langzeitdaten | Historie auf 1000 begrenzt, Backup/Restore und CSV eingerichtet | Test 18 bestanden; Import-Dateidialog nicht E2E geprüft |
| 16 | Offline-Paket | Relative Pfade und vollständiger Precache | Tests 19, 20 bestanden |
| 17 | Offline-Routing | Kurzbefehle-Query auf Shell, andere Apps nicht abfangen | Tests 21, 22 bestanden |
| 18 | Formularaktionen | Klangtest löste ungewollten Submit aus; explizite Button-Typen ergänzt | Test 25 plus Browser: ungespeicherter Name bleibt ungespeichert |
| 19 | Browser-Workflow | Profil gespeichert, Routine gestartet, erste Bestätigung, Reload, echte Wartezeit, zweite Bestätigung | Erfolg in Statistik exakt einmal angezeigt |
| 20 | Audio / Profile | Klangphasen gestartet/gestoppt; Profilkopie; unsicherer HTTP-Kontext ohne randomUUID-Funktion berücksichtigt | UI-Status und Kopie im Browser bestätigt |
| 21 | Darstellung | Desktop-Screenshot visuell geprüft; mobile Breakpoints, Safe Areas, Zoom, Fokus und reduzierte Bewegung im Code geprüft | Desktop geprüft; echter iPhone-Layouttest offen |
| 22 | Regression | Gesamte Testsuite nach Korrekturen erneut ausgeführt | 25/25 plus Assets und Syntax bestanden |

Die Durchläufe umfassen gezielte Tests und Korrekturen; sie sind keine Behauptung von 22 kompletten Gerätetestzyklen. Die im Browser verwendeten Beispieldaten gehören nur zur lokalen QA-Vorschau und werden nicht veröffentlicht.

## Noch notwendiger Veröffentlichungsabschluss

In GitHub Settings → Pages einmal **Deploy from a branch → main → /(root) → Save** auswählen. Die verbundene GitHub-Schnittstelle stellt keine Pages-Admin-Schreiboperation bereit. Die Cloud-Browser-Sitzung war nicht angemeldet. Es wurde kein Token angefordert, kein Geheimnis in einen Workflow geschrieben und keine erfolgreiche Veröffentlichung behauptet.

Anschließend: Pages-Deployment grün, öffentliche HTTPS-URL abrufen, installieren, „Offline bereit“ prüfen, Flugmodus-Neustart testen. Die automatisch laufende Qualitätspipeline ersetzt diesen Gerätetest nicht.
