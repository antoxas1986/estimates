/*eslint no-undef: "error"*/
/*eslint-env node*/
module.exports = function () {
    var components = './resources/components/';
    var resources = './resources/';
    var public = './';
    

    var config = {
        alljs: [
            components + '**/*.js',
            './*.js'
        ],
        build: '../resources/static/',
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },
        css:[
            resources + '**/*.css'
        ],
        clean: ['index.html','./resources/components/angularTemplates.js', './../resources/static/img/', './../resources/static/js/', './../resources/static/styles/', './../resources/static/index.html'],
        index: 'index.html',
        template: './public/index.html',
        js: [
            components + '**/*.js'
        ],
        public: public,
        components: components,
        htmlTemplates: components + '**/*.html',
        templateCache: {
            file: 'angularTemplates.js',
            options:{
                module: 'glorem',
                standAlone: false,
                root: '/resources/components/'
            }
        }
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