import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Logs } from '@/types/logs';
import { Link } from '@inertiajs/react';
import LogsFormSheet from './logs-form-sheet';
import LogsDeleteDialog from './logs-delete-dialog';

type Props = {
  logs: Logs;
};

const LogsItemCard: FC<Props> = ({ logs }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ logs.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { logs.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('logs.show', logs.id)}>
            <Folder />
          </Link>
        </Button>
        <LogsFormSheet purpose="edit" logs={ logs }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </LogsFormSheet>
        <LogsDeleteDialog logs={ logs }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </LogsDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default LogsItemCard;
