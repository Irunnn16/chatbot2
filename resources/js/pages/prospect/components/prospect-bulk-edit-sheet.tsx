import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Prospect } from '@/types/prospect';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  prospectIds: Prospect['id'][];
};

const ProspectBulkEditSheet: FC<Props> = ({ children, prospectIds }) => {
  const { data, put } = useForm({
    prospect_ids: prospectIds,
  });

  const handleSubmit = () => {
    put(route('prospect.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Prospect updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah prospect</SheetTitle>
          <SheetDescription>Ubah data {data.prospect_ids.length} prospect</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan prospect
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

export default ProspectBulkEditSheet;
