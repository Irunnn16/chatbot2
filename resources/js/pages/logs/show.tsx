import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Logs } from '@/types/logs';
import { FC } from 'react';

type Props = {
  logs: Logs;
};

const ShowLogs: FC<Props> = ({ logs }) => {
  return (
    <AppLayout title="Detail Logs" description="Detail logs">
      <Card>
        <CardHeader>
          <CardTitle>{ logs.question }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowLogs;
