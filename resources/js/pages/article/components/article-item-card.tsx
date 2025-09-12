import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Article } from '@/types/article';
import { Link } from '@inertiajs/react';
import ArticleFormSheet from './article-form-sheet';
import ArticleDeleteDialog from './article-delete-dialog';

type Props = {
  article: Article;
};

const ArticleItemCard: FC<Props> = ({ article }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ article.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { article.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('article.show', article.id)}>
            <Folder />
          </Link>
        </Button>
        <ArticleFormSheet purpose="edit" article={ article }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ArticleFormSheet>
        <ArticleDeleteDialog article={ article }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ArticleDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ArticleItemCard;
