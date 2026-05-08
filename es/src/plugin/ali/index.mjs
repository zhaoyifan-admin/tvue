/*! Tvue.js v0.0.19 | (c) 2017-2026 Smallwei | Released under the MIT License. */
const getClient = (params) => {
    const client = new OSS(params);
    return client;
};

export { getClient };
