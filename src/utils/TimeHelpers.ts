import { Deadline } from 'symbol-sdk';
import * as moment from 'moment';

export class TimeHelpers {
  /**
   * Returns Transaction date String
   * @param {Deadline} transactionDeadline
   * @param {number} deadlineInHours based on transaction type
   * @return {string}
   */
  public static getTransactionDate(
    transactionDeadline: Deadline,
    deadlineInHours: number,
    epochAdjustment: number,
    format: string
  ) {
    return moment(
      String(
        transactionDeadline
          .toLocalDateTime(epochAdjustment)
          .minusHours(deadlineInHours)
      )
    ).format(format);
  }
}
