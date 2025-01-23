import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/react';

export type PreviewCardProps = {
  id: string;
  caption: string;
  userId: string;
  date: string;
  hoverable?: boolean;
  className?: string;
};

export const PreviewCard = ({
  id,
  caption,
  userId,
  date,
  hoverable,
  className,
}: PreviewCardProps) => {
  return (
    <Card
      className={className}
      isHoverable={hoverable}
      ref={(n) => {
        console.log('nnn', n);
      }}
    >
      <CardHeader className="flex">
        <p>{caption}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-sm">user-id: {userId}</p>
        <p className="pt-1 text-sm text-default-500"># {id}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center">
        <p className="text-sm text-default-600">{date}</p>
      </CardFooter>
    </Card>
  );
};
