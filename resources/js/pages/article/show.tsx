import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Article } from '@/types/article';
import { FC } from 'react';

type Props = {
  article: Article;
};

const ShowArticle: FC<Props> = ({ article }) => {
  return (
    <AppLayout title="Detail Article" description="Detail article">
      <Card>
        <CardHeader>
          <CardTitle>{ article.title }</CardTitle>
          <CardDescription>
            Kategori: { article.kategori } <br />
            Content:
            { article.content }
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowArticle;
