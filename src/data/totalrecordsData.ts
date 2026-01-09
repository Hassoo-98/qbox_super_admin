export interface CardItem {
  id: number;
  icon?: string;
  title: string | number;
  subtitle: string;
}

export const getTotalrecordsData = (t: (key: string) => string) => [
  { id: 1, icon: '/assets/icons/dollar.png', title: '3000', subtitle: t('Total Revenue') },
  { id: 2, icon: '/assets/icons/dollar.png', title: '3000', subtitle: t('Active QBoxes') },
  { id: 3, icon: '/assets/icons/dollar.png', title: '3000', subtitle: t('Total Service Providers') },
  { id: 4, icon: '/assets/icons/dollar.png', title: '3000', subtitle: t('Total Deliveries') },
];