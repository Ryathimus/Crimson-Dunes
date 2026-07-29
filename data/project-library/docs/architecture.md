# Architecture

## System Name

**Crimson Dunes Encounter Engine**

## Architectural Goal

Create a static, data-driven, GitHub Pages-compatible GUI for exploring and simulating encounter-based narrative play inside the Crimson Dunes world.

## Layers

```text
Crimson Dunes Encounter Engine
│
├─ Data Layer
│  ├─ World canon
│  ├─ Characters
│  ├─ Locations
│  ├─ Timeline events
│  ├─ Magic systems
│  ├─ Encounter templates
│  ├─ Encounter instances
│  └─ Rules / validation schemas
│
├─ Simulation Layer
│  ├─ World seed
│  ├─ Time controller
│  ├─ Location state
│  ├─ Character state
│  ├─ Encounter generator
│  ├─ Outcome resolver
│  └─ History / event log
│
├─ Viewer Layer
│  ├─ Overworld View
│  ├─ Multi-Character Viewer
│  └─ Single Character Viewer
│
└─ Persistence Layer
   ├─ Canon data files in repo
   ├─ Browser local storage
   ├─ Downloadable save JSON
   └─ Optional exported session log
```

## Core Rule

The application code should not be the lore source of truth. Lore and encounter data should live in structured data files wherever practical.
