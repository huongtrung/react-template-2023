import * as R from "ramda"

type objectType = { [key: string]: any }

class Utils {
  isNullishObj(obj: objectType) {
    return R.values(obj).every(R.isNil)
  }

  isEmpty(value: string | any[] | objectType) {
    return R.isEmpty(value)
  }

  isUrl(value: string) {
    const UrlPartern =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
    return UrlPartern.test(value)
  }

  safeReturn(
    object: objectType,
    path: (string | number)[] = [],
    fallback = null
  ) {
    const result = R.path(path, object)
    return R.ifElse(R.isNil, R.always(fallback), R.identity)(result)
  }

  replaceVietnamese(str: string) {
    if (this.isEmpty(str)) {
      return ""
    }
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    str = str.replace(/Đ/g, "D")
    return str
  }

  removeNullishValueInObject(obj: objectType) {
    const keysOfNullishValue = R.keys(R.filter(R.isNil, obj))
    return R.omit(keysOfNullishValue, obj)
  }

  existsKey(obj: objectType, key: string) {
    return R.has(key, obj)
  }

  mapObject(obj: objectType, mapFn: (arg0: string, arg1: any) => objectType) {
    return Object.keys(obj).reduce((result: objectType, key: string) => {
      result[key] = mapFn(key, obj[key])
      return result
    }, {})
  }

  removeCharacter(str: string, character: string) {
    return R.compose(R.join(""), R.split(character))(str)
  }

  findItemByPropertyValue(
    matchValue: any,
    propertyName: string,
    arr: objectType[],
    getOnlyFirstMatch = true
  ) {
    const result = getOnlyFirstMatch
      ? R.reject(R.isNil, [R.find(R.propEq(matchValue, propertyName), arr)])
      : R.filter(R.propEq(matchValue, propertyName), arr)

    return R.isNil(result) || this.isEmpty(result) ? null : result
  }

  deepCompare(a: any, b: any) {
    return R.equals(a, b)
  }
}

export default new Utils()
