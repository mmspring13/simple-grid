import { create } from 'zustand';

export const templates = ['masonry', 'grid'] as const;
export type Templates = typeof templates;
export const cartStyles = ['classic', 'hoverable'] as const;
export type CartStyles = typeof cartStyles;
export const navigations = ['pagination', 'load-more'] as const;
export type Navigations = typeof navigations;

export type BuilderStoreForm = {
  columns: number;
  rows: number;
  template: Templates[number];
  cartStyle: CartStyles[number];
  navigation: Navigations[number];
};

export const useBuilderStore = create<{
  form: BuilderStoreForm;
  setFormData: (data: BuilderStoreForm) => void;
}>((set) => ({
  form: {
    columns: 4,
    rows: 3,
    template: 'masonry',
    navigation: 'load-more',
    cartStyle: 'classic',
  },

  setFormData: (data: BuilderStoreForm) => set(() => ({ form: data })),
}));
