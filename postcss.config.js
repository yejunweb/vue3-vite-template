/* eslint-env node */
module.exports = {
    plugins: {
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
};
