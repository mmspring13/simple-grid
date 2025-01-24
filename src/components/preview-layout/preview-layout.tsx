import { useMemo } from 'react';
import { useBuilderStore } from '../../store/builder';
import { Pagination } from '@heroui/pagination';
import { Button } from '@heroui/button';
import { PreviewGrid } from '../preview-grid';
import { usePreviewStore } from '@/store/preview';
import { useNotesStore } from '@/store/notes-api';
import { PreviewMasonry } from '../preview-masonry';
import { usePreview } from '@/hooks/usePreview';

export const PreviewLayout = () => {
  const { form } = useBuilderStore();
  const { setNavigation, navigation } = usePreviewStore();
  const { templateWidth } = usePreview();
  const { notes } = useNotesStore();

  const pagination = useMemo(() => {
    if (form.navigation !== 'pagination') {
      return null;
    }
    const currentPage = Math.floor(navigation.skip / navigation.take) + 1;

    const pages = Math.ceil(notes.length / navigation.take);

    return {
      currentPage,
      pages,
    };
  }, [form.navigation, navigation, notes.length]);

  const changePage = (page: number) => {
    const take = form.columns * form.rows;
    setNavigation({ skip: (page - 1) * take, take });
  };

  return (
    <div className="grid grid-rows-[1fr_auto] h-full gap-y-6 min-w">
      {form.template === 'grid' && <PreviewGrid />}
      {form.template === 'masonry' && <PreviewMasonry />}
      <div className="p-4" style={{ width: templateWidth }}>
        {form.navigation === 'load-more' && (
          <Button
            color="primary"
            isDisabled={navigation.take >= notes.length}
            className="sticky left-2 mb-4"
            onPress={() =>
              setNavigation({
                take: navigation.take + 24,
              })
            }
          >
            Load More
          </Button>
        )}
        {pagination && (
          <Pagination
            initialPage={pagination.currentPage}
            isDisabled={navigation.take >= notes.length}
            classNames={{
              base: 'sticky left-2 mb-4 w-max',
            }}
            total={pagination.pages}
            onChange={changePage}
          />
        )}
      </div>
    </div>
  );
};
