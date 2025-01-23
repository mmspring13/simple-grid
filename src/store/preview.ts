import { create } from 'zustand';
import { Note } from './notes-api';

export type DataItem = Note;

export type PreviewStore = {
  data: DataItem[];
  navigation: { total: number; skip: number; take: number };
  setNavigation: (payload: Partial<PreviewStore['navigation']>) => void;
};

export const usePreviewStore = create<PreviewStore>((set) => ({
  data: [],
  navigation: { total: 0, skip: 0, take: 8 },
  setNavigation: (payload: Partial<PreviewStore['navigation']>) =>
    set((s) => ({
      navigation: {
        ...s.navigation,
        ...payload,
      },
    })),
}));
