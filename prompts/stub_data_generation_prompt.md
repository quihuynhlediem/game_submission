# Concept Prompts for Stub Generation
Act as a technical writer and educational game designer. Your task is to generate a set of stub data for 5 distinct levels for a game called "Prompt Craft."

**Game Context:**
The game teaches developers to build efficient and effective prompts for LLMs. In each level, the player is given a "User Story" (a problem to solve) and a "hand" of 'Component Cards'. The player must drag the correct cards into a crafting area to build the winning prompt. Your data will define what these levels are.

**Card Types & Rules:**
You must create a mix of cards for each level from the following 5 categories. Each card has a `cost` and sometimes a special `effect`.
1.  **Task Cards:** The primary action (e.g., "Write a Python function").
2.  **Persona Cards:** The role the AI should adopt (e.g., "Act as a Senior DevOps Engineer").
3.  **Context Cards:** Essential background information (e.g., "The target database is PostgreSQL").
4.  **Format Cards:** Instructions for the output structure (e.g., "Provide the output in a JSON format").
5.  **Vague Cards:** Common but inefficient instructions that should be avoided (e.g., "Make it quick"). These are trap cards.

**Content Requirements:**
- The user stories should be realistic and relevant to web or mobile developers.
- Include scenarios that would be familiar to developers in **Australia and Vietnam**.
- The `goodOutput` should be a concise, plausible example of what a perfect AI response would look like.
- The `badOutput` should be a generic, unhelpful, or slightly incorrect response that results from a poorly constructed prompt.

**Final Output Format:**
The final output MUST be a single, clean JSON array containing 5 unique level objects. Do not include any explanatory text outside of the JSON. Each object in the array must follow this exact structure:

```json
[
  {
    "id": 1,
    "title": "Example Level: Basic Landing Page",
    "userStory": "As a startup founder in Sydney, I need a simple HTML landing page for my new 'Eco-Tracker' mobile app to collect user sign-ups.",
    "availableCards": [
      {"id": "t1", "type": "Task", "text": "Write a single HTML file", "cost": 10, "effect": null},
      {"id": "p1", "type": "Persona", "text": "Act as a senior frontend developer", "cost": 15, "effect": null},
      {"id": "c1", "type": "Context", "text": "The app is called 'Eco-Tracker'", "cost": 5, "effect": null},
      {"id": "c2", "type": "Context", "text": "Include a header, a short description, and an email sign-up form", "cost": 15, "effect": null},
      {"id": "f1", "type": "Format", "text": "Use inline CSS for styling", "cost": 5, "effect": null},
      {"id": "v1", "type": "Vague", "text": "Make it look modern", "cost": 2, "effect": "Adds 3x Energy Multiplier"}
    ],
    "solution": ["t1", "p1", "c1", "c2", "f1"],
    "goodOutput": "```html\n<!DOCTYPE html>\n<html>\n<head><title>Eco-Tracker</title>...</head>\n<body>\n  <h1>Welcome to Eco-Tracker!</h1>\n  <p>Your personal guide to a sustainable lifestyle.</p>\n  <form>...</form>\n</body>\n</html>\n```",
    "badOutput": "I can generate a webpage for you, but I need more information. What should the content of the page be? What is the name of your app?"
  }
]