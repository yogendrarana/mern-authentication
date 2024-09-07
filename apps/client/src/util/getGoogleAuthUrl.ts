
const getGoogleAuthUrl = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: import.meta.env.VITE_APP_GOOGLE_OAUTH_REDIRECT_URI as string,
        client_id: import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID as string,
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const queryString = new URLSearchParams(options);

    return `${rootUrl}?${queryString.toString()}`
}

export default getGoogleAuthUrl;