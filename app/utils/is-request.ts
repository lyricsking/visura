export function isRequest(param: any): param is Request {
  return (param as Request).headers !== undefined;
}
