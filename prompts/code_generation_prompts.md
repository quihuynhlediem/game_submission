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
5. **Output for the prompt input**: The built prompt should be verified to see the output solve that problem of the user story.

**Format the Output:**

1.  Provide two distinct JavaScript functions:
    * `estimateTokens(text)`:
        * Input: A string of text (representing either a user prompt or an AI response).
        * Output: An integer representing the estimated number of tokens based on the 4-character rule.
    * `calculateLlmCost(inputTokenCount, outputTokenCount, baseInputPrice, outputMultiplier)`:
        * Input: `inputTokenCount` (integer), `outputTokenCount` (integer), `baseInputPrice` (float, e.g., 0.0001 dollars per token), `outputMultiplier` (integer, e.g., 5).
        * Output: A float representing the total simulated cost.
2.  Include clear JSDoc comments for both functions explaining their purpose, parameters, and return values.
3.  Provide simple usage examples for both functions.