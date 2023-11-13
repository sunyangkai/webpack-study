

module.exports = function loader(source) {
    return `import "./style"\n ${source}`;
};