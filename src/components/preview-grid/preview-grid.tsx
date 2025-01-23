import { usePreview } from '@/hooks/usePreview';
import cn from 'classnames';
import { PreviewCard } from '../preview-card';
import { useBuilderStore } from '@/store/builder';
import { useMemo } from 'react';

export const PreviewGrid = () => {
  const { visibleNotes, cols, rows, templateWidth } = usePreview();
  const { form } = useBuilderStore();

  const templateClassName = useMemo(() => {
    return cn(
      'grid gap-4 min-w-[36.625rem] h-max p-4',
      `grid-cols-${cols}`,
      `grid-rows-${rows}`
    );
  }, [cols, rows]);

  const previewCardClassName = useMemo(() => {}, []);

  const isMasonry = form.template === 'masonry';

  return (
    <div
      className={templateClassName}
      style={{ width: templateWidth }}
      id="grid"
    >
      {visibleNotes.map((note, i) => {
        const row = Math.floor(i / cols);
        const col = i - cols * row;
        console.log('row^col', row, col);
        return (
          <PreviewCard
            key={note.id}
            // userId={note.userId}
            userId={`${col} : ${row}`}
            caption={note.caption}
            date={note.date}
            id={note.id}
            hoverable={form.cartStyle === 'hoverable'}
            // className="h-full w-full"
            className={cn('w-full', {
              'h-max': isMasonry,
              'h-full': !isMasonry,
            })}
          />
        );
      })}
    </div>
  );
};
