
/**
 * /src/js/runtime/contentScript.js
 * 
 */
window.annexSearch.DependencyLoader.load(function() {
    let lodash = _.noConflict();
    window.annexSearch.libs = window.annexSearch.libs || {};
    window.annexSearch.libs._ = lodash;
    window.annexSearch.AnnexSearch.setup();
});
