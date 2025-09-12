import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Article } from '@/types/article';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ArticleDeleteDialog from './components/article-delete-dialog';
import ArticleFilterSheet from './components/article-filter-sheet';
import ArticleFormSheet from './components/article-form-sheet';
import ArticleBulkEditSheet from './components/article-bulk-edit-sheet';
import ArticleBulkDeleteDialog from './components/article-bulk-delete-dialog';
import ArticleUploadMediaSheet from './components/article-upload-sheet';

type Props = {
  articles: Article[];
  query: { [key: string]: string };
};

const ArticleList: FC<Props> = ({ articles, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Articles"
      description="Manage your articles"
      actions={
        <>
          {permissions?.canAdd && (
            <ArticleFormSheet purpose="create">
              <Button>
                <Plus />
                Create new article
              </Button>
            </ArticleFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search articles..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ArticleFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ArticleFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ArticleBulkEditSheet articleIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ArticleBulkEditSheet>
            <ArticleBulkDeleteDialog articleIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ArticleBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === articles.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(articles.map((article) => article.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles
            .filter((article) => JSON.stringify(article).toLowerCase().includes(cari.toLowerCase()))
            .map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(article.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, article.id]);
                          } else {
                            setIds(ids.filter((id) => id !== article.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ article.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('article.show', article.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <ArticleUploadMediaSheet article={article}>
    <Button variant={'ghost'} size={'icon'}>
        <Image />
    </Button>
</ArticleUploadMediaSheet>
                      <ArticleFormSheet purpose="edit" article={article}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </ArticleFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <ArticleDeleteDialog article={article}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ArticleDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ArticleList;
