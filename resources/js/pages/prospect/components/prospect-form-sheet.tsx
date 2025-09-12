import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em, capitalizeWords } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Prospect } from '@/types/prospect';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  prospect?: Prospect;
  purpose: FormPurpose;
};

const ProspectFormSheet: FC<Props> = ({ children, prospect, purpose }) => {
  const [open, setOpen] = useState(false);

  const { data, setData, put, post, reset, processing } = useForm({
    jurusan: prospect?.jurusan ?? '',
    kode: prospect?.kode ?? '',
    prospek_kerja: prospect?.prospek_kerja ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('prospect.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Prospect created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('prospect.update', prospect?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Prospect updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data prospect</SheetTitle>
          <SheetDescription>Form untuk {purpose} data prospect</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Jurusan">
              <Input type="text" placeholder="Jurusan" value={data.jurusan} onChange={(e) => setData('jurusan', e.target.value)} />
            </FormControl>
            <FormControl label="Kode">
              <Input type="text" placeholder="Kode" value={data.kode} onChange={(e) => setData('kode', e.target.value)} />
            </FormControl>
            <FormControl label="Prospek Kerja">
              <Input type="text" placeholder="Prospek Kerja" value={data.prospek_kerja} onChange={(e) => setData('prospek_kerja', e.target.value)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} prospect`} loading={processing} disabled={processing} />
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

export default ProspectFormSheet;
