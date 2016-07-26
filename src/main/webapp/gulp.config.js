/*eslint no-undef: "error"*/
/*eslint-env node*/
module.exports = function () {
    var components = './resources/components/';
    var resources = './resources/';
    var public = './public/';

    var config = {
        alljs: [
            components + '**/*.js',
            './*.js'
        ],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },
        css:[
            resources + '**/*.css'
        ],
        index: './public/index.html',
        js: [
            components + '**/*.js'
        ],
        public: public
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;

};