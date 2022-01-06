const config = {
  branches: [
    'master',
    { name: 'beta', prerelease: true, channel: 'beta' },
    { name: 'alpha', prerelease: true, channel: 'alpha' },
  ],
};

module.exports = config;