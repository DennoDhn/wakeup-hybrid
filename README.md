# WakeUp Hybrid – kostenlose iPhone-PWA

WakeUp ist eine sanfte **Wachroutine**, keine eigenständige verlässliche Alarm-App. Der echte Alarm wird über die native iPhone-Uhr ausgelöst. Optional ergänzen Apple-Kurzbefehle eine Erinnerung, wenn der Alarm gestoppt oder geschlummert wird.

## Ohne Computer auf GitHub Pages veröffentlichen

1. Auf dem iPhone in Safari auf github.com anmelden.
2. Das öffentliche Repository `DennoDhn/wakeup-hybrid` ist angelegt. Keine persönlichen Weckdaten in GitHub einchecken.
3. Die Projektdateien werden direkt über die GitHub-Verbindung veröffentlicht.
4. Unter **Settings → Pages → Build and deployment** bei **Source** `GitHub Actions` auswählen. Das vorhandene Workflow-Skript veröffentlicht die PWA automatisch bei jedem Push auf `main`.
5. Die GitHub-Pages-Adresse in Safari öffnen, über **Teilen → Zum Home-Bildschirm** installieren.
6. In der PWA unter **Einrichten** den iPhone-Hauptalarm, Sicherheitsalarme und optional die Kurzbefehle-Automationen einrichten.

## Wichtige Einschränkungen

- Eine GitHub-Pages-PWA kann **keine** nativen iOS-Wecker erstellen oder verlässlich auslösen, wenn iOS sie im Hintergrund anhält. Nicht als einziges Wecksystem verwenden.
- WakeUp kann **keinen** iOS-Wecker oder dessen Snooze-Verhalten sperren oder ändern.
- Automationen in Kurzbefehle können auf **Wecker gestoppt** bzw. **geschlummert** reagieren, aber das automatische Öffnen der PWA auf einem gesperrten Telefon ist nicht garantiert.
- Die in der PWA eingestellte Uhrzeit ist eine **Planungsangabe** und muss separat in der iPhone-Uhr gesetzt werden.
- Die Wachkontrolle, Sounds und Sprachansagen funktionieren nur, wenn die PWA aktiv ist. Sicherheitsalarme unbedingt in der iPhone-Uhr erstellen.
- Keine Server, kein Abo, kein Tracking. Einstellungen und Verlaufsdaten verbleiben lokal auf dem Gerät (Browserdaten können gelöscht werden).
- Vor dem praktischen Einsatz die iPhone-Alarmlautstärke und den Klang testen.

## Dateistruktur

- `index.html`: Oberfläche und Offline-Routine
- `manifest.webmanifest`: PWA-Metadaten
- `sw.js`: Offline-Cache
- `icon.svg`, `icon-192.png`, `icon-512.png`: Symbole

## Geplante Erweiterungen

- Verbesserte Tagesstatistik und Routinen
- Freundlichere Sprachauswahl
- Weckprofil für wechselnde Dienste
- Export/Import der Einstellungen
- Native App erst dann, wenn eine kostenfreie, PC-freie und robuste Bereitstellung verfügbar ist.