export interface ActionMenuItem {
  label: string;
  icon: string;
  callback: () => void;
  danger?: boolean;
  dividerBefore?: boolean;
  tooltip?: string;
  disabled?: boolean;
}
