export const transportationJobs = [
  {
    id: 1,
    vehicle: 'JV-3174',
    driver: 'Rana Mehtab',
    driver_avatar: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-4/images/avatars/5.png',
    current_location: {
      lat: 24.849795,
      lng: 67.007738,
    },
    current_speed: 0.0,
    angle: 94,
    origin: {
      lat: 24.835879,
      lng: 66.983189,
    },
    destination: {
      lat: 24.824946,
      lng: 67.295154,
    },
    expected_route_waypoints: [
      {
        location: {
          // Karachi port 24.835879, 66.983189
          lat: 24.835879,
          lng: 66.983189,
        },
        stopover: true,
      },
      {
        location: {
          // 24.824946, 67.295154 Tri Pack Films
          lat: 24.824946,
          lng: 67.295154,
        },
        stopover: true,
      },
      {
        location: {
          // 24.845760, 66.979450 Karachi International Container Terminal
          lat: 24.84576,
          lng: 66.97945,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          lat: 24.972461,
          lng: 66.91366,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.835417,
          lng: 66.985274,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.835879,
          lng: 66.983189,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.844246,
          lng: 66.991381,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.849795,
          lng: 67.007738,
        },
        stopover: false,
      },
    ],
    container: 'CBHU7019695',
    item_description: 'HD601CF',
    customer_reference_number: '6200005871 (10)',
    mbl: 'COSU6354706080',
    shipment_id: '7b2bcbc8-a88f-49ea-985b-004b85373c0d',
    visibility: 'Private',
    slug: 'strinxg',
    start_time: '2023-04-19T00:32:37.191197+05:00',
    end_time: null,
    status: 'Active',
  },
  {
    id: 2,
    vehicle: 'JV-3100',
    driver: 'John Doe',
    driver_avatar: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-4/images/avatars/7.png',
    current_location: {
      //31.450272, 72.989257
      lat: 31.450272,
      lng: 72.989257,
    },
    current_speed: 0.0,
    angle: 0.0,
    origin: {
      lat: 24.766355,
      lng: 67.326335, // 24.766355, 67.326335 Port Qasim
    },
    destination: {
      lat: 24.84576,
      lng: 66.97945, // Karachi |International Container Terminal
    },
    expected_route_waypoints: [
      {
        location: {
          // 24.766355, 67.326335 Port Qasim
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: true,
      },
      {
        location: {
          // 31.425234, 73.076161 Nagra Spinning Mills Ltd
          lat: 31.425234,
          lng: 73.076161,
        },
        stopover: true,
      },
      {
        location: {
          // 24.845760, 66.979450 Karachi International Container Terminal
          lat: 24.84576,
          lng: 66.97945,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          // Pre route
          lat: 24.83961,
          lng: 67.204447,
        },
        stopover: false,
      },
      {
        location: {
          // 24.766355, 67.326335 Port Qasim
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: false,
      },
      {
        location: {
          lat: 31.153481,
          lng: 72.59797,
        },
        stopover: false,
      },
      {
        location: {
          lat: 31.450272,
          lng: 72.989257,
        },
        stopover: false,
      },
    ],
    container: 'CSNU6978224',
    item_description: 'FLEXOGRAPHIC PRINTING MACHINE',
    customer_reference_number: 'THK-IV-046589',
    mbl: 'A9023020474',
    shipment_id: '8feecdfd-c691-419d-bdfe-6b069b0858bc',
    visibility: 'Visibility',
    slug: 'Slug',
    start_time: '2023-04-20T13:27:58.103859+05:00',
    end_time: null,
    status: 'Active',
  },
  {
    id: 3,
    vehicle: 'ZE-S900',
    driver: 'XX YY',
    driver_avatar: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-4/images/avatars/7.png',
    current_location: {
      lat: 26.337344,
      lng: 68.077419,
    },
    current_speed: 0.0,
    angle: 0.0,
    origin: {
      lat: 24.766355,
      lng: 67.326335, // 24.766355, 67.326335 Port Qasim
    },
    destination: {
      lat: 24.84576,
      lng: 66.97945, // Karachi |International Container Terminal
    },
    expected_route_waypoints: [
      {
        location: {
          // 24.766355, 67.326335 Port Qasim
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: true,
      },
      {
        location: {
          lat: 31.287415,
          lng: 74.39563,
        },
        stopover: true,
      },
      {
        location: {
          // 24.845760, 66.979450 Karachi International Container Terminal
          lat: 24.84576,
          lng: 66.97945,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          lat: 24.779336,
          lng: 67.536378,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.780247,
          lng: 67.536932,
        },
        stopover: false,
      },

      {
        location: {
          // 24.766355, 67.326335 Port Qasim
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: false,
      },
      {
        location: {
          // 24.817692, 67.308541
          lat: 24.817692,
          lng: 67.308541,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.865883,
          lng: 67.299898,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.859613,
          lng: 67.338675,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.909815,
          lng: 67.395127,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.005266,

          lng: 67.356132,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.988343,

          lng: 67.189216,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.269707,

          lng: 68.000553,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.460424,
          lng: 68.679391,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.527613,
          lng: 69.0053,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.677866,

          lng: 68.758566,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.776976,
          lng: 68.6605,
        },
        stopover: false,
      },

      {
        location: {
          lat: 26.253537,

          lng: 68.403513,
        },
        stopover: false,
      },

      {
        location: {
          lat: 26.337344,
          lng: 68.077419,
        },
        stopover: false,
      },
    ],
    container: 'CSNU6978224',
    item_description: 'FLEXOGRAPHIC PRINTING MACHINE',
    customer_reference_number: 'THK-IV-046589',
    mbl: 'A9023020474',
    shipment_id: '8feecdfd-c691-419d-bdfe-6b069b0858bc',
    visibility: 'Private',
    slug: 'string',
    start_time: '2023-04-20T13:27:58.103859+05:00',
    end_time: null,
    status: 'Active',
  },
  {
    id: 4,
    vehicle: 'TE-X100',
    driver: 'Mike Doe',
    driver_avatar: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-4/images/avatars/7.png',
    current_location: {
      // M4
      lat: 30.472677,
      lng: 72.475176,
    },
    current_speed: 0.0,
    angle: 230,
    origin: {
      lat: 24.766355,
      lng: 67.326335, // 24.766355, 67.326335 Port Qasim
    },
    destination: {
      lat: 24.84576,
      lng: 66.97945, // Karachi |International Container Terminal
    },
    expected_route_waypoints: [
      {
        location: {
          // 24.766355, 67.326335 Port Qasim
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: true,
      },
      {
        location: {
          // 31.287415, 74.395630 BASFA Textile Pvt Ltd
          lat: 31.287415,
          lng: 74.39563,
        },
        stopover: true,
      },
      {
        location: {
          // 24.845760, 66.979450 Karachi International Container Terminal
          lat: 24.84576,
          lng: 66.97945,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          // Pre Route
          lat: 24.153773,
          lng: 67.491037,
        },
        stopover: false,
      },

      {
        location: {
          // 24.766355, 67.326335 Port Qasim .  Point A
          lat: 24.766355,
          lng: 67.326335,
        },
        stopover: false,
      },
      {
        location: {
          // 24.817692, 67.308541
          lat: 24.817692,
          lng: 67.308541,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.865883,
          lng: 67.299898,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.859613,
          lng: 67.338675,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.909815,
          lng: 67.395127,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.005266,

          lng: 67.356132,
        },
        stopover: false,
      },

      {
        location: {
          lat: 24.988343,

          lng: 67.189216,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.269707,

          lng: 68.000553,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.460424,
          lng: 68.679391,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.527613,
          lng: 69.0053,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.677866,

          lng: 68.758566,
        },
        stopover: false,
      },

      {
        location: {
          lat: 25.776976,
          lng: 68.6605,
        },
        stopover: false,
      },

      {
        location: {
          lat: 26.253537,

          lng: 68.403513,
        },
        stopover: false,
      },

      {
        location: {
          lat: 26.337344,
          lng: 68.077419,
        },
        stopover: false,
      },

      {
        location: {
          lat: 27.550534,

          lng: 68.214484,
        },
        stopover: false,
      },

      {
        location: {
          lat: 31.463638,
          lng: 74.095769,
        },
        stopover: false,
      },

      {
        location: {
          // Point B (BASFA Textile Pvt Ltd ) Apprx
          lat: 31.287415,
          lng: 74.39563,
        },
        stopover: false,
      },

      {
        location: {
          lat: 31.161503,
          lng: 74.450157,
        },
        stopover: false,
      },
      {
        location: {
          lat: 30.668054,
          lng: 73.154456,
        },
        stopover: false,
      },
      {
        location: {
          lat: 30.472677,
          lng: 72.475176,
        },
        stopover: false,
      },
    ],
    container: 'CSNU6978224',
    item_description: 'FLEXOGRAPHIC PRINTING MACHINE',
    customer_reference_number: 'THK-IV-046589',
    mbl: 'A9023020474',
    shipment_id: '8feecdfd-c691-419d-bdfe-6b069b0858bc',
    visibility: 'Private',
    slug: 'string',
    start_time: '2023-04-20T13:27:58.103859+05:00',
    end_time: null,
    status: 'Active',
  },
  {
    id: 5,
    vehicle: 'TLS-982',
    driver: 'Rana Mehtab',
    driver_avatar: null,
    current_location: {
      lat: 24.83689,
      lng: 67.281825,
    },
    current_speed: 0.0,
    angle: 91.0,
    origin: {
      lat: 24.8017788970832,
      lng: 66.98535520769879,
    },
    destination: {
      lat: 24.825912864884014,
      lng: 67.29541589204456,
    },
    expected_route_waypoints: [
      {
        location: {
          lat: 24.8017788970832,
          lng: 66.98535520769879,
        },
        stopover: true,
      },
      {
        location: {
          lat: 24.825912864884014,
          lng: 67.29541589204456,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          lat: 24.804875,
          lng: 66.9810183,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.8048783,
          lng: 66.9810616,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.8049583,
          lng: 66.9810066,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.805025,
          lng: 66.980975,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.8050316,
          lng: 66.9809633,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.8050316,
          lng: 66.9809633,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.838835,
          lng: 67.11972659999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.8388733,
          lng: 67.1196966,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934466,
          lng: 67.3310066,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934466,
          lng: 67.3310066,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934466,
          lng: 67.3310066,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934466,
          lng: 67.3310066,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.79346,
          lng: 67.330995,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7935016,
          lng: 67.33103659999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7935016,
          lng: 67.33103659999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7935016,
          lng: 67.33103659999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7935016,
          lng: 67.33103659999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.793485,
          lng: 67.3309566,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934883,
          lng: 67.33095829999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934883,
          lng: 67.33095829999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7934883,
          lng: 67.33095829999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.792933299999998,
          lng: 67.3302049,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7928966,
          lng: 67.3302166,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.792826599999998,
          lng: 67.33005829999999,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7928416,
          lng: 67.3300316,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7928616,
          lng: 67.3300483,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.792891599999997,
          lng: 67.3300833,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7963283,
          lng: 67.329,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7963283,
          lng: 67.329,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.7963283,
          lng: 67.329,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.83689,
          lng: 67.281825,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.83689,
          lng: 67.281825,
        },
        stopover: false,
      },
    ],
    container: 'HLBU1334497',
    item_description: 'ADSYL 5 C',
    customer_reference_number: '6200005876',
    mbl: 'HLCUANR230469037',
    shipment_id: '90597901-42f5-4f85-8de6-70483d419104',
    visibility: 'PRIVATE',
    slug: 'adsyl-5-c-6200005876-tls-982-rana-mehtab-none',
    start_time: '2023-07-24T19:51:17.815150+05:00',
    end_time: null,
    status: 'Active',
  },
  {
    id: 6,
    vehicle: 'TLT-354',
    driver: 'Kashif Ahmed',
    driver_avatar: null,
    current_location: {
      lat: 24.823079999999997,
      lng: 67.29782,
    },
    current_speed: 0.0,
    angle: 0.0,
    origin: {
      lat: 24.8017788970832,
      lng: 66.98535520769879,
    },
    destination: {
      lat: 24.825912864884014,
      lng: 67.29541589204456,
    },
    expected_route_waypoints: [
      {
        location: {
          lat: 24.8017788970832,
          lng: 66.98535520769879,
        },
        stopover: true,
      },
      {
        location: {
          lat: 24.825912864884014,
          lng: 67.29541589204456,
        },
        stopover: true,
      },
    ],
    followed_route_waypoints: [
      {
        location: {
          lat: 24.9057183,
          lng: 66.9770316,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.82256,
          lng: 67.2979033,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
      {
        location: {
          lat: 24.823079999999997,
          lng: 67.29782,
        },
        stopover: false,
      },
    ],
    container: 'SEKU6254644',
    item_description: 'ADSYL 5 C',
    customer_reference_number: '6200005876',
    mbl: 'HLCUANR230469037',
    shipment_id: '90597901-42f5-4f85-8de6-70483d419104',
    visibility: 'PRIVATE',
    slug: 'adsyl-5-c-6200005876-tlt-354-kashif-ahmed-none',
    start_time: '2023-07-24T19:54:03.013253+05:00',
    end_time: null,
    status: 'Active',
  },
]
