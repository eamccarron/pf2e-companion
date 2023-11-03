import { useCallback, useState, useEffect } from 'react';

import { filterContent } from '../lib/filterContent';

import type { Filter } from '../lib/filterContent';
import type { Selection } from './SelectionContextProvider';
import { Box, Stack, Checkbox, Chip } from '@mui/material';
// import { Chip } from '@mui/material-next';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export type ContentListFilterProps<T extends Selection<unknown>> = {
  filterMode: 'any' | 'all';
  filters: Array<Filter<T>>;
  content: Array<T>;
  setContent: React.Dispatch<React.SetStateAction<Array<T>>>;
  initialContent: Array<T>;
};

export function ContentListFilter<T extends Selection<unknown>>({
  filterMode,
  filters,
  content,
  setContent,
  initialContent,
}: ContentListFilterProps<T>) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const updateFilter = useCallback(() => {
    if (!initialContent) return;

    let filteredContent: Array<T> = [];
    const activeFilters =
      filters.filter((f) => selectedFilters.includes(f.label)) ?? [];

    if (activeFilters.length === 0) {
      setContent(initialContent);
      return;
    }

    if (filterMode === 'any') {
      console.log(activeFilters);
      filteredContent = activeFilters
        .map((filter: Filter<T>, i) => {
          return filterContent(initialContent, [filter]);
        })
        .flat();
    } else {
      filteredContent = filterContent(initialContent, filters);
    }

    const filteredContentIDs = new Set(filteredContent.map((c) => c.id));
    filteredContent = initialContent.filter((c: T) =>
      filteredContentIDs.has(c.id)
    );
    setContent(filteredContent);
  }, [selectedFilters, setContent, filters, filterMode, initialContent]);

  useEffect(() => {
    console.log(selectedFilters);
    updateFilter();
  }, [selectedFilters, initialContent]);

  const handleFilterSelection = (label: string) => {
    if (selectedFilters.includes(label)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== label));
    } else {
      setSelectedFilters([...selectedFilters, label]);
    }
  };

  const FilterChip = ({ label }: { label: string }) => (
    <Chip
      clickable
      label={label}
      onClick={() => handleFilterSelection(label)}
      icon={selectedFilters.includes(label) ? <CheckCircleIcon /> : undefined}
    ></Chip>
  );

  return (
    <Stack direction="row">
      {filters.map(({ label }) => (
        <Box
          key={label}
          margin={1}
        >
          <FilterChip label={label} />
        </Box>
      ))}
    </Stack>
  );
}
