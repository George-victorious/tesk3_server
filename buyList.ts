import {TBuy} from "./types";

const buyList: TBuy[] = [
  {
    id: 1,
    userId: 1,
    status: 0, // 0: active, 1: delivering, 2: closed
    created: 1629536186344,
    deleveredAt: null,
    productName: 'Робот-пылесос',
    price: 15000,
    deleveredTo: {
      city: 'Minsk',
      address: 'Hikalo 16',
      location: {
        lat: 0,
        lng: 0,
      },
    },
    deleveredFrom: {
      city: 'Minsk',
      address: 'Niamiha 1',
      location: {
        lat: 0,
        lng: 0,
      },
    },
    description: 'Робот-пылесос мощьностью 500W.',
  },
  {
    id: 1,
    userId: 2,
    status: 1,
    created: 1629546186344,
    deleveredAt: null,
    productName: 'Стиральная машина',
    price: 15000,
    deleveredTo: {
      city: 'Minsk',
      address: 'Lopatina 7a',
      location: {
        lat: 0,
        lng: 0,
      },
    },
    deleveredFrom: {
      city: 'Minsk',
      address: 'Niamiha 1',
      location: {
        lat: 0,
        lng: 0,
      },
    },
    description: 'Очень безшумная.',
  },
];

module.exports = buyList;
