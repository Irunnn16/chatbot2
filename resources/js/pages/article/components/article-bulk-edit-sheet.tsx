import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Article } from '@/types/article';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  articleIds: Article['id'][];
};

const ArticleBulkEditSheet: FC<Props> = ({ children, articleIds }) => {
  const { data, put } = useForm({
    article_ids: articleIds,
  });

  const handleSubmit = () => {
    put(route('article.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Article updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah article</SheetTitle>
          <SheetDescription>Ubah data {data.article_ids.length} article</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan article
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ArticleBulkEditSheet;
