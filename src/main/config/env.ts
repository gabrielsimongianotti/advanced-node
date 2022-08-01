export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '650961116275251',
    clientSecret:
      process.env.FB_CLIENT_SECRET ?? '05460bbc1e59eb7044764f343da0ba22',
    accessToken:
      process.env.FB_ACCESS_TOKEN ??
      'EAAJQC7IZAIjMBAJFbEVdGeUPos3OaiOKHOqijFaDRQ8eZAacXjUPwIOSPrZCojch9WrLIdFycDAfQTtDmZCG3ihQhZBCwV8aac6Im7Clbpv7oAMEaF8Fj9r8ZBIN3q6POPIcMmqcZCP0HUp8lhljISUddZAHVJIR0azI4B1DhRBi0MNzvX7BtMuSQZBwVpRHa5bALY4qAvGZAphe7l1K95r5kf'
  },
  appPort: process.env.PORT ?? '8081',
  jwtSecret: process.env.JWT_SECRET ?? 'FGSDGSDFGSDFGSDGFSD'
}
