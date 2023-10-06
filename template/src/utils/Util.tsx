import axios from 'axios';
import * as R from 'ramda'
export default class Utilities {

  static isNullish = (obj: any) => {
    if (obj == null || obj == undefined) {
      return true
    } else {
      for (const key in obj) {
        if (obj[key] !== null && obj[key] != "")
          return false;
      }
      return true
    }
  }

  static checkEmpty = (value: any) => {
    if (this.isEmpty(value) || value == -1 || value == '-1') {
      return true
    }
    return false
  }

  static prepend(value: any, array: any = []) {
    const newArray = array?.slice()
    newArray.unshift(value)
    return newArray
  }

  static checkIfIncludesArr = (key: any, value: any, options: any[]) => {
    const exits = !this.isArrayEmpty(options) && options?.find((el: any) => el?.[key] == value)
    if (exits) {
      return true
    }
    return false
  }

  static removeFieldNullInObj(obj: any) {
    if (typeof obj !== 'object') {
      return obj
    }

    const listFieldNull: any = R.keys(R.filter(R.isNil, obj))

    const newObj = R.omit(listFieldNull, obj)
    return newObj
  }

  static removeNullFields(obj: any) {
    if (typeof obj !== 'object') {
      return obj
    }
    return R.reject(R.equals(''))(obj)
  }

  static safeReturn(object: any, path: any[] = [], fallback = null) {
    const result = R.path(path, object)
    return R.ifElse(R.isNil, R.always(fallback), R.identity)(result)
  }


  static isObjEmpty(obj: any) {
    if (typeof obj === 'undefined' || !obj || Object.keys(obj)?.length === 0) {
      return true
    }
    return false
  }

  static delay(time = 500) {
    return new Promise(resolve => setTimeout(resolve, time))
  }


  static isEmpty(value: string | any[]) {
    if (!value || value.length === 0) {
      return true
    }
    return false
  }

  static replaceVietnamese(str: string) {
    if (this.isEmpty(str)) {
      return ''
    }
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
    return str
  }

  static sortAlphabet = (a: { DisplayName: any }, b: { DisplayName: any }) => {
    if (
      this.replaceVietnamese(a.DisplayName) >
      this.replaceVietnamese(b.DisplayName)
    ) {
      return 1
    }
    if (
      this.replaceVietnamese(a.DisplayName) <
      this.replaceVietnamese(b.DisplayName)
    ) {
      return -1
    }
    return 0
  }

  static existsKey(object: { hasOwnProperty: (arg0: any) => any }, key: any) {
    const result  = Object.prototype.hasOwnProperty.call(object, key);
    return result
  }

  static objectMap(object: { [x: string]: any }, mapFn: (arg0: string, arg1: any) => any) {
    return Object.keys(object).reduce((result: any, key) => {
      result[key] = mapFn(key, object[key])
      return result
    }, {})
  }

  static isArrayEmpty(array: string | any[] | null) {
    if (
      typeof array !== 'undefined' &&
      array != null &&
      array.length != null &&
      array.length > 0
    ) {
      return false
    }
    return true
  }

  static isURL = (s: string) => {
    if (typeof s !== 'string') {
      return false
    }
    return s.startsWith('https') || s.startsWith('http')
  }

  static insertString(originalString: string, newString: string, index: number) {
    return originalString.slice(0, index) + newString + originalString.slice(index)
  }

  static convertMoneyToNumber = (value: string) => {
    if (this.isEmpty(value)) {
      return value
    }
    return R.compose(R.join(''), R.split('.'))(value)
  }

  static convertNumberToMoney = (value: any, isFormCustomer = false) => {
    try {
      if (this.isEmpty(value)) {
        return 0
      }
      const roundNumber = Math.round(Number(value))
      if (roundNumber < 0) {
        const data = roundNumber * -1
        const money = R.compose<any, any, any, any, any>(R.reverse, R.join('.'), R.splitEvery(3), R.reverse)(String(data))
        if (value < 0) {
          return `-${money}`
        }
        return money
      } else {
        const money = R.compose<any, any, any, any, any>(R.reverse, R.join('.'), R.splitEvery(3), R.reverse)(String(roundNumber))
        if (value < 0 && !isFormCustomer && value?.includes('-')) {
          return `-${money}`
        }
        return money
      }
    } catch (error) {
      return 0
    }
  }

  static convertMMToNumber = (value: string) => {
    if (this.isEmpty(value)) {
      return value
    }
    const arr = value.split(',')
    if (arr.length == 1) {
      if (arr[0].length <= 6) {
        return R.compose(R.join(''), R.split('.'))(arr[0])
      } else {
        const val = arr[0]
        return R.compose(R.join(''), R.split('.'))(val)
      }
    } else {
      if (arr[0].length <= 6) {
        const integer = R.compose(R.join(''), R.split('.'))(arr[0])
        const decimal = arr[1]?.length > 1 ? arr[1]?.substring(0, 1) : R.compose(R.join(''), R.split('.'))(arr[1])
        return `${integer}.${decimal}`
      } else {
        const val = arr[0]
        const integer = R.compose(R.join(''), R.split('.'))(val)
        const decimal = arr[1]?.length > 1 ? arr[1]?.substring(0, 1) : R.compose(R.join(''), R.split('.'))(arr[1])
        return `${integer}.${decimal}`
      }
    }
  }

  static convertNumberToMM = (value: any) => {
    try {
      if (this.isEmpty(value)) {
        return 0
      }
      const arr = `${value}`?.split('.')
      if (arr.length != 1) {
        const roundNumber = Math.round(Number(arr[0]))
        const integer = R.compose<any, any, any, any, any>(R.reverse, R.join('.'), R.splitEvery(3), R.reverse)(String(roundNumber))
        return `${String(integer)},${arr[1]}`
      } else {
        const roundNumber = Math.round(Number(arr[0]))
        const money = R.compose<any, any, any, any, any>(R.reverse, R.join('.'), R.splitEvery(3), R.reverse)(String(roundNumber))
        return String(money)
      }
    } catch (error) {
      return 0
    }
  }

  static replaceMoneyMillion(m: any) {
    if(m?.endsWith('.') || m?.endsWith('.0')){
      return m?.split('.')[0]
    }
    if(m?.endsWith(',0')){
      return m?.split(',')[0]
    }
    return m
  }

  static convertAreaToString = (value: string) => {
    const num = Number(value)
    const money = +(num / 1e6).toFixed(1)
    return money
  }

  // static convertArea = (value: any) => {
  //   try {
  //     const money = R.compose(R.reverse, R.join('.'), R.splitEvery(3), R.reverse)(String(value))
  //   } catch (error) {
  //     return 0
  //   }
  // }

  static findItemByIdInOptions = (code: string | any, options: any, propertyGet: string): any => {
    try {
      if (R.isNil(code)) {
        return ''
      }
      const item: any = options?.find((el: any) =>
        el?.[propertyGet] == code
      )
      if (!item) return null
      return item
    } catch (error) {
      return null
    }
  }

  static checkIfKeyExist = (object: any, keyName: string) => {
    const keyExist = Object.keys(object).some(key => key?.includes(keyName))
    return keyExist
  }

  static setDfValueWhenNull = (value: any, defaultValue: any = '') => {
    if (this.isEmpty(value) || value == 0 || value == '0') {
      return defaultValue
    }
    return value
  }

  static setValueNull = (value: any) => {
    if (!value || value === 0 || value === '0') {
      return null
    }
    return value
  }

  static getAge = (dateString: any) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  static objectsEqual = (o1?: any, o2?: any): boolean => {
    return typeof o1 === 'object' && Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length
      && Object.keys(o1).every(p => this.objectsEqual(o1[p] ?? {}, o2[p] ?? {}))
      : o1 === o2
  }

  static checkHasCall = (compareData: any, fnc: () => void) => {
    if (Array.isArray(compareData) && compareData?.length) {
      return
    } else {
      fnc()
    }
  }

  static maskedName = (str: string) => {
    if (this.isEmpty(str)) return 'không có dữ liệu.'
    const strArr = str?.toString()?.split('')
    const result: string[] = []
    let nameLength = strArr.indexOf('@')
    let unmaskedChar = 3
    if (nameLength > 0 && nameLength < 9) {
      unmaskedChar = 2
    }
    if (nameLength < 0) {
      nameLength = strArr.length
    }
    strArr.forEach((_, index: number) => {
      (index >= unmaskedChar && index <= nameLength - 1 - unmaskedChar) ? result.push('*') : result.push(strArr[index])
    })
    return result.join('')
  }

  static isAllValuesNull = (obj: any) => {
    if (this.isEmpty(obj)) {
      return true
    }
    return Object.values(obj).every(x => x === null || x === '');
  }

  static binaryToBase64 = (data: any) => {
    const uint8Array = new Uint8Array(data);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);

  }

  static fileToBase64(file: any) {
    const objectURL = URL.createObjectURL(file);
    return objectURL
  }

  static getUrlFromBinary(binary: any) {
    const uint8Array = new Uint8Array(binary);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const myUrl = window.URL.createObjectURL(blob)
    return myUrl
  }

  static capitalizeProvinceName = (str: string) => {
    const words = str?.toLowerCase()?.split(' ');
    const capitalizedWords = words?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1));
    const capitalizedString = capitalizedWords?.join(' ');
    return capitalizedString
  }

  static findItemIndexByIdInOptions = (code: string | any, options: any, propertyGet: string): any => {
    try {
      if (R.isNil(code)) {
        return null
      }
      const item: any = options?.findIndex((el: any) =>
        el?.[propertyGet] == code
      )
      if (R.isNil(item)) return null
      return item
    } catch (error) {
      return null
    }
  }

  static getObjectKey(obj: any, value: string) {
    return Object.keys(obj).find((key) => key?.includes(value))
  }

  static getFileName = (imageUri: string) => {
    const filename = imageUri?.substring(
      imageUri?.lastIndexOf('/') + 1,
      imageUri.length,
    )
    return filename
  }

  static getFilePath = (path: string) => {
    const binaryString = atob(path);
    return `data:text/plain;base64,${btoa(binaryString)}`;
  }

  static deepCompare = (obj1: any, obj2: any): boolean => {
    // Compare primitive types and return true if they are equal
    if (obj1 === obj2) {
      return true;
    }

    // If either object is null or undefined, they are not equal
    if (obj1 == null || obj2 == null) {
      return false;
    }

    // If the objects are of different types, they are not equal
    if (typeof obj1 !== typeof obj2) {
      return false;
    }

    // If the objects are arrays, compare each element recursively
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!this.deepCompare(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    }

    // If the objects are objects, compare each property recursively
    if (typeof obj1 === "object" && typeof obj2 === "object") {
      const obj1Keys = Object.keys(obj1);
      const obj2Keys = Object.keys(obj2);
      if (obj1Keys.length !== obj2Keys.length) {
        return false;
      }
      for (const key of obj1Keys) {
        const isKeyExist = Object.prototype.hasOwnProperty.call(obj2, key)
        if (!isKeyExist || !this.deepCompare(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    }

    // If none of the above conditions are met, the objects are not equal
    return false;
  }
  static isNilOrEmpty = (obj: any) => {
    return R.isNil(obj) || R.isEmpty(obj)
  }

  static compareTwoString(str1: string, str2: string) {
    const upperStr1 = this.replaceVietnamese(str1)?.toUpperCase()
    const upperStr2 = this.replaceVietnamese(str2)?.toUpperCase()
    return upperStr1 == upperStr2
  }
  
}



