import { getNicePhoneAccessToken } from "@/utils/nicePhoneAccessToken";
import { randomUUID, createCipheriv, createHmac } from "crypto";

const NICE_CLIENT_ID = process.env.NICE_CLIENT_ID;
const NICE_CLIENT_SECRET = process.env.NICE_CLIENT_SECRET;
const NICE_HOST = "https://svc.niceapi.co.kr:22001"
const REQUEST_URL = "/digital/niceid/api/v1.0/common/crypto/token"
const returnURL = `${process.env.NEXT_PUBLIC_FRONT_URL}/register/nice`;

export async function GET(request: Request) {
    const niceAccessToken = await getNicePhoneAccessToken();

    console.log(niceAccessToken);

    const _timestamp = new Date().getTime() / 1000;
    const req_dtim = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
    const req_no = randomUUID();

    const response = await fetch(`${NICE_HOST}${REQUEST_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Buffer.from(`${niceAccessToken.access_token}:${_timestamp}:${NICE_CLIENT_ID}`).toString('base64')}`
        },
        body: JSON.stringify({
            "req_dtim": req_dtim,
            "req_no": req_no,
            "enc_mode": "1",
        })
    });

    const data = await response.json();

    const { sitecode, token_version_id, token_val } = data.dataBody;
    const tokenString = req_dtim + req_no + token_val;
    const tokenBase64 = Buffer.from(tokenString).toString('base64');

    const key = tokenBase64.slice(0, 16);
    const iv = tokenBase64.slice(-16);
    const hmacKey = tokenBase64.slice(0, 32);

    var plain_data = {
        "requestno": req_no
        , "returnurl": returnURL
        , "sitecode": sitecode
    };

    var plain = JSON.stringify(plain_data);
    const cipher = createCipheriv('aes-128-cbc', key, iv);
    var enc_data = cipher.update(plain, 'utf8', 'base64') + cipher.final('base64');

    var hmac = createHmac('sha256', hmacKey);
    var integrity = hmac.update(enc_data).digest('base64');

    return Response.json({
        token_version_id: token_version_id,
        enc_data: enc_data,
        integrity_value: integrity
    });
}
