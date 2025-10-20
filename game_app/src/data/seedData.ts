import { Card, Level, Chapter } from './types'

export const cards: Record<string, Card> = {
  'c-task-1': {
    id: 'c-task-1',
    type: 'task',
    title: 'Landing page task',
    text: 'Code a one-page landing site for a mobile app.',
    tag: 'task',
    quality: 'correct',
  },
  'c-task-wrong-1': {
    id: 'c-task-wrong-1',
    type: 'task',
    title: 'Unclear task',
    text: 'Do a thing.',
    tag: 'task',
    quality: 'wrong',
  },
  'c-persona-1': {
    id: 'c-persona-1',
    type: 'persona',
    title: 'Senior web dev',
    text: 'Act as a senior web developer with accessibility expertise.',
    tag: 'persona',
    quality: 'correct',
  },
  'c-persona-wrong-1': {
    id: 'c-persona-wrong-1',
    type: 'persona',
    title: 'Weird persona',
    text: 'Be the CEO of a potato.',
    tag: 'persona',
    quality: 'wrong',
  },
  'c-context-1': {
    id: 'c-context-1',
    type: 'context',
    title: 'Pet adoption app',
    text: 'The app is for pet adoption; tone friendly, trustworthy; target: young adults.',
    tag: 'context',
    quality: 'correct',
  },
  'c-format-1': {
    id: 'c-format-1',
    type: 'format',
    title: 'Single HTML file',
    text: 'Return a single HTML file with Tailwind classes; include a hero and CTA.',
    tag: 'format',
    quality: 'correct',
  },
  'c-vague-1': {
    id: 'c-vague-1',
    type: 'vague',
    title: 'Make something cool',
    text: 'Make something cool and modern.',
    tag: 'vague',
    quality: 'wrong',
  },
}

export const levels: Record<string, Level> = {
  l1: {
    id: 'l1',
    title: 'L1 — The First Flame',
    challenge: 'A client needs a landing page for their new pet adoption app.',
    availableCardIds: ['c-task-1', 'c-context-1', 'c-vague-1', 'c-task-wrong-1'],
    required: ['task', 'context'],
    forbidden: ['vague'],
    tips: ['Be explicit about the user and purpose; small examples help.'],
    userStory:
      'As a product owner, I want a clear landing page that helps users adopt pets so that adoption rates increase.',
  },
  l2: {
    id: 'l2',
    title: 'L2 — Persona’s Touch',
    challenge: 'Quality must be consistent; adopt the right voice.',
    availableCardIds: ['c-task-1', 'c-persona-1', 'c-persona-wrong-1', 'c-context-1', 'c-vague-1'],
    required: ['task', 'persona', 'context'],
    forbidden: ['vague'],
    tips: ['Including a persona stabilizes tone.'],
    userStory:
      'As a marketing lead, I want a landing page tone that matches our brand voice so users trust the product.',
  },
  l3: {
    id: 'l3',
    title: 'L3 — Shape the Output',
    challenge: 'The dev team wants a specific output format.',
    availableCardIds: ['c-task-1', 'c-persona-1', 'c-context-1', 'c-format-1', 'c-vague-1'],
    required: ['task', 'persona', 'context', 'format'],
    forbidden: ['vague'],
    tips: ['Formats constrain structure and make outputs predictable.'],
    userStory:
      'As a developer, I want the output in a single HTML file with Tailwind so integration is straightforward.',
  },
}

export const chapters: Record<string, Chapter> = {
  ch1: {
    id: 'ch1',
    title: 'Foundations',
    description: 'Clarity, Roles, and Context',
    levelIds: ['l1', 'l2', 'l3'],
    learnings: ['Task clarity', 'Use personas', 'Add context'],
  },
}
