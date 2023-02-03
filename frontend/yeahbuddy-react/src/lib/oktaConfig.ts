export const oktaConfig = {
  clientId: "0oa7voqgzyb6lDp8Y5d7",
  issuer: "https://dev-58338753.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  features: { registration: true },
};