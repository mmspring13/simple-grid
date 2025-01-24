import { itemWidth, usePreview } from '@/hooks/usePreview';
import { useBuilderStore } from '@/store/builder';
import { PreviewCard } from '../preview-card';
import { useCallback, useEffect, useRef } from 'react';
import { usePreviewStore } from '@/store/preview';

export const PreviewMasonry = () => {
  const { visibleNotes, cols } = usePreview();
  const { navigation } = usePreviewStore();
  const { form } = useBuilderStore();
  const gridRef = useRef<HTMLDivElement>(null);

  const calculateMasonry = useCallback(
    (el: HTMLDivElement, gap = 16) => {
      const children = Array.from(el.children) as HTMLElement[];

      el.style.position = 'relative';

      const columnHeights = new Array(cols).fill(0);

      children.forEach((child) => {
        const minHeight = Math.min(...columnHeights);
        const targetColumn = columnHeights.indexOf(minHeight);

        const x = targetColumn * (itemWidth + gap);
        const y = columnHeights[targetColumn];

        child.style.position = 'absolute';
        child.style.transform = `translate(${x}px, ${y}px)`;

        columnHeights[targetColumn] += child.offsetHeight + gap;
      });

      el.style.height = `${Math.max(...columnHeights)}px`;
    },
    [cols]
  );

  useEffect(() => {
    if (gridRef.current) {
      calculateMasonry(gridRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateMasonry, JSON.stringify(navigation)]);

  return (
    <div className="relative p-4" ref={gridRef}>
      {visibleNotes.map((note) => {
        return (
          <PreviewCard
            key={note.id}
            userId={note.userId}
            caption={note.caption}
            date={note.date}
            id={note.id}
            hoverable={form.cartStyle === 'hoverable'}
            className="w-[20rem]"
          />
        );
      })}
    </div>
  );
};
