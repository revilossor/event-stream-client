module.exports = (aggregateId, version) => ({
  get: (data) => ({
    aggregateId,
    data,
    version: ++version
  }),
  version: () => version
});
