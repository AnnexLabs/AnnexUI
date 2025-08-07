
// Setup
window.annexSearch = window.annexSearch || {};

/**
 * DependencyLoader
 * 
 * @abstract
 */
window.annexSearch.DependencyLoader = (function() {

    /**
     * Properties (private)
     * 
     */

    /**
     * __attemptClosures
     * 
     * @access  private
     * @var     Array (default: [])
     */
    var __attemptClosures = [];

    /**
     * __attempts
     * 
     * @access  private
     * @var     Number (default: 0)
     */
    var __attempts = 0;

    /**
     * Methods (private)
     * 
     */

    /**
     * __attempt
     * 
     * @access  private
     * @param   Array dependencies
     * @param   Function callback
     * @return  Boolean
     */
    var __attempt = function(dependencies, callback) {
        ++__attempts;
        __checkForFailure(dependencies);
        if (__dependenciesAvailable(dependencies) === true) {
            callback.apply(window.annexSearch.DependencyLoader);
            return true;
        }
        return false;
    };

    /**
     * __checkForFailure
     * 
     * @throws  Error
     * @access  private
     * @param   Array dependencies
     * @return  void
     */
    var __checkForFailure = function(dependencies) {
        if (__attempts > 10000) {
            var message = 'Could not complete an attempt: [';
            message += dependencies.join(', ') + ']';
            window.annexSearch && window.annexSearch.LoggingUtils && window.annexSearch.LoggingUtils.error(message);
            throw new Error(message);
        }
    };

    /**
     * __dependenciesAvailable
     * 
     * @access  private
     * @param   Array dependencies
     * @return  Boolean
     */
    var __dependenciesAvailable = function(dependencies) {
        var x = 0,
            l = dependencies.length;
        for (x; x < l; ++x) {
            if (__referenceExists(dependencies[x]) === false) {
                return false;
            }
        }
        return true;
    };

    /**
     * __referenceExists
     * 
     * @see     https://chatgpt.com/c/6750f75c-7cec-800f-bc86-c07201f22fcf
     * @access  private
     * @param   String path
     * @return  Boolean
     */
    var __referenceExists = function(path) {
        var parts = path.split('.'),
            current = window;
        for (var part of parts) {
            if (current[part] === undefined) {
                return false;
            }
            current = current[part];
        }
        return true;
    };

    /**
     * (public)
     * 
     */
    return {

        /**
         * load
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        load: function(callback) {
            callback = callback || function() {};
            var attempt;
            while (__attemptClosures.length > 0) {
                attempt = __attemptClosures.shift();
                if (attempt.apply(window.annexSearch.DependencyLoader) === false) {
                    __attemptClosures.push(attempt);
                }
            }
            callback(__attempts);
        },

        /**
         * push
         * 
         * @access  public
         * @param   String|Array dependencies
         * @param   Function callback
         * @return  Boolean
         */
        push: function(dependencies, callback) {
            if (typeof dependencies === 'string') {
                dependencies = [dependencies];
            }
            var args = [dependencies, callback],
                attempt = function() {
                    var response = __attempt.apply(window.annexSearch.DependencyLoader, args);
                    return response;
                };
            __attemptClosures.push(attempt);
            return true;
        }
    };
})();
