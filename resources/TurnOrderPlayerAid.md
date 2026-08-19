# Avalon: The Riven Veil — Turn Order Player Aid

A game is 2 or 3 **Seasons**. Each Season consists of the following phased: 
1. Mist Phase
2. Preparation Phase
   - Preperation Phase consists of 3 rounds
3. War Phase

---

## 1. Mist Phase (season setup)

Performed in order, all players simultaneously unless noted:

1. **Regions Return to the Mists** *(skip during season 1, the first season of the game)*
   - Return all Units to owner's supply except for Settlements, Strength Tokens, Ley Line Markers.
   - Reveal any remaining Mist Cards and put them at the bottom of their respectve deck (Artifacts or mythical beast). If there is an unclaimed Holy Grail card put it back by the favor track.
   - Remove regions without a Settlement, reshuffle into region tile piles, draw new tiles face down into empty spaces.
2. **Place Mist Cards** — draw Artifacts + Mythical Beasts (+ Holy Grail) per player count, shuffle, place one face down per region (skip Deep Mist regions).

   | Players | Artifacts | Mythical Beasts | Holy Grail |
   |---------|-----------|------------------|------------|
   | 2       | 2         | 2                | 1          |
   | 3       | 3         | 3                | 1          |
   | 4+      | 4         | 4                | 1          |
   
3. **New Prophecy Cards**
   - Discard all Prophecies from the previous season and return any Faction Cubes on them to their owners.
   - Draw X Prophecy Cards, where X is the season number, and place them face up beneath the Favor Track. They are active for this season.
4. **Reset Abilities** *(skip season 1)* — return all Faction Cubes from ability use to supply.
5. **Gain Settlement Bonuses** *(skip season 1)* — gain every bonus printed on your visible Settlement slots: VPs, the Warriors shown deployed into that settled region, and whatever else your Faction Board grants there. In an Asymmetric Game, Druid Ley Lines give their own bonuses on top of this.
6. **Rearrange Artifacts** *(skip season 1)* — simultaneously reassign Artifacts to Heroes.
7. **Draw Cards** — draw 2 cards from each of the 4 Main Decks (Deploy/Move/Settle/Battle Plan), face down.

---

## 2. Preparation Phase (3 rounds)

Each round = **Part 1 (Choose a Card)** then **Part 2 (Reveal & Resolve)**.

### Part 1 — Choosing a Card (simultaneous)
1. **Card Selection** — each player picks 1 card from hand, places it face up at the front of their hand.
2. **Pay the Card Cost** — place the required cards behind the chosen card (apply any cost reductions first).
3. **Place Card Separator** — behind the cards being played/spent, separating them from the rest of the hand.

### Part 2 — Reveal and Resolve (turn-based)
1. **Card Reveal** — all players reveal chosen card + cards paid, announce initiative value (top-left number).
2. **Determine Turn Order** — highest initiative goes first, descending. Ties broken in order:
   1. Holy Grail bearer (once/season)
   2. Lowest VPs
   3. Lowest VP value printed on Lord Board
   - Current tiebreaker picks their position in the order; can't repeat a spot already taken.
3. **Player Turns** (in initiative order, highest → lowest):
   - **Resolve your Card**:
      - Resolve the chosen Card (left-to-right, top-to-bottom)
         - **or** 
      - Perform a Standard Action instead.
   - **Use Abilities**
     - Use any number of Abilities/Reaction Abilities (once per season each).
   - *The Card and your Abilities may be resolved in **any order**, but all effects of one must be finished before starting the next. The exceptions are 'if'/'when' effects (e.g. 'if you deploy', 'when you explore'), which trigger the moment their requirement is met, even mid-resolution.*
   - **Exploring a region** 
      - Lord deploys/moves into unexplored, or starts its turn there. **Immediately pause the action/effect being resolved** and explore now:
         1. flip tile face up (if face down)
         2. pick 1 reward printed above the region name (even if the tile was already face up)
         3. reveal Mist Card
            - If Artifact, do nothing, it stays there until war phase.
            - If Mythical Beast, interrupt again and resolve the Bonding bid before continuing.
         4. return to resolving the rest of your turn.
      - You may only explore **once per turn**, regardless of how many Lords you have.
   - **End of Turn Actions:**
      1. Discard the resolved Card and any cards used to pay for it.
      2. Draw 2 Cards from any of the 4 Main Decks, in any combination.
      3. Check Region Limits (5 Units per player per region) — over the limit, return excess Units to supply.

Repeat Part 1 + Part 2 for a total of **3 rounds**.

---

## 3. War Phase

### Start of the War Phase (before any region is resolved)

1. **Claim Excalibur** — if Excalibur has not yet been claimed this season, the player with more Favor than all other players claims it now.
   - Tie for the most Favor: no one claims Excalibur, and a Lord holding it from the previous season returns it to its place next to the Favor Track.
   - Excalibur can also be claimed earlier in the season by the first player to reach the end of the Favor Track, as long as there is no tie.
   - The bearing Lord gains +2 strength, and once per season may add +1 strength to any one battle where they tie for 1st place.
2. **Reset the Favor Track** — move all Favor Markers back to 0, whether or not Excalibur was claimed. Favor earned later in this War Phase stays on the track and carries into the next season.
3. **Gain the Green Knight** *(Catch-Up Mechanisms only)* — if there are at least 2 star spaces on the VP Track between the last place player and the next lowest VP player (ignoring the spaces the Markers are on), the last place player gains the Green Knight for this War Phase. Place its miniature in any region holding an enemy Hero.
   - Tie for last place: no one gains the Green Knight.
   - The Green Knight counts as a Unit but not against the Mythical Beast bonding limit. Control ends when the War Phase does.

### Region Resolution

Battles/scoring resolve region by region, in this fixed order:

![War Phase region order](images/war-region-order.png)

For **each explored region where any player has strength**, in that order:

### If only one faction has strength in the region
- No battle. That player scores 1st place immediately (see Scoring below).

### If two or more factions have strength
**A. Non-Hero Battle** (no Lord/Champion of either side present)
- Sum each faction's total strength (Units/Settlements/Abilities) and compare directly. Skip to Scoring.
- No Artifact strength applies — with no Lord or Champion present there is no Hero to bear an Artifact.

**B. Hero Battle** (a Lord or Champion is present)
1. **Calculate Starting Strength** — each player marks their base strength on the Strength Track.
2. **Choose Battle Plan + Bonus Cards** — players with a Hero simultaneously pick up to 1 Battle Plan Card and up to 3 Bonus Cards (each Bonus Card raises the strength Limit by 1).
3. **Reveal Battle Plans and Limits** — simultaneously reveal.
4. **Draw Combat Cards** — draw one at a time from Main Decks (highest strength player first; ties use normal tiebreak order), trying not to exceed the Battle Plan's Limit. Can stop anytime; can't reject a drawn card.
5. **Reveal Combat Cards** — simultaneously flip all drawn Combat Cards face up.
6. **Determine Success or Failure** — total Combat Card strength ≤ Limit = **succeeds**; over = **fails**.
7. **Resolve Battle Plans and Gain Strength**:
   - Success: add full Combat Card total to strength; all Battle Plan effects resolve.
   - Failure: add half the Battle Plan's printed Limit (rounded up) instead; Battle Plan effects do **not** resolve.

### End of Battle
- **Score the Region:**
  - 1st place (highest strength): full season VP amount for that region.
  - 2nd place: half VP amount (rounded up) — only if no tie for 1st.
  - Ties for 1st: all tied players score full 1st-place VP, no one gets 2nd.
  - Ties for 2nd (no tie for 1st): all tied players get half VP.
  - Sole player present: full VP amount, no battle.
- **Gain Artifacts** (if region has one) — 1st place winner takes it; equip if Hero has an open slot, else it sits by the Faction/Lord Board.
- **Discard Battle Cards:**
  - **1st place**: discard Battle Plan + all Bonus Cards played.
  - **Any other position**, Battle Plan failed: discard Battle Plan, regain all Bonus Cards.
  - **Any other position**, Battle Plan did not fail: regain Battle Plan + all Bonus Cards.
  - If a Battle Plan says to discard it as part of its effect, discard it.

---

## 4. End of Season

- Each player discards all remaining hand cards, gaining 1 VP per discarded card.
- If season 2 or 3 remains → return to **Mist Phase**. Otherwise → **End Game Scoring**.

## 5. Ending the Game

- Triggered after the final season (2nd or 3rd, per game length chosen).
- Each player gains VPs from their revealed Settlement slots one last time.
- Most VPs wins. Ties broken by: (1) Holy Grail bearer wins, (2) if no one holds the Grail, all tied players win.

### All VP Sources (accumulated across the game, tallied at this final total)
- **War Phase region scoring** — 1st place: full season VP amount; 2nd place: half (rounded up), only if no tie for 1st; ties for 1st: all tied players score full VP; ties for 2nd (no tie for 1st): all tied players score half VP; sole player present: full VP, no battle.
- **Settlement slot bonuses** — gained each season during the Mist Phase (skip season 1), plus once more here at game end.
- **Artifacts gained from battles** — winning 1st place in a region with an Artifact grants that Artifact plus the VPs printed in its top-left corner.
- **Setup Artifacts** — each player gains the VPs printed top-left on the Artifact they keep during game setup.
- **Holy Grail** — +10 VP immediately upon claiming the Grail Token.
- **Mythical Beast bonding** — the winner of the initiative bid gains the VPs printed top-left of the Cards they bid.
- **Prophecies** — the 1st player to fulfill a prophecy gains the VP amount indicated (varies by season/prophecy); later players gain Favor instead.
- **Favor Track overflow** — once your Favor Marker is at the end of the track, gain 2 VP for each further Favor gained instead.
- **Favor Track Catch-Up stars** *(Catch-Up Mode only)* — landing on a star space gains 1 VP per star icon between your VP Marker and the current leader's.
- **End of Season hand discard** — 1 VP per Card discarded (Section 4).

---

## Quick Reference: Tiebreaker Order (used throughout)
1. Holy Grail bearer may break the tie (once per season).
2. Player with the lowest VPs.
3. Player with the lowest VP value printed on their Lord Board.
