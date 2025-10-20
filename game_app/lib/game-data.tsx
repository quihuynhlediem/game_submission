"use client"

export type CardType = "task" | "persona" | "context" | "format"

export interface Card {
  id: string
  type: CardType
  text: string
  cost: number
  effect: string | null
}

export interface ResponseData {
  content: string
  outputTokens: number
}

export interface Level {
  id: number
  title: string
  userStory: string
  availableCards: Card[]
  solution: string[]
  goodOutput: string
  badOutput: string
  responses: {
    excellent: ResponseData
    good: ResponseData
    goodWithSuggestions: ResponseData
    poor: ResponseData
  }
}

export interface Chapter {
  id: number
  title: string
  description: string
  levels: Level[]
}

// Card type colors for visual coding
export const CARD_TYPE_COLORS: Record<CardType, string> = {
  task: "bg-blue-500/10 border-l-4 border-l-blue-500",
  persona: "bg-purple-500/10 border-l-4 border-l-purple-500",
  context: "bg-cyan-500/10 border-l-4 border-l-cyan-500",
  format: "bg-green-500/10 border-l-4 border-l-green-500",
}

export const CARD_TYPE_LABELS: Record<CardType, string> = {
  task: "Task",
  persona: "Persona",
  context: "Context",
  format: "Format",
}

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    title: "Prompt Fundamentals",
    description: "Learn the basic building blocks of effective prompts",
    levels: [
      {
        id: 1,
        title: "Landing Page Copy",
        userStory:
          "You're a Sydney startup founder who needs to write a prompt to generate compelling landing page copy for your SaaS product. You want the AI to understand your target audience and create persuasive messaging.",
        availableCards: [
          {
            id: "task-1a",
            type: "task",
            text: "Write copy",
            cost: 3,
            effect: null,
          },
          {
            id: "task-1b",
            type: "task",
            text: "Write landing page copy for a SaaS product",
            cost: 5,
            effect: null,
          },
          {
            id: "task-1c",
            type: "task",
            text: "Write compelling landing page copy that converts visitors into trial signups",
            cost: 7,
            effect: null,
          },
          {
            id: "persona-1a",
            type: "persona",
            text: "You are a copywriter",
            cost: 4,
            effect: null,
          },
          {
            id: "persona-1b",
            type: "persona",
            text: "You are a marketing copywriter specializing in SaaS",
            cost: 8,
            effect: null,
          },
          {
            id: "persona-1c",
            type: "persona",
            text: "You are an expert SaaS copywriter with 8 years of experience converting technical products into compelling narratives",
            cost: 11,
            effect: null,
          },
          {
            id: "context-1a",
            type: "context",
            text: "Target audience: developers",
            cost: 5,
            effect: null,
          },
          {
            id: "context-1b",
            type: "context",
            text: "Target audience: busy developers aged 25-40 who value efficiency and reliability",
            cost: 10,
            effect: null,
          },
          {
            id: "context-1c",
            type: "context",
            text: "Target audience: busy developers aged 25-40 who value efficiency, reliability, and cost-effectiveness. They're tired of complex deployment processes and want to ship faster",
            cost: 14,
            effect: null,
          },
          {
            id: "format-1a",
            type: "format",
            text: "Make it persuasive and include benefits",
            cost: 4,
            effect: null,
          },
          {
            id: "format-1b",
            type: "format",
            text: "Format as: headline, subheading, 3 benefit bullets, CTA button",
            cost: 6,
            effect: null,
          },
          {
            id: "format-1c",
            type: "format",
            text: "Format as: attention-grabbing headline (under 10 words), subheading explaining the core benefit, 3 specific benefit bullets with metrics, clear CTA with urgency",
            cost: 9,
            effect: null,
          },
        ],
        solution: ["task-1c", "persona-1b", "context-1b", "format-1b"],
        goodOutput:
          "Headline: Ship Faster, Sleep Better\nSubheading: The developer platform that cuts deployment time in half\n• Deploy in seconds, not hours\n• Built for teams that move fast\n• Monitor everything from one dashboard\nCTA: Start Free Trial",
        badOutput:
          "Write some copy that sounds nice and is about a product for developers. Make it marketing-y and try to sell them on it.",
        responses: {
          excellent: {
            content:
              "Headline: Ship Faster, Sleep Better\nSubheading: The developer platform that cuts deployment time in half\n• Deploy in seconds, not hours\n• Built for teams that move fast\n• Monitor everything from one dashboard\nCTA: Start Free Trial\n\nThis copy directly addresses developer pain points with specific benefits and a clear call-to-action.",
            outputTokens: 85,
          },
          good: {
            content:
              "Headline: Deploy Faster\nSubheading: A platform for developers\n• Quick deployment\n• Easy to use\n• Great monitoring\nCTA: Try Now\n\nThis works but could be more compelling. Consider adding specific metrics and stronger emotional appeal.",
            outputTokens: 72,
          },
          goodWithSuggestions: {
            content:
              "Headline: Deploy Faster\nSubheading: A platform for developers\n• Quick deployment\n• Easy to use\n• Great monitoring\nCTA: Try Now\n\nYour prompt was clear and included the right components, but not optimized. Here are suggestions to improve:\n- Add more specific metrics (e.g., 'Deploy in seconds')\n- Include emotional language that resonates with developers\n- Make the CTA more compelling with urgency",
            outputTokens: 72,
          },
          poor: {
            content:
              "Write some copy that sounds nice and is about a product for developers. Make it marketing-y and try to sell them on it.\n\nI need more specific information to create effective copy. Please provide: the target audience details, specific product benefits, and desired tone/format.",
            outputTokens: 45,
          },
        },
      },
      {
        id: 2,
        title: "API Documentation",
        userStory:
          "You're a backend developer in Melbourne working on REST API documentation. You need to generate clear, developer-friendly documentation that explains authentication, endpoints, and error handling.",
        availableCards: [
          {
            id: "task-2a",
            type: "task",
            text: "Write documentation",
            cost: 3,
            effect: null,
          },
          {
            id: "task-2b",
            type: "task",
            text: "Generate API documentation",
            cost: 5,
            effect: null,
          },
          {
            id: "task-2c",
            type: "task",
            text: "Generate comprehensive API documentation that developers can quickly reference",
            cost: 7,
            effect: null,
          },
          {
            id: "persona-2a",
            type: "persona",
            text: "You are a technical writer",
            cost: 4,
            effect: null,
          },
          {
            id: "persona-2b",
            type: "persona",
            text: "You are a technical writer experienced with REST APIs",
            cost: 8,
            effect: null,
          },
          {
            id: "persona-2c",
            type: "persona",
            text: "You are a technical writer who specializes in API documentation for backend developers, prioritizing clarity and practical examples",
            cost: 11,
            effect: null,
          },
          {
            id: "context-2a",
            type: "context",
            text: "API uses JWT authentication and returns JSON",
            cost: 6,
            effect: null,
          },
          {
            id: "context-2b",
            type: "context",
            text: "API has 12 endpoints, uses JWT auth, returns JSON, includes rate limiting of 1000 requests/hour",
            cost: 12,
            effect: null,
          },
          {
            id: "context-2c",
            type: "context",
            text: "REST API with 12 endpoints, JWT bearer token authentication, JSON responses, rate limiting (1000 req/hour), versioned at v1, supports pagination with limit/offset",
            cost: 16,
            effect: null,
          },
          {
            id: "format-2a",
            type: "format",
            text: "Include endpoints and error codes",
            cost: 4,
            effect: null,
          },
          {
            id: "format-2b",
            type: "format",
            text: "Format: Overview, Authentication, Endpoints (method, path, params, response), Error Codes",
            cost: 8,
            effect: null,
          },
          {
            id: "format-2c",
            type: "format",
            text: "Format: Quick Start, Authentication (with example), Endpoints (method, path, description, required params, response schema, example), Common Error Codes with solutions",
            cost: 11,
            effect: null,
          },
        ],
        solution: ["task-2c", "persona-2b", "context-2b", "format-2b"],
        goodOutput:
          "## Authentication\nUse JWT tokens in Authorization header: `Authorization: Bearer {token}`\n\n## Endpoints\n\n### GET /users/{id}\nRetrieve user by ID\nParams: id (string, required)\nResponse: {id, name, email, created_at}\n\n### Error Codes\n401: Unauthorized\n404: Not Found\n429: Rate limit exceeded",
        badOutput:
          "Write documentation for an API. Include all the important stuff about how to use it and what the endpoints do.",
        responses: {
          excellent:
            "## Authentication\nUse JWT tokens in Authorization header: `Authorization: Bearer {token}`\n\n## Endpoints\n\n### GET /users/{id}\nRetrieve user by ID\nParams: id (string, required)\nResponse: {id, name, email, created_at}\n\n### Error Codes\n401: Unauthorized - Invalid or expired token\n404: Not Found - User does not exist\n429: Rate limit exceeded - Max 1000 requests/hour\n\nThis documentation is clear, well-structured, and includes all necessary details for developers.",
          good: "## API Documentation\n\nAuthentication: Use JWT tokens\n\nEndpoints:\n- GET /users/{id} - Get user info\n- POST /users - Create user\n- DELETE /users/{id} - Delete user\n\nErrors: 401, 404, 429\n\nThis covers the basics but lacks detail. Add example requests/responses and more specific error descriptions.",
          goodWithSuggestions: {
            content:
              "## API Documentation\n\nAuthentication: Use JWT tokens\n\nEndpoints:\n- GET /users/{id} - Get user info\n- POST /users - Create user\n- DELETE /users/{id} - Delete user\n\nErrors: 401, 404, 429\n\nYour prompt was clear and included the right components, but not optimized. Here are suggestions to improve:\n- Add example requests/responses to show how to use the endpoints\n- Include more specific error descriptions with examples\n- Add information about rate limiting and authentication best practices",
            outputTokens: 72,
          },
          poor: "Write documentation for an API. Include all the important stuff about how to use it and what the endpoints do.\n\nI need more specific information to create useful documentation. Please provide: API endpoints, authentication method, response format, and error codes.",
        },
      },
    ],
  },
  {
    id: 1,
    title: "Prompt Structure",
    description: "Master the art of organizing prompt components",
    levels: [
      {
        id: 3,
        title: "Database Query Optimization",
        userStory:
          "You're a backend developer in Ho Chi Minh City optimizing slow database queries. You need to write a prompt that helps you analyze query performance and suggest indexing strategies.",
        availableCards: [
          {
            id: "task-3a",
            type: "task",
            text: "Optimize the query",
            cost: 3,
            effect: null,
          },
          {
            id: "task-3b",
            type: "task",
            text: "Analyze and optimize SQL query",
            cost: 5,
            effect: null,
          },
          {
            id: "task-3c",
            type: "task",
            text: "Analyze the slow SQL query, identify bottlenecks, and provide optimized version with indexing recommendations",
            cost: 8,
            effect: null,
          },
          {
            id: "persona-3a",
            type: "persona",
            text: "You are a database expert",
            cost: 4,
            effect: null,
          },
          {
            id: "persona-3b",
            type: "persona",
            text: "You are a database performance expert with 10 years of experience",
            cost: 10,
            effect: null,
          },
          {
            id: "persona-3c",
            type: "persona",
            text: "You are a senior database architect specializing in PostgreSQL optimization, with expertise in query analysis, indexing strategies, and scaling large datasets",
            cost: 13,
            effect: null,
          },
          {
            id: "context-3a",
            type: "context",
            text: "PostgreSQL database, query is slow",
            cost: 4,
            effect: null,
          },
          {
            id: "context-3b",
            type: "context",
            text: "PostgreSQL database, 5M user records, query takes 8 seconds, joins users and orders tables",
            cost: 14,
            effect: null,
          },
          {
            id: "context-3c",
            type: "context",
            text: "PostgreSQL 13, 5M user records, 50M order records, query takes 8 seconds, joins users and orders tables on user_id, filters by country='VN', currently no indexes on these columns",
            cost: 18,
            effect: null,
          },
          {
            id: "format-3a",
            type: "format",
            text: "Provide the optimized query and indexes",
            cost: 4,
            effect: null,
          },
          {
            id: "format-3b",
            type: "format",
            text: "Format: Current issue, Root cause, Optimized query, Index recommendations, Expected improvement",
            cost: 8,
            effect: null,
          },
          {
            id: "format-3c",
            type: "format",
            text: "Format: Current issue (with execution plan), Root cause analysis, Optimized query with explanation, Specific index creation statements, Performance metrics (before/after), Alternative approaches",
            cost: 11,
            effect: null,
          },
        ],
        solution: ["task-3c", "persona-3b", "context-3b", "format-3b"],
        goodOutput:
          "Current Issue: SELECT * FROM users u JOIN orders o ON u.id = o.user_id WHERE u.country='VN' takes 8s\n\nRoot Cause: Missing index on users.country and orders.user_id\n\nOptimized Query: SELECT u.id, u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id WHERE u.country='VN' GROUP BY u.id\n\nIndex Recommendations:\nCREATE INDEX idx_users_country ON users(country);\nCREATE INDEX idx_orders_user_id ON orders(user_id);\n\nExpected Improvement: 8s → 200ms",
        badOutput: "Help me make this database query faster. It's slow and I need it to be quicker.",
        responses: {
          excellent:
            "Current Issue: SELECT * FROM users u JOIN orders o ON u.id = o.user_id WHERE u.country='VN' takes 8s\n\nRoot Cause: Missing indexes on join and filter columns\n\nOptimized Query:\nSELECT u.id, u.name, COUNT(o.id) as order_count\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.country='VN'\nGROUP BY u.id, u.name;\n\nIndex Recommendations:\nCREATE INDEX idx_users_country ON users(country);\nCREATE INDEX idx_orders_user_id ON orders(user_id);\n\nExpected Performance: 8s → 150-200ms (95% improvement)",
          good: "Your query is slow because it's missing indexes. Add indexes on the country and user_id columns. This should help speed things up.\n\nYour prompt was clear enough to identify the issue, but more specific context about table sizes and current indexes would help provide better optimization strategies.",
          goodWithSuggestions: {
            content:
              "Your query is slow because it's missing indexes. Add indexes on the country and user_id columns. This should help speed things up.\n\nYour prompt was clear enough to identify the issue, but more specific context about table sizes and current indexes would help provide better optimization strategies.\n\nSuggestions for improvement:\n- Add more specific details about the query and table sizes\n- Include information about current indexes\n- Specify expected query performance metrics",
            outputTokens: 72,
          },
          poor: "Help me make this database query faster. It's slow and I need it to be quicker.\n\nI need more information to help optimize your query. Please provide: the SQL query, table sizes, current indexes, and expected query time.",
        },
      },
      {
        id: 4,
        title: "React State Management",
        userStory:
          "You're a frontend developer in Brisbane building a complex React component with multiple state interactions. You need a prompt to help you refactor state management and improve component performance.",
        availableCards: [
          {
            id: "task-4a",
            type: "task",
            text: "Fix the component",
            cost: 3,
            effect: null,
          },
          {
            id: "task-4b",
            type: "task",
            text: "Refactor React component state management",
            cost: 5,
            effect: null,
          },
          {
            id: "task-4c",
            type: "task",
            text: "Refactor the React component to reduce re-renders, consolidate state, and improve performance",
            cost: 8,
            effect: null,
          },
          {
            id: "persona-4a",
            type: "persona",
            text: "You are a React developer",
            cost: 4,
            effect: null,
          },
          {
            id: "persona-4b",
            type: "persona",
            text: "You are an expert React developer familiar with hooks and performance optimization",
            cost: 9,
            effect: null,
          },
          {
            id: "persona-4c",
            type: "persona",
            text: "You are a senior React engineer specializing in performance optimization, hooks patterns, and component architecture for large-scale applications",
            cost: 12,
            effect: null,
          },
          {
            id: "context-4a",
            type: "context",
            text: "Component has multiple useState calls and useEffect hooks",
            cost: 5,
            effect: null,
          },
          {
            id: "context-4b",
            type: "context",
            text: "Component has 8 useState calls, 3 useEffect hooks, manages form data and API calls, re-renders on every keystroke",
            cost: 13,
            effect: null,
          },
          {
            id: "context-4c",
            type: "context",
            text: "Component has 8 useState calls (form fields, loading, errors, data), 3 useEffect hooks (fetch, validation, side effects), manages form data and async API calls, re-renders on every keystroke causing performance issues",
            cost: 17,
            effect: null,
          },
          {
            id: "format-4a",
            type: "format",
            text: "Provide refactored code",
            cost: 4,
            effect: null,
          },
          {
            id: "format-4b",
            type: "format",
            text: "Format: Current problems, Recommended approach, Code example, Performance benefits",
            cost: 7,
            effect: null,
          },
          {
            id: "format-4c",
            type: "format",
            text: "Format: Current problems (with impact), Recommended approach with reasoning, Complete code example with useReducer/useCallback, Performance metrics (render count reduction %), Testing considerations",
            cost: 10,
            effect: null,
          },
        ],
        solution: ["task-4c", "persona-4b", "context-4b", "format-4b"],
        goodOutput:
          "Current Problems: Multiple useState calls causing unnecessary re-renders, useEffect dependencies not optimized\n\nRecommended: Use useReducer for related state, memoize callbacks with useCallback, separate concerns\n\nCode Example:\nconst [state, dispatch] = useReducer(formReducer, initialState);\nconst handleChange = useCallback((e) => dispatch({...}), []);\n\nBenefits: Reduced re-renders by 60%, cleaner state logic, easier to test",
        badOutput: "My React component is slow. Can you help me make it faster and better?",
        responses: {
          excellent:
            "Current Problems:\n- 8 separate useState calls causing re-renders on every keystroke\n- 3 useEffect hooks with missing dependencies\n- No memoization of callbacks\n\nRecommended Approach: Use useReducer for form state, useCallback for handlers\n\nCode Example:\nconst [state, dispatch] = useReducer(formReducer, initialState);\nconst handleChange = useCallback((e) => {\n  dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });\n}, []);\n\nBenefits: 60% reduction in re-renders, cleaner state management, easier testing",
          good: "Your component has too many useState calls. Consider using useReducer to consolidate state. This will help reduce re-renders.\n\nYour prompt gave enough context to identify the issue, but more details about which state values are related would help provide a more targeted refactoring strategy.",
          goodWithSuggestions: {
            content:
              "Your component has too many useState calls. Consider using useReducer to consolidate state. This will help reduce re-renders.\n\nYour prompt gave enough context to identify the issue, but more details about which state values are related would help provide a more targeted refactoring strategy.\n\nSuggestions for improvement:\n- Specify which state values are related and should be consolidated\n- Include information about the expected performance metrics\n- Add details about the specific use cases where re-renders are problematic",
            outputTokens: 72,
          },
          poor: "My React component is slow. Can you help me make it faster and better?\n\nI need more specific information to help. Please provide: the component code, which state values are causing re-renders, and what performance issues you're experiencing.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Common Pitfalls",
    description: "Avoid mistakes that weaken your prompts",
    levels: [
      {
        id: 5,
        title: "Real-time Chat Feature",
        userStory:
          "You're a full-stack developer in Sydney building a real-time chat feature. You need to write a prompt to help you design the architecture, including WebSocket setup, message storage, and user presence.",
        availableCards: [
          {
            id: "task-5a",
            type: "task",
            text: "Design the chat system",
            cost: 3,
            effect: null,
          },
          {
            id: "task-5b",
            type: "task",
            text: "Design real-time chat system architecture",
            cost: 5,
            effect: null,
          },
          {
            id: "task-5c",
            type: "task",
            text: "Design a scalable real-time chat system architecture that handles 10k concurrent users with message persistence and presence tracking",
            cost: 9,
            effect: null,
          },
          {
            id: "persona-5a",
            type: "persona",
            text: "You are a system architect",
            cost: 4,
            effect: null,
          },
          {
            id: "persona-5b",
            type: "persona",
            text: "You are a system architect with expertise in real-time communication and scalability",
            cost: 11,
            effect: null,
          },
          {
            id: "persona-5c",
            type: "persona",
            text: "You are a principal systems architect with 12 years of experience building real-time communication platforms, specializing in WebSocket architecture, distributed systems, and high-concurrency scenarios",
            cost: 14,
            effect: null,
          },
          {
            id: "context-5a",
            type: "context",
            text: "Node.js backend, React frontend, need real-time messaging",
            cost: 6,
            effect: null,
          },
          {
            id: "context-5b",
            type: "context",
            text: "Node.js backend, React frontend, expect 10k concurrent users, need message history, typing indicators, user presence",
            cost: 15,
            effect: null,
          },
          {
            id: "context-5c",
            type: "context",
            text: "Node.js backend, React frontend, expect 10k concurrent users, need persistent message history (searchable), typing indicators, user presence/status, read receipts, support for multiple chat rooms",
            cost: 19,
            effect: null,
          },
          {
            id: "format-5a",
            type: "format",
            text: "Explain how to build it",
            cost: 4,
            effect: null,
          },
          {
            id: "format-5b",
            type: "format",
            text: "Format: Architecture diagram (text), Tech stack, Data models, WebSocket events, Scaling considerations",
            cost: 9,
            effect: null,
          },
          {
            id: "format-5c",
            type: "format",
            text: "Format: High-level architecture diagram (ASCII), Tech stack with justification, Complete data models (schema), WebSocket event definitions, Scaling strategy, Deployment considerations, Monitoring/logging approach",
            cost: 12,
            effect: null,
          },
        ],
        solution: ["task-5c", "persona-5b", "context-5b", "format-5b"],
        goodOutput:
          "Architecture: Client → WebSocket → Node.js Server → Redis (pub/sub) → PostgreSQL\n\nTech Stack: Socket.io, Redis, PostgreSQL, React\n\nData Models:\n- Messages: {id, room_id, user_id, text, timestamp}\n- Users: {id, username, status}\n- Rooms: {id, name, created_at}\n\nWebSocket Events: connect, disconnect, message, typing, presence_update\n\nScaling: Use Redis for pub/sub across multiple servers, horizontal scaling with load balancer",
        badOutput: "I need to build a chat system. Tell me how to do it.",
        responses: {
          excellent:
            "Architecture Overview:\nClient (React) → WebSocket (Socket.io) → Node.js Server → Redis (pub/sub) → PostgreSQL\n\nTech Stack Justification:\n- Socket.io: Reliable real-time communication\n- Redis: Fast pub/sub for multi-server scaling\n- PostgreSQL: Persistent message storage\n\nData Models:\n- Messages: {id, room_id, user_id, text, timestamp, read_at}\n- Users: {id, username, status, last_seen}\n- Rooms: {id, name, created_at, updated_at}\n\nWebSocket Events:\n- connect, disconnect, message, typing, presence_update, read_receipt\n\nScaling Strategy: Redis pub/sub for multi-server communication, horizontal scaling with load balancer",
          good: "You can use Node.js with Socket.io for real-time communication and PostgreSQL for storage. Use Redis for scaling across multiple servers.\n\nYour prompt had the right idea but lacked specific details about data models and scaling. Adding more context about expected user count and feature requirements would help.",
          goodWithSuggestions: {
            content:
              "You can use Node.js with Socket.io for real-time communication and PostgreSQL for storage. Use Redis for scaling across multiple servers.\n\nYour prompt had the right idea but lacked specific details about data models and scaling. Adding more context about expected user count and feature requirements would help.\n\nSuggestions for improvement:\n- Specify the expected user count and concurrent users\n- Include details about required features (typing indicators, read receipts, etc.)\n- Add information about data model requirements and performance metrics",
            outputTokens: 72,
          },
          poor: "I need to build a chat system. Tell me how to do it.\n\nI need more specific information to provide a good architecture. Please provide: expected concurrent users, required features (typing indicators, read receipts, etc.), and your tech stack preferences.",
        },
      },
    ],
  },
]
