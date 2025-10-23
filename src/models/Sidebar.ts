export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  href?:any;
  children?: MenuItem[];
  isOpen?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}
