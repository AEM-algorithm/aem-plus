import { Notification } from '../models/notification.model';

export const notifications: Notification[] = [
  // Systen notifications:
  {
    id: 'n1',
    type: 'system',
    title: 'New Version',
    message: 'New version of AEM+ 2.0 will release this year',
    date: 1549756800000,
    isRead: false,
  },
  {
    id: 'n2',
    type: 'system',
    title: 'System update',
    message: 'AEM+ will perform a scheduled system update starting at 2021-05-01, this update will take about  hours',
    date: new Date().getTime(),
    isRead: false,
  },
  // Transactions notifications of different wallets
  //      ---> myBTCwallet1 wallet
  {
    id: 'n3',
    type: 'transaction',
    title: 'Recieve transaction successful',
    message: 'you have received 100 aud from someone at 2021-03-25',
    walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
    date: 1580475600000,
    isRead: false,
  },
  {
    id: 'n4',
    type: 'transaction',
    title: 'Recieve transaction successful',
    message: 'new transacion from someone at a certain date',
    walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
    date: 793768392355,
    isRead: false,
  },
  {
    id: 'n5',
    type: 'transaction',
    title: 'Recieve transaction successful',
    message: 'new transacion from someone at a certain date',
    walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
    date: new Date().getTime(),
    isRead: false,
  },
  //      ---> myXEMwallet1 wallet

  {
    id: 'n6',
    type: 'transaction',
    title: 'Recieve transaction successful',
    message: 'new transacion from someone at a certain date',
    walletAddress: 'jknlkasdfjaskdnfaksldfwieeesdf',
    date: new Date().getTime(),
    isRead: false,
  },
];
