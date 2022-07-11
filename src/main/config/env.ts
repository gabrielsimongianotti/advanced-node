export const env = {// fis isso para facilitar os teste de vcs
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '559580479142130',
    clientSecret:
      process.env.FB_CLIENT_SECRET ?? '42f0721c774723e94d9cd844fcc075f1'
  },
  appPort: process.env.PORT ?? '8081',
  jwtSecret: process.env.JWT_SECRET ?? 'FGSDGSDFGSDFGSDGFSD'
}
