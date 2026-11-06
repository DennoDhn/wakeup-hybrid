# WakeUp Hybrid 2.0

Ein ruhiger Start in den Tag: Die **native iPhone-Uhr weckt**, WakeUp begleitet danach das tatsächliche Aufstehen. Kostenlose statische PWA, keine Konten, keine Backend-Abhängigkeit, keine Cloud-KI, keine QR-Aufgaben.

**Geplante öffentliche Adresse:** https://dennodhn.github.io/wakeup-hybrid/ (erst nach Aktivierung von GitHub Pages erreichbar).

## Einmalige Veröffentlichung

Repository → **Settings → Pages → Source: Deploy from a branch → main → /(root) → Save**.

Der zuvor fehlgeschlagene `Configure Pages`-Schritt wurde entfernt. Für diese buildlose App ist die Branch-Veröffentlichung einfacher. Der Workflow `.github/workflows/pages.yml` führt nun ausschließlich Qualitätstests aus. GitHub erzeugt den Pages-Deployment-Workflow automatisch, sobald die Einstellung aktiviert ist. Künftige Änderungen an `main` werden automatisch veröffentlicht.

## Enthalten

- Ruhige responsive Oberfläche mit Heute, Routine, Profile, Verlauf und Einrichtung.
- Fünf editierbare Profile; Duplikate für eigene Termine (maximal 20).
- Zweistufige Wachbestätigung mit gespeicherten absoluten Zeitpunkten, Fortsetzen nach Neuladen, Ablauf nach zwei Stunden.
- Einstellbare PWA-Pausen mit Höchstzahl; keine behauptete Kontrolle über native Schlummerereignisse.
- Drei synthetische Melodieprofile, lokal erzeugter Regen und Meeresklang. Sanfte Ein-/Ausblendung, Klangphasen und Stille, Lautstärkeregler. Maximal fünf Minuten Wiedergabe, Stopp im Hintergrund.
- Optionale deutsche Sprachausgabe und persönliche Begrüßung; installierte Systemstimmen und deren Offline-Verfügbarkeit hängen vom Gerät ab.
- Optionale Bewegungserkennung mit expliziter Berechtigungsanfrage; sie erkennt nur Gerätebewegung, niemals zuverlässig das Aufstehen.
- Abend-Checkliste pro Datum, Profil und Alarmplan. Rechnerisches Schlafzeitfenster, keine Schlafmessung.
- Erfolgsquote, erste Bestätigungsdauer, 7/14/28-Tage-Auswertung und Profilvergleich. Abbrüche und abgelaufene Routinen zählen mit.
- Nachvollziehbare lokale Empfehlungen ab drei neuen Routinen.
- JSON-Sicherung und validierter Import mit Bestätigung; CSV-Export. Historie bis 1000 Einträge.
- Migration alter Einstellungen, abgeschlossener und laufender Routinen ohne erfundene Messwerte.
- Offline-App-Shell, Updates mit ausdrücklichem Übernehmen, abgeschlossene PNG-Integritätsprüfung.
- Deutsche iPhone-/Kurzbefehle-Anleitung direkt in der App.

## iPhone in wenigen Schritten

1. Nach Veröffentlichung die Adresse in Safari öffnen → Teilen → Zum Home-Bildschirm.
2. Installierte App online öffnen, „Offline bereit“ abwarten; anschließend einmal im Flugmodus öffnen und testen.
3. Profil auswählen. Hauptalarm und zwei Folgealarme **in der Uhr-App** einstellen. Die App zeigt die dafür vorgesehenen Uhrzeiten.
4. Optional Kurzbefehle → Automation → Wecker → Hauptalarm „Gestoppt“ → Mitteilung anzeigen. Optional URL `https://dennodhn.github.io/wakeup-hybrid/?routine=1` öffnen. Für „Schlummern“ eine eigene Mitteilungsautomation anlegen.
5. Testalarm für zwei Minuten später einstellen und bei gesperrtem Bildschirm prüfen. Die PWA erst nach dem Wecken starten.

Safari und installierte PWA können getrennte Speicher verwenden. Die sichere Standardintegration erinnert deshalb daran, die installierte App selbst zu öffnen. Ein URL-Aufruf kann Safari öffnen und benötigt gegebenenfalls Entsperren. `?routine=1` öffnet nur die Routinenansicht, startet keine Messung und spielt keinen Ton ohne Berührung ab.

## Grenzen und Architekturentscheidung

Eine PWA kann bei gesperrtem iPhone oder angehaltener Hintergrundausführung keinen zeitgenauen Wecker garantieren. Es gibt hier **keinen JavaScript-Hintergrundalarm**, keine Web-Push-Alarmversprechen und keinen Server. Der Sekunden-Takt aktualisiert ausschließlich die geöffnete Ansicht anhand gespeicherter Zeitpunkte.

Apple bietet AlarmKit ab iOS 26 für native Apps an; es ist keine Web-API. Daraus ergibt sich kein kostenloser, unkomplizierter nativer Veröffentlichungsweg für dieses eigene GitHub-Projekt ausschließlich am iPhone. Deshalb bleibt die Hybrid-Architektur. Die installierte iOS-Version und reale Alarm-/Automationsfunktion wurden nicht am persönlichen Gerät geprüft.

Native Alarme werden weder ausgelesen, erstellt noch abgeschaltet. Ein als erfolgreich markierter Morgen bedeutet zwei ausdrückliche Nutzerbestätigungen, nicht nachgewiesenes Verlassen des Betts. Die zweite Kontrolle wird im Hintergrund nicht garantiert angekündigt. **Unabhängige Uhr-Alarme vorher einstellen.**

Apple dokumentiert „Gestoppt“ und „Schlummern“ als Ereignisse. Die konkreten Beschriftungen unterscheiden sich je nach iOS-Version. Unter iOS 26 lässt sich die native Schlummerdauer in der Uhr einstellen. Diese Funktion ist unabhängig von der PWA-Pause.

Quellen (geprüft am 06.11.2026):
- [Apple: Ereignisauslöser in Kurzbefehle](https://support.apple.com/de-de/guide/shortcuts/apd932ff833f/ios)
- [Apple: Automationen ohne Rückfrage](https://support.apple.com/de-de/guide/shortcuts/apd602971e63/ios)
- [Apple: Uhr-Wecker](https://support.apple.com/de-de/guide/iphone/iph2909d3a74/ios)
- [Apple: AlarmKit, WWDC25](https://developer.apple.com/videos/play/wwdc2025/230/)
- [GitHub: Pages-Veröffentlichungsquelle](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Datenschutz und Datensicherheit

Alle Einstellungen und Routinen werden im lokalen Browser gespeichert. Keine Analyse-Skripte, externen Fonts, Sound-Downloads oder CDNs. GitHub verarbeitet beim Online-Abruf die für das Hosting notwendigen Verbindungsdaten. Browser-/Gerätedaten können gelöscht werden; JSON-Backups sind wichtig. Private Weckdaten gehören nicht ins Repository. Fehlerhafte gespeicherte Daten werden nicht still überschrieben; Originalexport und Wiederherstellung bleiben zugänglich.

## Tests und Wartung

Keine npm-Abhängigkeiten notwendig. Mit Node 22+ und Python 3:

```sh
npm test
npm run check
python3 tests/assets.py
```

Details und konkrete Grenzen: [QA.md](QA.md).

Bei einer neuen Version den Cache-Namen in `sw.js` erhöhen, sonst bleiben vorherige Assets gecacht. Updates erst nach Speicherung laufender Routinen übernehmen. Quellcode: `core.js` (testbare Regeln), `app.js` (UI/Audio/Speicher), `style.css`, `sw.js`.
