# Code generation prompts — templates and examples

Use these prompts when asking an LLM to generate code for the Prompt Craft game (React + TypeScript + Tailwind). They include the expected inputs, outputs, acceptance criteria, and examples for common files and utilities.

## Guidelines (always include)

- Target stack: React (or Next.js client components), TypeScript, Tailwind CSS.
- Provide explicit TypeScript types for public data shapes (Card, Level, Chapter, EvaluationResult).
- Keep components small and focused. Export pure utilities for token estimation and evaluation so they can be unit tested.
- Add minimal inline comments for non-obvious logic.
- Prefer small unit tests for pure functions (vitest or jest). Show example test cases.

## Reusable prompt templates

1. Generate a UI component (PromptCard)

Prompt:

"Create a React + TypeScript component named `PromptCard` that accepts a prop `card: Card` and optional `inBench?: boolean`, `onAdd?: (c: Card) => void`, `onRemove?: (c: Card) => void`. The component should:

- Render `title`, `tag`, `text` (description) and token count.
- Show an Add or Remove button depending on `inBench`.
- Apply neon/tailwind styles that depend on `card.type` (`task|persona|context|format`).
- Export the component as default and include named export for types if needed. Include a short usage example.

Acceptance criteria:

- Type definitions for `Card` are included or referenced.
- No `any` types; compile in TypeScript.
- Include an example usage snippet and brief prop description.

2. Generate utilities (`estimateTokens` & `evaluate`)

Prompt:

"Implement `estimateTokens(text: string): number` and `evaluate(level: Level, bench: Card[]): EvaluationResult`.

- `estimateTokens` rule: 1 token ≈ 4 characters; return `Math.max(0, Math.ceil(text.length / 4))`.
- `evaluate` should compute: `inputTokens`, `outputTokens` (heuristic), `total`, `status` (`'success'|'failure'|'partial'`), `reasons[]`, `tip`.
- Explain heuristics briefly (e.g., missing required card => failure, presence of non-optimized card reduces efficiency) and add 2 unit tests.

Acceptance criteria:

- Types exported for `EvaluationResult`.
- Provide two unit tests: one for `estimateTokens`, one for an `evaluate` scenario.

3. Small test example (vitest)

Prompt:

"Provide two vitest unit tests: one for `estimateTokens` with short and long text, one for `evaluate` that simulates a missing required card leading to failure. Include `describe`/`it` style and brief assertions."

## Example snippets to include in responses

- Exported types: `Card`, `Level`, `Chapter`, `EvaluationResult`.
- Example test: `expect(estimateTokens('hello world')).toBe(3)`
- A short comment describing the evaluation heuristics used.

---

Whenever you ask for a file to be generated, include the minimal project context (existing imports and file locations). If you want the assistant to return the full file content for copy/paste, say so explicitly.

# Concept Prompts for Code Generation

Act as an expert JavaScript developer specializing in simple game mechanics.

Your task is to write JavaScript functions to simulate the core logic of LLM token cost calculation for an educational game focused on prompt engineering efficiency.

**Context & Requirements (Summarized from previous explanation):**

0.  **Challenge Materials**: There should be a user story for each challenge. Along with that, there will be component cards which can be categorised into 4 types as below:

- Task Cards: "Write HTML" (Cost: 10), "Write CSS" (Cost: 10)
- Persona Cards: "Act as a junior dev" (Cost: 5), "Act as a senior marketing copywriter" (Cost: 15)
- Context Cards: "The app is for 'pet adoption'" (Cost: 10), "The app is 'unspecified'" (Cost: 0, but adds a 50% fail chance)
- Format Cards: "Output as a single HTML file" (Cost: 5)
- Vague Cards: "Make it look good" (Cost: 2, but adds 3x to the Energy multiplier!)

1.  **Core Mechanic:** The game needs to visually demonstrate to players (developers) how their prompt choices impact API costs based on token usage.
2.  **Token Estimation:** Include a **simple** function to estimate token count. For this simulation, use a basic rule: assume **1 token roughly equals 4 characters**. (We know real tokenization is complex, but this is for game clarity).
3.  **Input vs. Output Cost:** The calculation MUST reflect that **output tokens are significantly more expensive than input tokens**. Use a clear price multiplier for output tokens (e.g., output tokens cost 5 times more than input tokens).
4.  **Cost Calculation Function:** Create a primary function that takes the estimated input token count, estimated output token count, a base price per input token, and the output token multiplier, then returns the total simulated cost. Finally, there should be a total number of tokens.
5.  **Output for the prompt input**: The built prompt should be verified to see the output solve that problem of the user story.

**Format the Output:**

1.  Provide two distinct JavaScript functions:
    - `estimateTokens(text)`:
      - Input: A string of text (representing either a user prompt or an AI response).
      - Output: An integer representing the estimated number of tokens based on the 4-character rule.
    - `calculateLlmCost(inputTokenCount, outputTokenCount, baseInputPrice, outputMultiplier)`:
      - Input: `inputTokenCount` (integer), `outputTokenCount` (integer), `baseInputPrice` (float, e.g., 0.0001 dollars per token), `outputMultiplier` (integer, e.g., 5).
      - Output: A float representing the total simulated cost.
2.  Include clear JSDoc comments for both functions explaining their purpose, parameters, and return values.
3.  Provide simple usage examples for both functions.
