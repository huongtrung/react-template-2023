import moment from 'moment';
import { DATE_TIME_TYPE } from '@/constants/DatetimeConstants'
import Utilities from './Util'

export const formatDate = (date: string | Date | undefined, type: string) => {
    if (!date) {
        return null
    }
    return moment(date).format(type)
}

export const calculateAge = (dob: string | Date) => {
    if (dob && dob !== "") {
        const currentDate: any = moment().format("YYYY");
        const dobYear: any = moment(dob).format("YYYY");
        const result = currentDate - dobYear;
        return result <= 0 ? 0 : result;
    } else {
        return null
    }
}

export default class DatetimeUtil {

    static isFuture = (dateTime: string) => {
        const date = moment(dateTime)
        const now = moment()
        if (now > date) {
            return true
        } else {
            return false
        }
    }

    static compareDate(dateTime: string) {
        const momentA = moment(dateTime, "DD/MM/YYYY")
        const momentB = moment(new Date(), "DD/MM/YYYY")
        if (momentA > momentB) return 1
        else if (momentA < momentB) return -1
        else return 0
    }

    static validDate(date: any, type = DATE_TIME_TYPE.TYPE_1) {
        const m = moment(date, type)
        return m.isValid()
    }

    static formatDate4(dateString: string) {
        const cleanString = dateString?.replace(/\D/g, '') // Removes all non-numeric characters
        let output = cleanString.slice(0, 10) // Limit to 10 digits
        const size = dateString.length
        if (size > 4) {
            output = Utilities.insertString(output, '/', 4)
        }
        if (size > 1) {
            output = Utilities.insertString(output, '/', 2)
        }
        return output
    }

    static formatDate1(date: any, char: string) {
        function pad(n: number) {
            return n < 10 ? '0' + n : n
        }
        try {
            const day = new Date(date)
            return (
                pad(day.getDate()) +
                char +
                pad(day.getMonth() + 1) +
                char +
                day.getFullYear()
            )
        } catch (error) {
            console.log('formatDate' + error)
            return ''
        }
    }

    static formatDate(date: string | Date | undefined, type: string) {
        if (!date) {
            return null
        }
        return moment(date).format(type)
    }

    static formatDate2(date: string | Date, currentType: string, type: string) {
        if (!date) {
            return null
        }
        return moment(date, currentType).format(type)
    }

    static formatDateAddYear(date: string, year: number) {
        try {
            const temp = date.split('-')
            const temp2 = parseInt(temp[2]) + year
            return temp2 + '-' + temp[1] + '-' + temp[0]
        } catch (error) {
            return date
        }
    }

    static isSame(date1: any, date2: string) {
        return moment(date1).isSame(date2)
    }

    static setCurrentDate = (date: any) => {
        if (date) {
            return this.formatDate(date, DATE_TIME_TYPE.TYPE_2)
        } else {
            return moment().format('DD/MM/YYYY')
        }
    }

    static compareDifferenceInDays = (dateFirst: any, dateSecond: any) => {
        const date1 = new Date(dateFirst)
        const date2 = new Date(dateSecond)

        const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))

        return differenceInDays
    }

}
