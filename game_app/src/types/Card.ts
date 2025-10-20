export type Card = {
  id: string;
  title: string;
  text: string;
  type: 'task' | 'persona' | 'context' | 'format';
  tag: string;
  quality: 'optimized' | 'non-optimized' | 'wrong';
};