module.exports = {
  test: {
    // Disable Jest workers to avoid conflict with Next.js dev server
    maxWorkers: 1,
    detectOpenHandles: false,
  },
};
