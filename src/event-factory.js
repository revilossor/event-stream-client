module.exports = (aggregateId, version) => (data) => ({
  aggregateId,
  data,
  version: ++version
});
