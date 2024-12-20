module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/results',
        permanent: true
      },
      {
        source: '/home',
        destination: '/results',
        permanent: true
      },
    ];
  }
};

