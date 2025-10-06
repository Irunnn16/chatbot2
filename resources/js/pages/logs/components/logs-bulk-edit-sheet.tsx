import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Logs } from '@/types/logs';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  logsIds: Logs['id'][];
};

const LogsBulkEditSheet: FC<Props> = ({ children, logsIds }) => {
  const { data, put } = useForm({
    logs_ids: logsIds,
  });

  const handleSubmit = () => {
    put(route('logs.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Logs updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah logs</SheetTitle>
          <SheetDescription>Ubah data {data.logs_ids.length} logs</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan logs
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

export default LogsBulkEditSheet;
