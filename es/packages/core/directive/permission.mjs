/*! Tvue.js v0.0.19 | (c) 2017-2026 Smallwei | Released under the MIT License. */
var permission = (() => {
    function init(el, binding) {
        const value = binding.value;
        if (value === false) {
            el.style.display = 'none';
        }
        else {
            el.style.display = '';
        }
    }
    return {
        mounted(el, binding) {
            init(el, binding);
        },
        updated(el, binding) {
            init(el, binding);
        },
    };
})();

export { permission as default };
