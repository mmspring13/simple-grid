import { usePreview } from '@/hooks/usePreview';
import { useBuilderStore } from '@/store/builder';
import { PreviewCard } from '../preview-card';

export const PreviewMasonry = () => {
  const { visibleNotes, templateWidth } = usePreview();
  const { form } = useBuilderStore();

  return (
    <div
      className="flex flex-col flex-wrap gap-4 p-4 content-baseline h-[900px]"
      style={{ width: templateWidth }}
    >
      {visibleNotes.map((note) => (
        <PreviewCard
          key={note.id}
          userId={note.userId}
          caption={note.caption}
          date={note.date}
          id={note.id}
          hoverable={form.cartStyle === 'hoverable'}
          className="h-max w-80"
        />
      ))}
    </div>
  );
};
