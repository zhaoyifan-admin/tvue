/*! Tvue.js v3.7.23-beta | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { t } from '../locale/index.mjs';

var locale = {
    methods: {
        t(...args) {
            return t.apply(this, args);
        },
    },
};

export { locale as default };
