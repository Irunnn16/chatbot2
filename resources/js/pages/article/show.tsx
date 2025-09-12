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
          <CardTitle>{ article.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowArticle;
