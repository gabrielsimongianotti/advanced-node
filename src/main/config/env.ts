export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '650961116275251',
    clientSecret:
      process.env.FB_CLIENT_SECRET ?? '05460bbc1e59eb7044764f343da0ba22'
  },
  appPort: process.env.PORT ?? '8081',
  jwtSecret: process.env.JWT_SECRET ?? 'FGSDGSDFGSDFGSDGFSD'
}
