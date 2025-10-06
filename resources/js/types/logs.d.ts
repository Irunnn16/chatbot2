import { User } from "./user";
import { Category } from "./category";


export type Logs = {
  id: number;
  user_id: User['id'];
  user: User;
  name: string;
  category_id: Category['id'];
  category: Category;
  question: string;
  created_at: string;
  updated_at: string;
};
