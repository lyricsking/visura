export function isRequest(param: any): param is Request {
  return param.headers !== undefined
}