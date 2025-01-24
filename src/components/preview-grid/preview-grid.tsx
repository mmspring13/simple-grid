import { usePreview } from '@/hooks/usePreview';
import cn from 'classnames';
import { PreviewCard } from '../preview-card';
import { useBuilderStore } from '@/store/builder';
import { useMemo, useRef } from 'react';

export const PreviewGrid = () => {
  const { visibleNotes, cols, rows } = usePreview();
  const { form } = useBuilderStore();
  const gridRef = useRef<HTMLDivElement>(null);

  const templateClassName = useMemo(() => {
    return cn(
      'grid gap-4 min-w-[36.625rem] h-max p-4',
      `grid-cols-${cols}`,
      `grid-rows-${rows}`
    );
  }, [cols, rows]);

  return (
    <div className={templateClassName} ref={gridRef}>
      {visibleNotes.map((note) => {
        return (
          <PreviewCard
            key={note.id}
            userId={note.userId}
            caption={note.caption}
            date={note.date}
            id={note.id}
            hoverable={form.cartStyle === 'hoverable'}
            className="w-full h-full"
          />
        );
      })}
    </div>
  );
};
