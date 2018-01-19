// Default configuration
const prefix = 'v-collapse';
const basename = 'collapse';

const defaults = {
    'prefix' : prefix,
    'basename' : basename,
    'togglerClassDefault': prefix + '-toggler',
    'togglerClassStart': prefix + '-toggler-start',
    'togglerClassEnd': prefix + '-toggler-end',
    'contentClassDefault': prefix + '-content',
    'contentClassStart': prefix + '-content-start',
    'contentClassEnd': prefix + '-content-end'
};

// Global toggle method

const toggleElement = function (target, config) {
    target.classList.toggle(config.contentClassEnd);
};

module.exports={
    defaults,
    toggleElement
};