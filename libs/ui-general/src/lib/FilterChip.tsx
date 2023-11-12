import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const FilterChip = ({
  label,
  handleSelection,
  selectedFilters,
  sx,
}: {
  label: string;
  handleSelection: (label: string) => void;
  selectedFilters: Array<string>;
  sx: object;
}) => {
  const isSelected = selectedFilters.includes(label);

  return (
    <Chip
      clickable
      label={label}
      onClick={() => handleSelection(label)}
      icon={isSelected ? <CheckCircleIcon /> : undefined}
      sx={[
        {
          ...sx,
          bgColor: 'surface.main',
          color: 'onSurface.main',
          '&:hover': {
            boxShadow: 1,
            bgColor: 'surface.main',
            color: 'onSurface.main',
          },
        },
        isSelected && {
          bgcolor: 'secondaryContainer.main',
          color: 'onSecondaryContainer.main',
          '&:hover': {
            boxShadow: 1,
            bgcolor: 'secondaryContainer.main',
            color: 'onSecondaryContainer.main',
          },
        },
      ]}
    />
  );
};
