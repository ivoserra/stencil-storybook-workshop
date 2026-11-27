export interface UISidebarItem {
  label: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
