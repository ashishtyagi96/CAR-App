const { override, addLessLoader } = require("customize-cra");

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@menu-dark-bg": "#7d7d7d",
            "@btn-primary-bg": "#1890ff",
            "@primary-color": "#1890ff"
        }
    })
);
