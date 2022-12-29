import queryString from 'qs';
import * as crypto from 'crypto';
import dateformat from 'dateformat';

export const createPaymentURL = (totalPrice: any) => {
  const ipAddr = '123.21.116.81';
  const tmnCode = '3Y2T8YUL';
  const secretKey = 'OPYMLKBNDWWFEMMGQMTDDRMIUXGGTTBX';
  const returnUrl = 'http://localhost:3000/employer/vnpay_return';

  const date = new Date();
  const createDate = dateformat(date, 'yyyymmddHHmmss');
  const orderId = dateformat(date, 'ddHHmmss');
  const locale = 'vn';
  const currCode = 'VND';

  let vnp_Params: any = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] =
    'Thanh toan don hang: ' + dateformat(date, 'yyyy-mm-dd HH:mm:ss');
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = totalPrice * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_ExpireDate'] = '20300924083000';

  vnp_Params = sortObject(vnp_Params);

  const signData = queryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;

  const vnpUrl =
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?' +
    queryString.stringify(vnp_Params, { encode: false });

  return vnpUrl;
};

export function sortObject(obj: any) {
  let sorted: any = {};
  let str: any = [];
  let key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
