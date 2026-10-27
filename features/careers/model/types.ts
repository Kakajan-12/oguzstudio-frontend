export type Position = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  /** Employment type, e.g. "Full-time" */
  type: string;
  location: string;
};
