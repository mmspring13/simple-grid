import { useEffect } from 'react';
import { Layout } from './components/layout';
import { useNotesStore } from './store/notes-api';

function App() {
  const { fetch } = useNotesStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <Layout />;
}

export default App;
