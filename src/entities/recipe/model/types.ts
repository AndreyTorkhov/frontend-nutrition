export type Recipe = {
  id: string;
  title: string;
  cover: string;
  short: string;
  tags: string[];
  timeMin: number;
  // позже: автор, рейтинг, ингредиенты, шаги и т.д.
};
