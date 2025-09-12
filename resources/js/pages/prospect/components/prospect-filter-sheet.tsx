import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { router, useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  query: {[key: string]: string}
};

const ProspectFilterSheet: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, get } = useForm({
    jurusan: '',
    kode: '',
    prospek_kerja: '',
  });

  const applyFilter = () => {
    get(route('prospect.index'), {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => {
        toast.success('Filter applied successfully');
        setOpen(false);
      },
    });
  };

  const resetFilter = () => {
    setData('jurusan', '');
    router.get(
      route('prospect.index'),
      {
        jurusan: '',
        kode: '',
        prospek_kerja: '',
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter prospect</SheetTitle>
          <SheetDescription>Filter data prospect</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            method="get"
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter();
            }}
          >
            <FormControl label="Jurusan">
              <Input type="text" placeholder="Jurusan" value={data.jurusan} onChange={(e) => setData('jurusan', e.target.value)} />
            </FormControl>
            <FormControl label="Kode">
              <Input type="text" placeholder="Kode" value={data.kode} onChange={(e) => setData('kode', e.target.value)} />
            </FormControl>
            <FormControl label="Prospek Kerja">
              <Input type="text" placeholder="Name prospect" value={data.prospek_kerja} onChange={(e) => setData('prospek_kerja', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" onClick={applyFilter}>
            <Check /> Apply filter
          </Button>
          <Button variant={'outline'} onClick={resetFilter}>
            <X /> Reset filter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProspectFilterSheet;