import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Logs } from '@/types/logs';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import LogsDeleteDialog from './components/logs-delete-dialog';
import LogsFilterSheet from './components/logs-filter-sheet';
import LogsFormSheet from './components/logs-form-sheet';
import LogsBulkEditSheet from './components/logs-bulk-edit-sheet';
import LogsBulkDeleteDialog from './components/logs-bulk-delete-dialog';

type Props = {
  logs: Logs[];
  query: { [key: string]: string };
  categories: { id: number; name: string }[];
};

const LogsList: FC<Props> = ({ logs, query, categories }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Logss"
      description="Manage your logs"
      actions={
        <>
          {permissions?.canAdd && (
            <LogsFormSheet purpose="create">
              <Button>
                <Plus />
                Create new logs
              </Button>
            </LogsFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search logs..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <LogsFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </LogsFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <LogsBulkEditSheet logsIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </LogsBulkEditSheet>
            <LogsBulkDeleteDialog logsIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </LogsBulkDeleteDialog>
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
                    checked={ids.length === logs.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(logs.map((logs) => logs.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Aplikan</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs
            .filter((logs) => JSON.stringify(logs).toLowerCase().includes(cari.toLowerCase()))
            .map((logs) => (
              <TableRow key={logs.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(logs.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, logs.id]);
                          } else {
                            setIds(ids.filter((id) => id !== logs.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ logs.user_id }</TableCell>
                <TableCell>{ logs.category?.name || 'N/A' }</TableCell>
                <TableCell>
                  <div className="line-clamp-1 max-w-96 truncate">{ logs.question }</div>
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('logs.show', logs.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      
                      <LogsFormSheet purpose="edit" logs={logs}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </LogsFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <LogsDeleteDialog logs={logs}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </LogsDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default LogsList;
