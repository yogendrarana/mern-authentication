import axios from 'axios';
import queryString from 'query-string';
export const getGoogleOauthToken = async ({ code }) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
    };
    const { data } = await axios.post(url, queryString.stringify(values), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return data;
};
export const getGoogleUserInfo = async ({ access_token }) => {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const { data } = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};
