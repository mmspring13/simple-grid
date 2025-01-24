import { create } from 'zustand';
import { Note } from './notes-api';

export type DataItem = Note;

export type PreviewStore = {
  data: DataItem[];
  navigation: { skip: number; take: number };
  setNavigation: (payload: Partial<PreviewStore['navigation']>) => void;
};

export const usePreviewStore = create<PreviewStore>((set) => ({
  data: [],
  navigation: { skip: 0, take: 16 },
  setNavigation: (payload: Partial<PreviewStore['navigation']>) =>
    set((s) => ({
      navigation: {
        ...s.navigation,
        ...payload,
      },
    })),
}));
