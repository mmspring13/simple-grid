import { create } from 'zustand';

export type Note = {
  id: string;
  caption: string;
  date: string;
  comments: number;
  likes: number;
  userId: string;
};

export class NoteFetchError extends Error {
  constructor(
    public status: number,
    message: string,
    public payload?: unknown
  ) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export const useNotesStore = create<{
  pending: boolean;
  fetch: () => Promise<void>;
  notes: Note[];
  error?: NoteFetchError;
}>((set) => ({
  pending: false,
  fetch: async () => {
    set(() => ({ pending: true }));
    try {
      const postsFetch = await fetch(
        'https://mirror-app-frontend-demo-server.vercel.app/posts'
      );
      const response = await postsFetch.json();
      if (!postsFetch.ok || postsFetch.status !== 200) {
        throw new NoteFetchError(
          postsFetch.status,
          response?.message || '',
          response
        );
      }
      // set(() => ({ notes: [...response, ...response, ...response] }));
      set(() => ({ notes: response }));
    } catch (error: unknown) {
      if (error instanceof NoteFetchError) {
        set(() => ({ error }));
      } else if (error instanceof Error) {
        set(() => ({ error: new NoteFetchError(0, 'Unknown error') }));
      }
    } finally {
      set(() => ({ pending: false }));
    }
  },
  notes: [],
}));
