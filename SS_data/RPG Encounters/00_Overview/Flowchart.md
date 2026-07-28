---

tags: [flowchart, overview]

---

  

# Flowchart – Branching Encounters

  

> Tip: In Obsidian, Mermaid links may not be clickable on all platforms. Use node labels to find the notes.

  

```mermaid

flowchart TD

    %% Classes for visual distinction

    classDef encounter fill:#eef,stroke:#55f,stroke-width:1px,color:#000;

    classDef plot fill:#efe,stroke:#5a5,stroke-width:1px,color:#000;

    classDef npc fill:#fee,stroke:#f55,stroke-width:1px,color:#000;

    classDef decision fill:#ffd,stroke:#cc9,stroke-width:1px,color:#000;

  

    Start([Start in Inn]):::plot --> InnAttack[[Encounter - Inn Attack]]:::encounter

  

    InnAttack -->|Player Wins (Momentum ≥ 2)| PF_Arrival{Powerful Figure Arrives?}:::npc

    InnAttack -->|Mixed Result (Momentum 0-1)| PF_Arrival

    InnAttack -->|Player Fails (Momentum < 0)| PF_Arrival

  

    PF_Arrival -->|High Reputation & Clean Conduct| MentorOffer[[NPC Decision: Mentor Offer]]:::decision

    PF_Arrival -->|Adequate Skill, Ambiguous Conduct| SectInvite[[NPC Decision: Sect Invitation]]:::decision

    PF_Arrival -->|Hostile/Low Reputation| DestroyYou[[NPC Decision: Destroy You]]:::decision

    PF_Arrival -->|No Intervention| Aftermath1([Plot Beat 1: Inn Aftermath]):::plot

  

    MentorOffer --> Aftermath1

    SectInvite --> Aftermath1

    DestroyYou --> GameOver([Fail State / Escape Branch]):::plot

  

    Aftermath1 --> ForestBandits[[Encounter - Forest Clearing - Bandits]]:::encounter

    Aftermath1 --> CityHearing[[Encounter - City Council Hearing]]:::encounter

  

    ForestBandits --> PlotBeat2([Plot Beat 2: Regional Threat Revealed]):::plot

    CityHearing --> PlotBeat2

  

    PlotBeat2 --> MidArcChoice{Branch by Reputation & Faction Standing}:::decision

    MidArcChoice --> FactionPath[[Faction Path / Sect Arc]]:::encounter

    MidArcChoice --> RoguePath[[Independent Path]]:::encounter

    MidArcChoice --> RedemptionPath[[Redemption / Mentor Return]]:::encounter

  

    FactionPath --> FinalBeat([Final Beat: Confrontation & Resolution]):::plot

    RoguePath --> FinalBeat

    RedemptionPath --> FinalBeat