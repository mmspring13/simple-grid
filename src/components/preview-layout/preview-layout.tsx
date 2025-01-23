import { useMemo } from 'react';
import { useBuilderStore } from '../../store/builder';
import { Pagination } from '@heroui/pagination';
import { Button } from '@heroui/button';
import { PreviewGrid } from '../preview-grid';
import { usePreviewStore } from '@/store/preview';
import { useNotesStore } from '@/store/notes-api';
import { PreviewMasonry } from '../preview-masonry';

export const PreviewLayout = () => {
  const { form } = useBuilderStore();
  const { setNavigation, navigation } = usePreviewStore();
  const { notes } = useNotesStore();

  const pagination = useMemo(() => {
    if (form.navigation !== 'pagination') {
      return null;
    }
    const currentPage = Math.floor(navigation.skip / navigation.take) + 1;

    const pages = Math.ceil(navigation.total / navigation.take);

    return {
      currentPage,
      pages,
    };
  }, [form.navigation, navigation.skip, navigation.take, navigation.total]);

  const changePage = (page: number) => {
    setNavigation({ skip: page * navigation.take });
  };

  return (
    <div className="grid grid-rows-[1fr_auto] h-full gap-y-6 min-w">
      <PreviewGrid />
      {/* {form.template === 'grid' && <PreviewGrid />}
      {form.template === 'masonry' && <PreviewMasonry />} */}
      <div className="flex items-center justify-center pb-4">
        {form.navigation === 'load-more' && (
          <Button
            color="primary"
            isDisabled={navigation.take >= notes.length}
            className="sticky left-2 right-2 margin-auto"
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
            total={pagination.pages}
            onChange={changePage}
          />
        )}
      </div>
    </div>
  );
};
