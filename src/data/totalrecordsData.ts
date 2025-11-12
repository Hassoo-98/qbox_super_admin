export interface CardItem {
  id: number;
  icon?: string;
  title: string | number;
  subtitle: string;
}

export const totalrecordsData: CardItem[] = [
  { id: 1, icon: '/assets/icons/dollar.png', title: '3000', subtitle: 'Total Revenue' },
  { id: 2, icon: '/assets/icons/dollar.png', title: '3000', subtitle: 'Active QBoxes' },
  { id: 3, icon: '/assets/icons/dollar.png', title: '3000', subtitle: 'Total Service Providers' },
  { id: 4, icon: '/assets/icons/dollar.png', title: '3000', subtitle: 'Total Deliveries' },
];
