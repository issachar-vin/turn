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
   
3. **New Prophecy Cards** — Draw X prophecy cards where X is the season number and place them near the favor track.
4. **Reset Abilities** *(skip season 1)* — return all Faction Cubes from ability use to supply.
5. **Gain Settlement Bonuses** *(skip season 1)* — gain printed VPs from visible Settlement slots; deploy Warriors per Settlement icon.
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
   - **Exploring a region** 
      - Lord deploys/moves into unexplored, or starts its turn there: 
         1. flip tile 
         2. pick 1 reward 
         3. reveal Mist Card
            - If Artifact, do nothing, it stays there until war phase.
            - If Mythincal Beast, instantly triggers a Bonding bid
   - **End of Turn Actions:**
      1. Discard the resolved Card and any cards used to pay for it.
      2. Draw 2 Cards from any of the 4 Main Decks, in any combination.
      3. Check Region Limits (5 Units per player per region) — over the limit, return excess Units to supply.

Repeat Part 1 + Part 2 for a total of **3 rounds**.

---

## 3. War Phase

Battles/scoring resolve region by region, in this fixed order:

![War Phase region order](images/war-region-order.png)

For **each explored region with any Unit present**, in that order:

### If only one faction has strength in the region
- No battle. That player scores 1st place immediately (see Scoring below).

### If two or more factions have strength
**A. Non-Hero Battle** (no Lord/Champion of either side present)
- Sum each faction's total strength (Units/Settlements/Artifacts/Abilities) and compare directly. Skip to Scoring.

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
  - Won: discard Battle Plan + all Bonus Cards.
  - Lost, Battle Plan failed: discard Battle Plan, keep Bonus Cards.
  - Lost, Battle Plan succeeded (but not 1st/2nd): keep Battle Plan + Bonus Cards.

---

## 4. End of Season

- Each player discards all remaining hand cards, gaining 1 VP per discarded card.
- Reset the Favor Track to 0 for all players.
- If season 2 or 3 remains → return to **Mist Phase**. Otherwise → **End Game Scoring**.

## 5. Ending the Game

- Triggered after the final season (2nd or 3rd, per game length chosen).
- Each player gains VPs from their revealed Settlement slots one last time.
- Most VPs wins. Ties broken by: (1) Holy Grail bearer wins, (2) if no one holds the Grail, all tied players win.

---

## Quick Reference: Tiebreaker Order (used throughout)
1. Holy Grail bearer may break the tie (once per season).
2. Player with the lowest VPs.
3. Player with the lowest VP value printed on their Lord Board.
