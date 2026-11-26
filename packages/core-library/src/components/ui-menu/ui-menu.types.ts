export interface UIMenuItem {
  label: string;
  id?: string;
  icon?: string;
  onClick?: (event: MouseEvent) => void;
}
