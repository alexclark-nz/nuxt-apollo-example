export default function (context) {
  return {
    httpEndpoint: 'http://theboxoffice.test',
    browserHttpEndpoint: '/api',
    httpLinkOptions: {
      credentials: 'same-origin',
    },
  }
}
