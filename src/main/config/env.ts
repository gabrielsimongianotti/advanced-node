export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    token: process.env.FB_TOKEN ?? '',
    clientSecret:
      process.env.FB_CLIENT_SECRET ?? ''
  },
  appPort: process.env.PORT ?? '8081',
  jwtSecret: process.env.JWT_SECRET ?? 'FGSDGSDFGSDFGSDGFSD'
}
