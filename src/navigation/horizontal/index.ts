// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Dashboards',
      children: [
        {
          icon: 'tabler:device-analytics',
          title: 'Overview',
          path: '/dashboards/overview',
        },
        {
          icon: 'tabler:chart-pie-2',
          title: 'Analytics',
          path: '/dashboards/analytics',
        },
      ],
    },
    {
      icon: 'uil:calender',
      title: 'Bookings',
      children: [
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
      ],
    },
    {
      icon: 'tabler:layout-grid-add',
      title: 'Shipments',
      children: [
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
      ],
    },
    {
      icon: 'tabler:color-swatch',
      title: 'General',
      children: [
        {
          title: 'Profile',
          icon: 'tabler:user',
          path: '/profile',
        },

        {
          title: 'Invoice',
          icon: 'tabler:calculator',
          path: '/duty-calculator',
          disabled: true,
          badgeContent: 'HOLD',
          badgeColor: 'info',
        },
      ],
    },
    {
      icon: 'ic:baseline-support-agent',
      title: 'Support',
      children: [
        {
          title: 'Support',
          icon: 'ic:baseline-support-agent',
          path: '/support',
        },
      ],
    },
  ]
}

export default navigation
