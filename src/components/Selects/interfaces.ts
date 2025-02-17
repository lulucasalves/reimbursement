export interface ChipSelectProps {
  id: string;
  options: unknown[];
  label: string;
  limitTags?: number;
  defaultValue?: unknown[];
  width?: string | number;
  getOptionLabel?: (option: unknown) => string;
  onChange?: (event: unknown, newValue: unknown) => void;
}
