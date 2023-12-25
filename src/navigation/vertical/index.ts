// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Dashboard',
    },
    {
      title: 'Overview',
      path: '/dashboards/overview',
      icon: 'tabler:device-analytics',
    },
    {
      title: 'Analytics',
      path: '/dashboards/analytics',
      icon: 'tabler:chart-pie-2',
    },

    {
      sectionTitle: 'Bookings',
    },
    {
      title: 'Spot Rates',
      path: '/bookings/schedules',
      icon: 'uil:calender',
      disabled: false,
      badgeContent: 'BETA',
      badgeColor: 'info',
    },
    {
      title: 'My Bookings',
      icon: 'line-md:list-3',
      path: '/bookings/list',
    },

    {
      sectionTitle: 'Shipments',
    },
    {
      title: 'Transportation',
      path: '/transportation/jobs',
      icon: 'mdi:truck-cargo-container',
      disabled: false,
      badgeContent: 'BETA',
      badgeColor: 'info',
    },
    {
      title: 'Imports',
      icon: 'tabler:package-import',
      path: '/shipments/import',
    },
    {
      title: 'Exports',
      icon: 'tabler:package-export',
      path: '/shipments/export',
    },
    {
      sectionTitle: 'General',
    },
    {
      title: 'Profile',
      icon: 'tabler:user',
      path: '/general/profile',
    },
    {
      title: 'Invoices',
      icon: 'tabler:calculator',
      path: '/general/duty-calculator',
      disabled: true,
      badgeContent: 'HOLD',
      badgeColor: 'info',
    },
    {
      sectionTitle: 'Support',
    },

    {
      title: 'Support',
      icon: 'ic:baseline-support-agent',
      path: '/support',
    },
  ]
}

export default navigation
