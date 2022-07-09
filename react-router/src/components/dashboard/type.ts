export type Person = typeof personSample

const personSample = {
  gender: "female",
  name: {
    title: "Madame",
    first: "Francesca",
    last: "Fournier",
  },
  location: {
    street: {
      number: 1077,
      name: "Rue de L'Abbé-Gillet",
    },
    city: "Oberwil (Bl)",
    state: "Appenzell Ausserrhoden",
    country: "Switzerland",
    postcode: 2848,
    coordinates: {
      latitude: "-52.3208",
      longitude: "170.8141",
    },
    timezone: {
      offset: "+9:00",
      description: "Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    },
  },
  email: "francesca.fournier@example.com",
  login: {
    uuid: "555e18a1-d1f6-4175-aee4-6f2dd938fde2",
    username: "crazygorilla950",
    password: "tools",
    salt: "g7AfDv45",
    md5: "185c36fa83eb493369377bffd075fe5f",
    sha1: "903237805cd1ad6ba82525cbba64b0424c9aa223",
    sha256: "a4cef03d4bf68ebabe64ad2cbf733e7a0cd4f370667daea63d10e08ca8e21bdb",
  },
  dob: {
    date: "1951-08-17T21:31:47.737Z",
    age: 71,
  },
  registered: {
    date: "2016-10-21T15:48:02.771Z",
    age: 6,
  },
  phone: "077 989 10 71",
  cell: "079 292 80 83",
  id: {
    name: "AVS",
    value: "756.0202.2412.66",
  },
  picture: {
    large: "https://randomuser.me/api/portraits/women/84.jpg",
    medium: "https://randomuser.me/api/portraits/med/women/84.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/84.jpg",
  },
  nat: "CH",
}
