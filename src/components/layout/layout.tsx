import { useNotesStore } from '@/store/notes-api';
import { BuilderForm } from '../builder-form';
import { PreviewLayout } from '../preview-layout';
import { Spinner } from '@heroui/react';

export const Layout = () => {
  const { pending } = useNotesStore();

  return (
    <div className="h-full w-full text-white grid grid-cols-[var(--sidebar-width)_1fr]">
      <aside className="w-[--sidebar-width] bg-slate-950 p-4 sticky top-0 h-dvh min-h-96">
        <BuilderForm />
      </aside>
      <main className="flex-1 overflow-auto bg-slate-800">
        {pending ? (
          <Spinner
            classNames={{
              wrapper: 'relative left-8 top-8',
            }}
          />
        ) : (
          <PreviewLayout />
        )}
      </main>
    </div>
  );
};
