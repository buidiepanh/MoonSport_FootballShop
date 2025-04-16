const moment = require("moment");
const qs = require("qs");
const crypto = require("crypto");
const config = require("config");

const createVNPayUrl = (req, res) => {
  let ipAddr = req.ip || req.socket.remoteAddress;
  if (ipAddr?.startsWith("::ffff:")) {
    ipAddr = ipAddr.split("::ffff:")[1];
  }

  const tmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");
  const vnpUrl = config.get("vnp_Url");
  const returnUrl = config.get("vnp_ReturnUrl");

  const date = moment();
  const createDate = date.format("YYYYMMDDHHmmss");
  const orderId = date.format("HHmmss");
  const amount = parseInt(req.body.amount);

  const bankCode = req.body.bankCode || "";

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan don hang #" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_BankCode: bankCode || "NCB",
  };

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;

  res.json({ url: paymentUrl });
};

const vnpayReturn = (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const secretKey = config.get("vnp_HashSecret");
  const signData = qs.stringify(sortObject(vnp_Params), { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    res.send("Thanh toán thành công!");
  } else {
    res.send("Chữ ký không hợp lệ!");
  }
};

function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

module.exports = {
  createVNPayUrl,
  vnpayReturn,
};
