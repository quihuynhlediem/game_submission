# Concept Prompts used during Brainstorming

## Prompt 1: Ideas

Act as a game developer. Your task is to generate 4 distinct, creative game ideas that.

Context:

- The game's theme must highlight a pressing social challenge in both Vietnam and Australia.
- The final game should be fun, educational, and impactful.
- Format the output as a list. For each of the 4 concepts, provide:
  - Concept Title
  - Social Challenge
  - Core Game Mechanic (1-2 sentences)
  - Educational Angle (How it teaches the player about the issue).

## Prompt 2: Concepts

Let's pivot our focus. Your new task is to design a single, detailed game concept that instructs people on how to create better prompts for LLMs. Also, suggest some potential knowledge base for this game as the stub content.

Context:

- The game's social challenge is now "AI Literacy and Prompt Engineering."
- The primary interaction should be simple, like point-and-click or drag-and-drop, suitable for a chat-like interface.
- Format your response to include the following sections:
  - Gameplay Loop (describe how a player would play a single level)
  - Required Screens (e.g., Menu, Play)
  - Example Level (describe a specific puzzle the player would solve)

## Prompt 3: Mechanics

Act as an educational game designer. Your task is to propose 3 different game formats/mechanics specifically designed to teach prompt engineering to developers.

Core Context & Theme:

- Target Audience: Web and mobile app developers.
- Central Message: An efficient prompt is not just about productivity. It also has a positive impact on cost (fewer API calls), asset quality (better code), and the environment (less energy). The game mechanics must reflect this.
- Format the output as a list of 3 game formats. For each format:

  - Format Name (e.g., "Puzzle," "Simulation")

  # Concept prompts for Prompt Craft — structured and reusable

  These prompts capture high-level concept generation, gameplay design, mechanics, and mapping of LLM costs to game mechanics. Use them when you want the assistant to propose game ideas, level designs, or explanations of technical concepts for players.

  ## Prompt A — Generate game concepts

  Instruction:
  "Act as an experienced indie game designer. Produce 4 distinct game concepts that teach a developer audience about AI prompt engineering and LLM efficiency.

  For each concept return:

  - Title
  - Short pitch (1 sentence)
  - Target audience
  - Core mechanic (1–2 sentences)
  - Educational goal (what the player learns)
  - Example level (a concise playable puzzle or challenge)

  Constraints:

  - Keep each concept short (4–6 bullet points)
  - Prefer web-friendly UI (click/drag interactions)
    "

  Acceptance criteria:

  - Each concept includes the fields above.
  - Example level should be actionable (play steps and win condition).

  ## Prompt B — Design a single focused game concept

  Instruction:
  "Design a single, detailed game concept called 'Prompt Craft' that focuses on composing good prompts using drag-and-drop cards. Provide sections: Gameplay Loop, Required Screens, Example Level, Progression & Rewards, and Observable Metrics (e.g., tokens saved, efficiency score). Include a short example of a level's initial bench cards and the required outcome."

  Acceptance criteria:

  - Gameplay Loop is clear and fits 1–3 minute play sessions.
  - Example Level lists specific required tag(s) and an example bench.

  ## Prompt C — Mechanics to teach efficiency

  Instruction:
  "Propose 3 different mini-game mechanics (Puzzle/Simulation/Editor) that can be used inside Prompt Craft to teach how prompt structure affects token cost and output quality. For each, describe: mechanic name, how it visualizes tokens/cost, player actions, and the learning outcome."

  Acceptance criteria:

  - Each mechanic has at least one concrete UI example.

  ## Prompt D — Explain LLM cost and tokens (player-facing)

  Instruction:
  "Write an in-game help article (200–400 words) that explains tokens, input vs output tokens, and why output tokens cost more. Use simple analogies (e.g., 'input is the ingredients; output is the meal') and include a short formula example for estimating tokens (1 token ≈ 4 characters)."

  Acceptance criteria:

  - Plain language, no code required. Includes formula and one illustrative example.

  ***

  Use these prompts as building blocks when asking the assistant to expand game design docs or to create tutorial copy for the game's UI.
