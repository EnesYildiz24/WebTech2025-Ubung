# Imba/WebTech2025

## Deliverable 1 – Dokumentation

Dieses Dokument enthält die Entscheidungsfindungen und die Herleitungen für die Einrichtung unseres Projekt-Setups.

---

### 1. Repository Setup

- **Repository erstellt:** GitLab-Repository unter `https://gitlab.bht-berlin.de/[Gruppenname]/Imba/WebTech2025` angelegt.
- **Zugang:** Dozent **sspielvogel** als Mitglied mit Developer-Rechten eingeladen.
- **Rationale:** Zentralisierte Codeverwaltung und Zugriffssteuerung über GitLab ermöglichen Versionskontrolle und effiziente Kollaboration.

---

### 2. Ordnerstruktur

Wir orientieren uns an Best Practices für Git-Repositories nach ["Best Practices for Organizing Git Repositories"](https://medium.com/@tcij1013/best-practices-for-organizing-git-repositories-61e4538c3900):

```
├── src/           # Quellcode
├── docs/          # Projektdokumentation
├── tests/         # Unit- und Integrationstests
├── config/        # Konfigurationsdateien (CI, Linter, Environment)
├── scripts/       # Hilfsskripte (Deployment, Datenbank)
├── README.md      # Projektübersicht und Setup-Anleitung
```

- **Nutzen:** Klare Trennung von Logik, Dokumentation, Tests und Konfiguration. Erleichtert Wartung und Onboarding neuer Teammitglieder.

---

### 3. Kommunikationskanal

- **Werkzeug:** Microsoft Teams
- **Kanal:** Privater Gruppen-Kanal **Projekt-Team** angelegt, in dem alle Team-Mitglieder (Max, Maria, Ali, …) erreichbar sind.
- **Rationale:** Echtzeit-Kommunikation, Dateiaustausch und Integration mit Planner/Boards in Teams.

---

### 4. PM-Tool für Aufgaben-Tracking

**Anforderungen:** Aufgabenanlage, Kanban-Board-Ansicht, Kategorien (Backlog, In Progress, Done), Priorisierung, Zuweisung.

| Option        | Vorteile                                                 | Nachteile                         |
|---------------|----------------------------------------------------------|-----------------------------------|
| Jira          | Umfangreiche Funktionen, etablierte Workflows            | Komplex, Lizenzkosten             |
| Trello        | Einfache Bedienung, kostenlos für kleine Teams           | Weniger Reporting-Funktionen      |
| GitLab Issues | Integriert im Repo, Kanban-Boards verfügbar              | Geringere Konfigurierbarkeit      |

- **Auswahl:** **GitLab Issues** mit Board-Ansicht
- **Rationale:** Direkte Integration ins Repository, keine zusätzlichen Kosten, erfüllt alle Kanban-Anforderungen.

---

### 5. Frontend-Framework

**Kandidaten:** React, Vue.js, Angular

**Bewertungskriterien:** Lernkurve, Community-Support, Komponenten-Ökosystem, TypeScript-Unterstützung

| Framework | Lernkurve | Community | Ökosystem | TypeScript | Entscheidung |
|-----------|-----------|-----------|-----------|------------|--------------|
| React     | Mittel    | Sehr groß | Riesig    | Erstklassig| ✅           |
| Vue.js    | Niedrig   | Groß      | Gut       | Gut        | ❌ (Erfahrung fehlt) |
| Angular   | Hoch      | Groß      | Vollständig| Erstklassig| ❌ (zu komplex für Übung) |

- **Auswahl:** **React**
- **Rationale:** Erfahrung der Teammitglieder, schnelle Einarbeitung, große Community und umfangreiche Bibliotheksauswahl.

---

## Nächste Schritte

- CI/CD-Pipeline konfigurieren
- Erste Tickets im PM-Tool erstellen
- Basis-Template für React-App anlegen

*Ende Deliverable 1.*

