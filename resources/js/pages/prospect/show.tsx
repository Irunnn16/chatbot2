import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Prospect } from '@/types/prospect';
import { FC } from 'react';

type Props = {
  prospect: Prospect;
};

const ShowProspect: FC<Props> = ({ prospect }) => {
  return (
    <AppLayout title="Detail Prospect" description="Detail prospect">
      <Card>
        <CardHeader>
          <CardTitle>{ prospect.jurusan }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowProspect;
