import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Prospect } from '@/types/prospect';
import { Link } from '@inertiajs/react';
import ProspectFormSheet from './prospect-form-sheet';
import ProspectDeleteDialog from './prospect-delete-dialog';

type Props = {
  prospect: Prospect;
};

const ProspectItemCard: FC<Props> = ({ prospect }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ prospect.jurusan }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { prospect.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('prospect.show', prospect.id)}>
            <Folder />
          </Link>
        </Button>
        <ProspectFormSheet purpose="edit" prospect={ prospect }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ProspectFormSheet>
        <ProspectDeleteDialog prospect={ prospect }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ProspectDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ProspectItemCard;
