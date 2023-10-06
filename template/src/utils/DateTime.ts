import moment, { Moment, unitOfTime } from "moment"

export enum DATETIME_FORMAT {
  DATE_01 = "YYYY-MM-DD",
  DATE_02 = "DD-MM-YYYY",
  DATE_03 = "YYYY/MM/DD",
  DATE_04 = "DD/MM/YYYY",
  TIME_01 = "HH:mm:ss",
  TIME_02 = "HH:mm",
  TYPE_01 = "YYYY-MM-DD HH:mm:ss",
  TYPE_02 = "DD/MM/YYYY HH:mm:ss",
}

class DateTime {
  format(datetime?: Moment, format: DATETIME_FORMAT = DATETIME_FORMAT.TYPE_02) {
    if (!datetime) return null
    return moment(datetime).format(format)
  }

  getCurrent(format: DATETIME_FORMAT = DATETIME_FORMAT.TYPE_02) {
    return this.format(moment(), format)
  }

  compareDate(moment1: Moment, moment2: Moment = moment()) {
    if (moment1 > moment2) return 1
    else if (moment1 < moment2) return -1
    else return 0
  }

  getDateDiff({
    moment1,
    moment2 = moment(),
    unit = "milliseconds",
  }: {
    moment1: Moment
    moment2?: Moment
    unit?: unitOfTime.Diff
  }) {
    return Math.abs(moment2.diff(moment1, unit))
  }
}

export default new DateTime()
