import axios from 'axios';
import queryString from 'query-string';

// define the expected response from Google API when getting OAuth tokens
// and get access token and id token from google

interface GoogleOauthTokenResponse {
    access_token: string;
    id_token: string;
}

export const getGoogleOauthToken = async ({ code, }: { code: string; }): Promise<GoogleOauthTokenResponse> => {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    const { data } = await axios.post<GoogleOauthTokenResponse>(
        url,
        queryString.stringify(values),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return data;
};


// define the expected response from Google API
// and get user info from google
interface GoogleUserInfo {
    id: string;
    email: string;
    name: string;
    picture: string;
    verified_email: boolean;
}

export const getGoogleUserInfo = async ({ access_token }: { access_token: string }): Promise<GoogleUserInfo> => {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const { data } = await axios.get<GoogleUserInfo>(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return data;
};