// Default configuration
const prefix = 'v-collapse';
const basename = 'collapse';

const defaults = {
    'prefix' : prefix,
    'basename' : basename,
    'togglerClassDefault': prefix + '-toggler',
    'contentClassDefault': prefix + '-content',
    'contentClassEnd': prefix + '-content-end'
};

// Global toggle methods

const toggleElement = function (target, config) {
    target.classList.toggle(config.contentClassEnd);
};

const closeElement = function (target, config) {
    target.classList.remove(config.contentClassEnd);
};

const openElement = function (target, config) {
    target.classList.add(config.contentClassEnd);
};

module.exports={
    defaults,
    toggleElement,
    closeElement,
    openElement,
};
