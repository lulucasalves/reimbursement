export interface ChipSelectProps {
  id: string;
  options: unknown[];
  label: string;
  limitTags?: number;
  value?: unknown[];
  width?: string | number;
  height?: string | number;
  isMultiple?: boolean;
  clearable?: boolean;
  getOptionLabel?: (option: unknown) => string;
  onChange?: (event: unknown, newValue: unknown) => void;
}
