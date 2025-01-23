import { useBuilderStore } from '@/store/builder';
import { useNotesStore } from '@/store/notes-api';
import { usePreviewStore } from '@/store/preview';
import { useMemo } from 'react';

export const itemWidth = 320;
export const itemMaxHeight = 396;

export const usePreview = () => {
  const { form } = useBuilderStore();
  const { notes } = useNotesStore();
  const { navigation } = usePreviewStore();

  const visibleNotes = useMemo(() => {
    if (form.navigation === 'pagination') {
      return notes.slice(navigation.skip, navigation.skip + navigation.take);
    }
    if (form.navigation === 'load-more') {
      return notes.slice(0, navigation.take);
    }
    return [];
  }, [form.navigation, notes, navigation.skip, navigation.take]);

  const [cols, rows] = useMemo(() => {
    let cols = form.columns;
    let rows = form.rows;
    if (cols > visibleNotes.length) {
      cols = visibleNotes.length;
    }
    if (rows > visibleNotes.length / cols) {
      rows = Math.ceil(visibleNotes.length / cols);
    }
    return [cols, rows];
  }, [form.columns, form.rows, visibleNotes.length]);

  const templateWidth = useMemo(() => {
    return `${(cols - 1) * 16 + itemWidth * cols}px`;
  }, [cols]);

  return { visibleNotes, templateWidth, cols, rows };
};
