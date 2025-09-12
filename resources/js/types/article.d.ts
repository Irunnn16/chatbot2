import { Media } from '.';
import { User } from './user';

export type Article = {
  id: number;
  user_id: User['id'];
  user: User;
  title: string;
  kategori: string;
  content: string;
  media: Media[];
  created_at: string;
  updated_at: string;
};
