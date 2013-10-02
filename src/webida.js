/**
* @fileOverview webida basic apis
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./base64'], factory);
    } else {
        // Browser globals
        root.Webida = factory(root.b);
    }
}(this, function () {
    'use strict';

    var Webida = {};
    var webidaHost = decodeURIComponent(
            document.cookie.replace(/(?:(?:^|.*;\s*)webida\.host\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
    Webida.conf = {
        webidaHost: webidaHost,
        apiBaseUrl: '//' + webidaHost + '/webida/api'
    };
    Webida.fs = {};
    Webida.auth = {};
    Webida.app = {};

    var $ = jQuery;

    // fs service api
    /**
     * FileSystem class
     * This class represents a Webida FileSystem.
     *
     * @param {String} fsUrl url for the Webida FileSystem. eg. wfs://host/fsid
     */
    var FileSystem = Webida.fs.FileSystem = function FileSystem(fsUrl) {
        this.fsUrl = fsUrl;
        var splittedUrl = fsUrl.split('/');
        this.protocol = splittedUrl[0];
        this.host = splittedUrl[2];
        this.fsid = splittedUrl[3];
    };

    /**
    * File System Apis.
    * @namespace
    * @name FileSystem
    */

    /**
    * Export a zipped file (zip)
    *
    * This function let the browser download the zipped file.
    *
    * @memberOf FileSystem
    * @method exportZip
    * @instance
    * @param {Array} source - Source path list. eg. ['/ws1/file1', 'ws1/file2']
    * @param {String} filename - Filename of the zipfile. eg. "archive.zip"
    */
    FileSystem.prototype.exportZip = function (source, filename) {
        var argument = '/?source=' + source.join() + '&target=' + filename + '&mode=export';
        var url = Webida.conf.apiBaseUrl + '/fs/archive/' + this.fsid + argument;

        location.href = url;
    };

    /**
    * Create / Extract a archive file (zip)
    *
    * @memberOf FileSystem
    * @method archive
    * @instance
    * @param {Array} source - Source path list(eg. ['/ws1/file1', 'ws1/file2']) for creating zipfile.
    *                         one zipefile path(eg. '/ws1/file1.zip') for extrating zipfile
    * @param {String} target - Target path
    * @param {String} mode - Creation mode. "create" | "extract"
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.archive = function (source, target, mode,  callback) {
        var argument = '/?source=' +
            encodeURIComponent(source.join()) + '&target=' + encodeURIComponent(target) + '&mode=' + mode;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/archive/' + this.fsid + argument,
            type: 'GET',
            success: function (data) {
                callback(null);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Search Keywords in Files
    *
    * @memberOf FileSystem
    * @method searchFiles
    * @instance
    * @param {String} keyword - Find keyword
    * @param {String} where - Find target path
    * @param {Object} options - Options { ignorecase: {Boolean}, wholeword: {Boolean}, includefile: {String}, excludedir: {String} }
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is search result list.
    */
    FileSystem.prototype.searchFiles = function (keyword, where, options, callback) {
        var argument = '/' + escape(keyword) + '?where=' + where;
        var ignorecase = options.ignorecase;
        var wholeword = options.wholeword;
        var includefile = options.includefile;
        var excludedir = options.excludedir;

        if (ignorecase !== undefined) { argument += '&ignorecase=' + ignorecase; }
        if (wholeword !== undefined) { argument += '&wholeword=' + wholeword; }
        if (includefile !== undefined) { argument += '&includefile=' + escape(includefile); }
        if (excludedir !== undefined) { argument += '&excludedir=' + escape(excludedir); }

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/search/' + this.fsid + argument,
            type: 'GET',
            success: function (data) {
                callback(null, JSON.parse(data).data);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Copy from source to destination. you can specify recursive mode.
    *
    * @memberOf FileSystem
    * @method copy
    * @instance
    * @param {String} source - Source path
    * @param {String} destination - Destination path | destination url
    * @param {Boolean} mode - Recursive mode. "true" | "false" (default is "false")
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.copy = function (src, dest, recursive, callback) {
        var path = '/?src=' + src + '&dest=' + dest;

        if (typeof recursive === 'function') {
            callback = recursive;
        } else {
            path += '&recursive=' + recursive;
        }

        var cb = callback;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/copy/' + this.fsid + path,
            type: 'POST',
            success: function () {
                cb(null);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                cb(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Create a directory. you can specify recursive mode.
    *
    * @memberOf FileSystem
    * @method createDirectory
    * @instance
    * @param {String} target - Directory path whitch to be crated.
    * @param {Boolean} mode - Recursive mode. "true" | "false" (default is "false")
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.createDirectory = function (src, recursive, callback) {
        var path = src;

        if (typeof recursive === 'function') {
            callback = recursive;
        } else {
            path += '?recursive=' + recursive;
        }

        var cb = callback;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/directory/' + this.fsid + '/' + path,
            type: 'POST',
            success: function (data) {
                // created a directory
                cb(null);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                cb(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Create a new file.
    *
    * @memberOf FileSystem
    * @method createNewFile
    * @instance
    * @param {String} target - File path whitch to be crated.
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.createNewFile = function (path, callback) {
        var self = this;
        var fsid = this.fsid;

        // check whether file is existed or not
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/list/' + fsid + '/' + path,
            type: 'GET',
            statusCode: {
                // if file is existed, return 200 status code.
                200: function () {
                    callback('EEXIST');
                },
                403: function (jqXHR) {
                    callback(JSON.parse(jqXHR.responseText));
                },
                401: function () {
                    callback({reason: 'Require login'});
                },
                // if file does not exist, return 404 status code. then try to make a file.
                404: function () {
                    self.writeFile(path, null, '', callback);
                }
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Checks whether the specified path exists.
    *
    * @memberOf FileSystem
    * @method exists
    * @instance
    * @param {String} path - Check path
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is check result. true | false.
    */
    FileSystem.prototype.exists = function (path, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/exists/' + this.fsid + '/' + path,
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                callback(null, JSON.parse(data).data);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Checks whether the specified path is a directory.
    *
    * @memberOf FileSystem
    * @method isDirectory
    * @instance
    * @param {String} path - Check path
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is check result. true | false.
    */
    FileSystem.prototype.isDirectory = function (path, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/stat/' + this.fsid + '/' + path,
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                // data.result === 'ok'
                var fileinfo = JSON.parse(data).data;
				callback(null, fileinfo.isDirectory);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Checks whether the specified path is a emtpy directory.
    *
    * @memberOf FileSystem
    * @method isEmpty
    * @instance
    * @param {String} path - Check path
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is check result. true | false.
    */
    FileSystem.prototype.isEmpty = function (path, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/list/' + this.fsid + '/' + path,
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                var fileinfo = JSON.parse(data).data;
                var listlen = fileinfo.length;

                // if the path is empty directory, return true
                if (listlen === 0) {
                    callback(null, true);
                } else {
                    // if the path is not empty directory, return false
                    callback(null, false);
                }
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Checks whether the specified path is a file.
    *
    * @memberOf FileSystem
    * @method isFile
    * @instance
    * @param {String} path - Check path
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is check result. true | false.
    */
    FileSystem.prototype.isFile = function (path, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/stat/' + this.fsid + '/' + path,
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                var fileinfo = JSON.parse(data).data;
                callback(null, fileinfo.isFile);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get the list of specified path. you can specify recursive mode.
    *
    * @memberOf FileSystem
    * @method lists
    * @instance
    * @param {String} path - Check path
    * @param {Boolean} mode - Recursive mode. "true" | "false" (default is "false")
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is sub directory/file information list.
    */
    FileSystem.prototype.list = function (path, recursive, callback) {
        if (typeof recursive === 'function') {
            callback = recursive;
        } else {
            path += '?recursive=' + recursive;
        }

        var cb = callback;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/list/' + this.fsid + '/' + path,
            type: 'GET',
            success: function (data) {
                cb(null, JSON.parse(data).data);
            },
            error: function (jqXHR) {
                cb(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get the stat of specified path.
    *
    * @memberOf FileSystem
    * @method stat
    * @instance
    * @param {String} path - Stat path
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is path's information.
    */
    FileSystem.prototype.stat = function (path, cb) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/stat/' + this.fsid + '/' + path,
            type: 'GET',
            success: function (data) {
                cb(null, JSON.parse(data).data);
            },
            error: function (jqXHR) {
                cb(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Remove the directory or file. you can specify recursive mode.
    *
    * @memberOf FileSystem
    * @method remove
    * @instance
    * @param {String} path - Source path
    * @param {Boolean} mode - Recursive mode. "true" | "false" (default is "false")
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.remove = function (path, recursive, callback) {
        if (typeof recursive === 'function') {
            callback = recursive;
        } else {
            path += '?recursive=' + recursive;
        }

        var cb = callback;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/file/' + this.fsid + '/' + path,
            type: 'DELETE',
            success: function (data) {
                cb(null);
            },
            error: function (jqXHR, testStatus, errorThrown) {
                cb(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Move file
    *
    * @memberOf FileSystem
    * @method copy
    * @instance
    * @param {String} oldpath - Source path
    * @param {String} newpath - destination path | destination url
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.rename = function (oldpath, newpath, callback) {
        var path = '/?oldpath=' + oldpath + '&newpath=' + newpath;

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/rename/' + this.fsid + path,
            type: 'POST',
            success: function () {
                callback(null);
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Read a file contents.
    *
    * @memberOf FileSystem
    * @method readFile
    * @instance
    * @param {String} path - Read file path
    * @param {String} type - Encoding type. "ascii" | "utf8" | "base64" | "binary"
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is file contents.
    */
    FileSystem.prototype.readFile = function (path, encoding, callback) {
        var opt = {};
        if (encoding) {
            // TODO check validity
            opt.encoding = encoding;
        }

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/file/' + this.fsid + '/' + path,
            data: opt,
            dataType: 'text',
            success: function (data) {
                callback(null, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * File write unsing input data
    *
    * @memberOf FileSystem
    * @method writeFile
    * @instance
    * @param {String} path - Path of the file in filesystem
    * @param {String} [type] - Encoding type. "base64" | null
    * @param {String|File|Object} data - Base64 encoded string or string. If type is ommited then data is File or Blob object
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.writeFile = function (path, encoding, data, callback) {
        var fd = new FormData();
        if (callback) {
            if (encoding === 'base64') {
                data = Base64.decode(data);
            }
            //var blob = new Blob([data], {'type': 'application/octet-stream'});
            var blob = Webida.createBlobObject([data], {'type': 'application/octet-stream'});
            fd.append('file', blob);
        } else {
            var file = encoding;
            var callback = data;
            fd.append('file', file);
        }

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/file/' + this.fsid + '/' + path,
            type: 'POST',
            processData: false,
            contentType: false,
            data: fd,
            success: function (data) {
                callback(null);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get ACL of a resource.
    *
    * @memberOf FileSystem
    * @method getAcl
    * @instance
    * @param {String} path - file path
    * @param {function} callback(err,acl) - Callback function.
    *        If api executed successfully then 'err' is null. And 'acl' is ACL of the resource.
    */
    FileSystem.prototype.getAcl = function (path, callback) {
        var opt = {};
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/acl/' + this.fsid + '/' + path,
            data: opt,
            dataType: 'text',
            success: function (data) {
                console.log('webida.js getAcl', path, data);
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null, data.data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Set ACL of a resource.
    *
    * @memberOf FileSystem
    * @method setAcl
    * @instance
    * @param {String} path - file path
    * @param {Object} acl - new ACL. eg. {user1:'r',user2:'w',user3:'rw'}
    * @param {function} callback(err,acl) - Callback function.
    *        If api executed successfully then 'err' is null.
    */
    FileSystem.prototype.setAcl = function (path, newAcl, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/fs/acl/' + this.fsid + '/' + path + '?acl=' + JSON.stringify(newAcl),
            type: 'POST',
            success: function (data) {
                console.log('webida.js setAcl', path, data);
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get FileSystem object indicating the given Webida file system url
    *
    * @memberOf FileSystem
    * @method mount
    * @param {String} fsUrl - webida fs url
    * @param {String} url - App root url
    * @returns {Object} - Mounted file system object
    */
    Webida.fs.mount = function (fsUrl) {
        return new FileSystem(fsUrl);
    };

    Webida.fs.mountByFsid = function (fsid) {
        return new Webida.fs.FileSystem('wfs://webida/' + fsid);
    };

    /**
     * Get My FileSystem Object
     *
     * @memberOf FileSystem
     * @method getMyFilesystem
     * @param {Function} callback - callback(err, fs)
     */
    Webida.fs.getMyFilesystem = function (callback) {
        Webida.auth.myinfo(function (err, myinfo) {
            if (err) {
                return callback(err);
            }
            var fsid = myinfo.fsid;
            if (!fsid) {
                return callback(new Error('You have no FS'));
            }
            var fs = Webida.fs.mountByFsid(fsid);
            callback(null, fs);
        });
    };

    /**
    * Application Service Apis.
    * @namespace
    * @name AppService
    */

    /**
    * Check input id's validation
    *
    * @memberOf AppService
    * @method isValidAppid
    * @param {String} id - App id
    * @returns {Boolean} App id validation check result. true | false
    */
    var APPID_PATTERN = /^(|[a-z0-9-_~.@]{5,})$/;
    Webida.app.isValidAppid = function isValidAppid(appid) {
        return APPID_PATTERN.test(appid);
    };

    /**
    * Get the host of currently used Webida server
    *
    * @returns {String} host - host of current Webida server. eg. 'webida.org'
    */
    Webida.app.getWebidaHost = function getWebidaHost() {
        return Webida.conf.webidaHost;
    };

    /**
    * Check input app type's validation
    *
    * @memberOf AppService
    * @method isValidApptype
    * @param {String} type - App type
    * @returns {Boolean} App type validation check result. true | false
    */
    var VALID_APPTYPES = ['html', 'nodejs'];
    Webida.app.isValidApptype = function isValidApptype(apptype) {
        for(var i in VALID_APPTYPES) {
            if (VALID_APPTYPES.hasOwnProperty(i) && VALID_APPTYPES[i] === apptype) {
                return true;
            }
        }
        return false;
    };

    /**
    * Create application
    *
    * @memberOf AppService
    * @method createApp
    * @param {String} id - App id
    * @param {String} type - App type
    * @param {String} name - App name
    * @param {String} desc - App description
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.createApp = function createApp(appid, apptype, name, desc, callback) {
        if (!Webida.app.isValidAppid(appid)) {
            callback({result: 'failed', reason: 'Invalid appid'});
            return;
        }
        if (!Webida.app.isValidApptype(apptype)) {
            callback({result: 'failed', reason: 'Invalid apptype'});
            return;
        }

        var opt = {
            appid: appid,
            apptype: apptype,
            name: name,
            desc: desc
        };
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/create',
            data: opt,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Change application's information
    *
    * @memberOf AppService
    * @method changeApp
    * @param {String} id - App id
    * @param {String} newId - New app type
    * @param {String} type - App type. "html" | "nodejs"
    * @param {String} name - App name
    * @param {String} desc - App description
    * @param {String} owner - App owner
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.changeApp = function changeApp(appid, newappid, apptype, name, desc, owner, callback) {
        if (!Webida.app.isValidAppid(appid)) {
            callback({result: 'failed', reason: 'Invalid appid'});
            return;
        }
        if (!Webida.app.isValidApptype(apptype)) {
            callback({result: 'failed', reason: 'Invalid apptype'});
            return;
        }
        if (!Webida.app.isValidAppid(newappid)) {
            callback({result: 'failed', reason: 'Invalid appid'});
            return;
        }

        var opt = {
            appid: appid,
            newappid: newappid,
            newapptype: apptype,
            newname: name,
            newdesc: desc,
            newowner: owner
        };
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/changeappinfo',
            data: opt,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get my application list
    *
    * @memberOf AppService
    * @method myApps
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is app information list.
    */
    Webida.app.myApps = function myApps(callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/myapps',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null, data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get all application list
    *
    * @memberOf AppService
    * @method allApps
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is app information list.
    */
    Webida.app.allApps = function allApps(callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/allapps',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null, data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get application information using id.
    *
    * @memberOf AppService
    * @method getAppInfo
    * @param {String} id - Application id
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is app information.
    */
    Webida.app.getAppInfo = function getAppInfo(appId, callback) {

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/appinfo',
            data: 'appid=' + appId,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null, data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Delete application.
    *
    * @memberOf AppService
    * @method deleteApp
    * @param {String} id - Application id
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.deleteApp = function deleteApp(appId, callback) {

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/delete',
            data: 'appid=' + appId,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Start application.
    *
    * @memberOf AppService
    * @method startApp
    * @param {String} id - Application id
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.startApp = function startApp(appId, callback) {

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/start',
            data: 'appid=' + appId,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Stop application.
    *
    * @memberOf AppService
    * @method stopApp
    * @param {String} id - Application id
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.stopApp = function stopApp(appId, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/stop',
            data: 'appid=' + appId,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(jqXHR.responseText);
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Deploy application.
    *
    * @memberOf AppService
    * @method deployApp
    * @param {String} id - Application id
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.app.deployApp = function deployApp(srcUrl, type, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/app/deploy',
            data: 'srcUrl=' + srcUrl + '&type=' + type,
            type: 'GET',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Launch application.
    *
    * @memberOf AppService
    * @method LaunchApp
    * @param {String} id - Application id
    * @param {Boolean} mode - Launch mode. If mode is true then new windows opend using app. If false then app is launction in current window
    * @param {String} queryString - Application launch option. This string is added in tartget url.
    * @return {Object} - App is launching in current/another browser. return is window object
    */
    Webida.app.launchApp = function launchApp(appid, newWindowFlag, queryString) {
        var addr = appid + '.' + Webida.app.getWebidaHost();

        //Add port information
        if (window.location.port) {
            addr = addr + ':' + window.location.port;
        }

        //Add protocol information
        var url = window.location.protocol + '//' + addr + '/';

        //Add query string
        if (queryString) {
            url = url + queryString;
        }

        if (newWindowFlag) {
            return window.open(url);
        } else {
            return window.location.assign(url);
        }
    };

    /**
    * Authorization Service Apis.
    * @namespace
    * @name AuthService
    */

    /**
    *
    * Login using username and password
    *
    * @memberOf AuthService
    * @method login
    * @param {String} name - User name
    * @param {String} password - User password
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data.autoinfo' is login user's information.
    */
    Webida.auth.login = function (username, password, callback) {
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/login',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                data = JSON.parse(data);
                // created a directory
                if (data.result === 'ok') {
                    callback(null, data.data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Logout current user
    *
    * @memberOf AuthService
    * @method logout
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.auth.logout = function (callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/logout',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Sign up new user.
    *
    * @memberOf AuthService
    * @method singup
    * @param {String} email - User email
    * @param {String} username - User name
    * @param {String} pwssword - User password
    * @param {String} authphrase - Authorization keyword
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is user information.
    */
    Webida.auth.signup = function (email, username, password, authphrase, callback) {
        var formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('authphrase', authphrase);

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/signup',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                data = JSON.parse(data);
                // created a directory
                if (data.result === 'ok') {
                    callback(null, data.data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Sign out user.
    *
    * @memberOf AuthService
    * @method singup
    * @param {String} username - User name
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.auth.signout = function (username, callback) {
        var formData = new FormData();
        formData.append('username', username);

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/signout?username=' + username,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    callback(null);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get my information.
    *
    * @memberOf AuthService
    * @method myinfo
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is my information.
    */
    Webida.auth.myinfo = function (callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/myinfo',
            success: function (data) {
                console.log('myinfo success', data);
                data = JSON.parse(data);
                console.log('myinfo parsed', JSON.stringify(data));
                if (data.result === 'ok') {
                    callback(null, data.data);
                } else {
                    callback(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('myinfo fail', jqXHR.responseText);
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Get user information.
    *
    * @memberOf AuthService
    * @method userinfo
    * @param {String} name - User name
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is user information.
    */
    Webida.auth.userinfo = function (username, callback) {
        var opt = {username: username};

        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/userinfo',
            data: opt,
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    return callback(null, data.data);
                }
                return callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Add new secret Key.
    *
    * @memberOf AuthService
    * @method addNewSecretKey
    * @param {function} callback(err,data) - Callback function. If api executed successfully then 'err' is null. And 'data' is secretkey.
    */
    Webida.auth.addNewSecretKey = function (callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/myinfo/secretkeys',
            type: 'POST',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    return callback(null, data.data);
                }
                return callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    /**
    * Delete secret Key.
    *
    * @memberOf AuthService
    * @method deleteSecretKey
    * @param {String} key - SecretKey
    * @param {function} callback(err) - Callback function. If api executed successfully then 'err' is null.
    */
    Webida.auth.deleteSecretKey = function (secretKey, callback) {
        $.ajax({
            url: Webida.conf.apiBaseUrl + '/auth/myinfo/secretkeys/' + secretKey,
            type: 'DELETE',
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === 'ok') {
                    return callback(null);
                }
                return callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                callback(JSON.parse(jqXHR.responseText));
            },
            xhrFields: { withCredentials: true }
        });
    };

    Webida.createBlobObject = function createBlobObject(data, type) {
        var blob;
        //Try to using Blob
        try {
            blob = new Blob([data], {'type': type});
        }
        catch (e) {
            // TypeError old chrome and FF
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name === 'TypeError' && window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(data);
                blob = bb.getBlob(type);
            }
            else if (e.name === 'InvalidStateError') {
                // InvalidStateError (tested on FF13 WinXP)
                blob = new Blob([data], {type : type});
            }
            else {
                // We're screwed, blob constructor unsupported entirely
            }
        }
        return blob;
    };

    return Webida;
}));
