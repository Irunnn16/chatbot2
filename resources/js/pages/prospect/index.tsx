import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Prospect } from '@/types/prospect';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ProspectDeleteDialog from './components/prospect-delete-dialog';
import ProspectFilterSheet from './components/prospect-filter-sheet';
import ProspectFormSheet from './components/prospect-form-sheet';
import ProspectBulkEditSheet from './components/prospect-bulk-edit-sheet';
import ProspectBulkDeleteDialog from './components/prospect-bulk-delete-dialog';
type Props = {
  prospects: Prospect[];
  query: { [key: string]: string };
};

const ProspectList: FC<Props> = ({ prospects, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Prospects"
      description="Manage your prospects"
      actions={
        <>
          {permissions?.canAdd && (
            <ProspectFormSheet purpose="create">
              <Button>
                <Plus />
                Create new prospect
              </Button>
            </ProspectFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search prospects..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ProspectFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ProspectFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ProspectBulkEditSheet prospectIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ProspectBulkEditSheet>
            <ProspectBulkDeleteDialog prospectIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ProspectBulkDeleteDialog>
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
                    checked={ids.length === prospects.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(prospects.map((prospect) => prospect.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Prospek Kerja</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects
            .filter((prospect) => JSON.stringify(prospect).toLowerCase().includes(cari.toLowerCase()))
            .map((prospect) => (
              <TableRow key={prospect.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(prospect.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, prospect.id]);
                          } else {
                            setIds(ids.filter((id) => id !== prospect.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ prospect.jurusan }</TableCell>
                <TableCell>{ prospect.kode }</TableCell>
                <TableCell>
                  <div className="line-clamp-1 max-w-96 truncate">{ prospect.prospek_kerja }</div>
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('prospect.show', prospect.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      
                      <ProspectFormSheet purpose="edit" prospect={prospect}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </ProspectFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <ProspectDeleteDialog prospect={prospect}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ProspectDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ProspectList;
