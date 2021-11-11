import { Address } from '../models/address.modal';

export const addressesList: Address[] = [
  {
    id: 1,
    lname: 'Chaofan Wu',
    fname: 'Chaofan Wu',
    ABNNum: 1009298353232323,
    email: 'chaofan@email.com',
    companyAddress: 'RMIT Melbourne, Victoria',
    companyName: 'AME Algoritem',
    walletsAddresses: [
      {
        type: 'BTC',
        address: 'chaofanbtcjahsrgfasdfsdfasdfgdsd',
        description: 'business',
      },
      {
        type: 'NEM',
        address: 'chaofanaskdjfksladgjklasdfasdfsdf',
      },
      {
        type: 'BTC',
        address: 'chaofanalksfjdasdgsdgrfasdfasdfa',
        description: 'personal',
      },
    ],
  },

];
