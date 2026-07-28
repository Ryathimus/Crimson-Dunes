---

tags: [log, encounters]

---

  

# Encounter Log

  

> Track outcomes, variables, and rewards after each session.

  

## Log Entries

- **Date:** 

  **Encounter:** [[Encounter - Inn Attack]] 

  **Decision Taken:** Evacuate civilians 

  **Outcome:** Success (DC 13) 

  **Momentum Change:** +1 

  **Variables Applied:** Darkness −2 to enemy Perception; Panic +1 to Evacuation DC 

  **Rewards:** Town Defenders’ Favor; consumables 

  **Reputation:** +1 local 

  **Notes:** Powerful Figure arrived → Mentor Offer (accepted)

  

- **Date:** 

  **Encounter:** [[Encounter - Forest Clearing - Bandits]] 

  **Decision Taken:** Parley 

  **Outcome:** Mixed; reputation affected negotiations 

  **Momentum Change:** 0 

  **Rewards:** Safe passage token; minor XP 

  **Notes:** Map fragment acquired

  

---

  

## Optional: Dataview (plugin)

```dataview

TABLE file.link AS Encounter, Outcome, MomentumChange

FROM "40_Logs"

WHERE contains(file.name, "Encounter Log")