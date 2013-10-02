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

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallback
    * @param {err} error - Error message. Error message is string or undefined
    * @return {undefined}
    */
    
	/**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithSearchResult
    * @param {err} error - Error message. Error message is string or undefined
    * @param {Array.<searchResult>} result - search result.
    * @return {undefined}
    */
   
	/**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithResultFlag
    * @param {err} error - Error message. Error message is string or undefined
    * @param {boolean} result - result flag.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithListContents
    * @param {err} error - Error message. Error message is string or undefined
    * @param {Array.<fileStat>} contents - list contents information.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithStatContent
    * @param {err} error - Error message. Error message is string or undefined
    * @param {fileStat} content - stat content information.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithFileData
    * @param {err} error - Error message. Error message is string or undefined
    * @param {string} content - file contetns.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithAppList
    * @param {err} error - Error message. Error message is string or undefined
    * @param {appsInfoContent} content - applications information.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithAppInfo
    * @param {err} error - Error message. Error message is string or undefined
    * @param {appInfoContent} content - application information.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithUserInfo
    * @param {err} error - Error message. Error message is string or undefined
    * @param {userInfo} content - user information.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithSecretKey
    * @param {err} error - Error message. Error message is string or undefined
    * @param {string} key - new secret key.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithFilesystem
    * @param {err} error - Error message. Error message is string or undefined
    * @param {webidaFS} fs - webida file system.
    * @return {undefined}
    */

    /**
    * Callback function. If function finished successfully then err is undefined
    *
    * @callback requestCallbackWithACL
    * @param {err} error - Error message. Error message is string or undefined
    * @param {acl} acl - access control list.
    * @return {undefined}
    */
    
	/**
    * Error type.
    * @typedef {string|undefined} err
    */
    
	/**
    * Application id - App id should be at least 5 characters. and each character must be [a-z0-9-_~.@]
    * @typedef {string} appId
    */
    
	/**
    * Application type - Current app type is only valid 'html'|'nodejs'
    * @typedef {string} appType
    */

    /**
    * Application status - Status is only vaild 'running'|'stopped'
    * @typedef {string} appStatus
    */
    
	/**
    * Webida file system's path - eg. '/ws1/dir1', 'ws1/file1'
    * @typedef {string} path
    */
   
	/**
    * Webida file system's url - eg. wfs://host/fsid
    * @typedef {string} fsUrl
    */
    
	/**
    * Creation mode - Creation mode is only vaild 'create'|'extract'
    * @typedef {string} creationMode
    */
    
	/**
    * Encoding type - Read encoding type is only vaild 'ascii'|'utf8'|'base64'|'binary'|undefined
    * @typedef {string|undefined} readEncodingType
    */
    
	/**
    * Encoding type - Write encoding type is only vaild 'base64'|undefined
    * @typedef {string} writeEncodingType
    */

	/**
    * Search options.
    * @typedef {object} searchOption
    * @property {boolean} [ignorecase] - ignorecase
    * @property {boolean} [wholeword] - wholeword
    * @property {path} [includefile] - includefile
    * @property {path} [excludedir] - excludedir
    * @summary {ignorecase:boolean, wholeword:boolean, includefile:string, excludedir:string}
    */

	/**
    * Search result.
    * @typedef {object} searchResult
    * @property {path} filename - search file path
    * @property {Array.<searchMatchInfo>} match - wholeword
    * @summary {filename:path, match:[{line:int, text:string}]}
    */

	/**
    * Search match file information.
    * @typedef {object} searchMatchInfo
    * @property {int} line - matching line number
    * @property {string} text - matching line text
    */

	/**
    * List directory contents.
    * @typedef {object} fileStat
    * @property {string} filename - file name 
    * @property {path} path - file path
    * @property {boolean} isFile - if contents is file then ture 
    * @property {boolean} isDirectory - if contents is directory then true
    * @property {int} size - file size. if contents is directory then size is 4096
    * @property {string} atime - access time
    * @property {string} mtime - modify time
    * @property {string} ctime - create time
    * @summary {filename:string, path:path, isFile:boolean, isDirectory:boolean, size:int, 
    *           atime:string, mtime:string, ctime:string}
    */

	/**
    * App list contents.
    * @typedef {object} appsInfoContent
    * @property {string} result - Result value must be 'ok'
    * @property {Array.<appInfo>} apps - appication information list
    * @summary {result:string, apps:[{appid:appId, apptype:appType, name:string, desc:string, owner:string, 
    *           status:appStatus, pid:int, port:int, [url:path]}]}
    */

	/**
    * App list contents.
    * @typedef {object} appInfoContent
    * @property {string} result - Result value must be 'ok'
    * @property {appInfo} apps - appication information list
    * @summary {result:string, appinfo:{appid:appId, apptype:appType, name:string, desc:string, owner:string, 
    *           status:appStatus, pid:int, port:int, [url:path]}}
    */
    
	/**
    * App information contents.
    * @typedef {object} appInfo
    * @property {appId} appid - app id
    * @property {appType} apptype - app type
    * @property {string} name - app name
    * @property {string} desc - app description
    * @property {string} owner - app owner
    * @property {appStatus} status - app status
    * @property {int} pid - process id
    * @property {int} port - port number
    * @property {path} [url] - application url
    * @summary {appid:appId, apptype:appType, name:string, desc:string, owner:string, status:appStatus, 
    *          pid:int, port:int, [url:path]}
    */
    
	/**
    * user information.
    * @typedef {object} userInfo
    * @property {string} _id - user id
    * @property {passportUserProfile} authinfo - app type
    * @property {string} email - user mail
    * @property {string} fsid - file system id
    * @property {string} lastLoginTimestampUTC - last login time
    * @property {string} passwordDigest - password digest
    * @property {string} username - user name
    * @property {Array.<string>} [secretKeys] - secret key list
    * @summary {_id:string, email:string, fsid:string, lastLoginTimestampUTC:string, passwordDigest:string, username:string,
    *          authinfo:{[provider:string], [id:string], [displayName:string], [emails:[{value:string, type:string}]], 
    *          [photos:[{value:string}]], [name:{familyName:string, givenName:string, middleName:string}]}}
    */
    
	/**
    * oauth information.
    * @typedef {object} passportUserProfile
    * @property {string} [provider] - The provider which with the user authenticated
    * @property {string} [id] - A unique identifier for the user, as generated by the service provider.
    * @property {string} [displayName] - The name of this user, suitable for display. 
    * @property {Array.<passportEmail>} [emails] - user email list
    * @property {Array.<passportPhoto>} [photos] - user photo
    * @property {passportName} [name] - user name
    * @summary {[provider:string], [id:string], [displayName:string], [emails:[{value:string, type:string}]], 
    *          [photos:[{value:string}]], [name:{familyName:string, givenName:string, middleName:string}]}
    */
    
	/**
    * oauth information.
    * @typedef {object} passportEmail
    * @property {string} [value] - The actual email address.
    * @property {string} [type] - The type of email address (home, work, etc.).
    * @summary {value:string, type:string}
    */
    
	/**
    * oauth information.
    * @typedef {object} passportPhoto
    * @property {string} [value] - The URL of the image.
    * @summary {value:string}
    */
    
	/**
    * oauth information.
    * @typedef {object} passportName
    * @property {string} [familyName] - The family name of this user, or "last name" in most Western languages.
    * @property {string} [givenName] - The given name of this user, or "first name" in most Western languages.
    * @property {string} [middleName] - The middle name of this user.
    * @summary {familyName:string, givenName:string, middleName:string}
    */
    
	/**
    * binary large object
    * @typedef {object} blob
    */
    
	/**
    * window object
    * @typedef {object} window
    */
    
	/**
    * webida file system
    * @typedef {object} webidaFS
    * @property {fsUrl} fsUrl - file system url.
    * @property {string} username - user name.
    * @property {string} username - user name.
    * @property {string} username - user name.
    */
    
	/**
    * access control list. eg. {user1:'r', user2:'w', user3:'rw'}
    * @typedef {object} acl
    * @property {string} username - user name.
    * @property {string} accessControl - access control. 'r'|'w'|'rw'
    */
 
    /**
    * File System Apis.
    * @namespace
    * @name FileSystem
    */
    
    /**
     * FileSystem class
     * This class represents a Webida FileSystem.
     * @memberOf FileSystem 
     * @method FileSystem
     * @param {fsUrl} fsUrl url for the Webida FileSystem. eg. wfs://host/fsid
     * @return {webidaFS}
     */
    var FileSystem = Webida.fs.FileSystem = function FileSystem(fsUrl) {
        this.fsUrl = fsUrl;
        var splittedUrl = fsUrl.split('/');
        this.protocol = splittedUrl[0];
        this.host = splittedUrl[2];
        this.fsid = splittedUrl[3];
    };
    
   /**
    * This function let the browser download the zipped file.
    *
    * @memberOf FileSystem 
    * @method FileSystem.exportZip
    * @param {Array.<path>} source - Source path list. eg. ['/ws1/file1', 'ws1/file2']
    * @param {string} filename - Filename of the zipfile. eg. "archive.zip"
    * @return {undefined}
    */
    FileSystem.prototype.exportZip = function (source, filename) {
        var argument = '/?source=' + source.join() + '&target=' + filename + '&mode=export';
        var url = Webida.conf.apiBaseUrl + '/fs/archive/' + this.fsid + argument;

        location.href = url;
    };

   /**
    * 
    * Create / Extract a archive file (zip)
    *
    * @memberOf FileSystem
    * @method archive
    * @param {Array.<path>} source - Source path list(eg. ['/ws1/file1', 'ws1/file2']) for creating zipfile.
    * @param {path} target - Target path
    * @param {creationMode} mode - Creation mode. "create" | "extract"
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {string} keyword - Find keyword
    * @param {path} where - Find target path
    * @param {searchOption} options - Search option
    * @param {requestCallbackWithSearchResult} callback -
    *        (error:string|undefined, [result:{filename:path, [match:{line:int, text:string}]}]) → undefine
    *        <br>If function finished successfully then err is undefined
    *        And 'result' is search result list.
    * @return {undefined}
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
    * @param {path} source - Source path
    * @param {path} destination - Destination path | destination url
    * @param {boolean} [mode=false] - Recursive mode. "true" | "false" (default is "false")
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {path} target - Directory path whitch to be crated.
    * @param {boolean} [mode=false] - Recursive mode. "true" | "false" (default is "false")
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {path} target - File path whitch to be crated.
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {path} target - Check path.
    * @param {requestCallbackWithResultFlag} callback -
    *        (error:string|undefined, [resultFlag:boolean]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And if file exist then resultFlag is true. else resultFlag is false.
    * @return {undefined}
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
    * @param {path} target - Check path.
    * @param {requestCallbackWithResultFlag} callback -
    *        (error:string|undefined, [resultFlag:boolean]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And if target path is directory then resultFlag is true. else resultFlag is false.
    * @return {undefined}
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
    * @param {path} target - Check path
    * @param {requestCallbackWithResultFlag} callback -
    *        (error:string|undefined, [resultFlag:boolean]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And if target path is empty directory then resultFlag is true. else resultFlag is false.
    * @return {undefined}
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
    * @param {path} target - Check path
    * @param {requestCallbackWithResultFlag} callback -
    *        (error:string|undefined, [resultFlag:boolean]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And if target path is file then resultFlag is true. else resultFlag is false.
    * @return {undefined}
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
    * @method list
    * @param {path} target - List directory path
    * @param {boolean} [mode=false] - Recursive mode. "true" | "false" (default is "false")
    * @param {requestCallbackWithListContents} callback -
    *        (error:string|undefined, [contents:[{filename:string, path:path, isFile:boolean, isDirectory:boolean,
    *        size:int, atime:string, mtime:string, ctime:string}]]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And contents is sub directory/file information list.
    * @return {undefined}
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
    * @param {path} target - Check path
    * @param {requestCallbackWithStatContent} callback -
    *        (error:string|undefined, contents:[{filename:string, path:path, isFile:boolean, isDirectory:boolean, size:int,
    *        atime:string, mtime:string, ctime:string}]) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And contents is path information.
    * @return {undefined}    
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
    * @param {path} target - Target path
    * @param {boolean} [mode=false] - Recursive mode. "true" | "false" (default is "false")
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @method rename
    * @param {path} oldpath - Source path
    * @param {path} newpath - destination path | destination url
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {path} target - Read file path
    * @param {readEncodingType} type - Encoding type. 'ascii' | 'utf8' | 'base64' | 'binary' | undefined
    * @param {requestCallbackWithFileData} callback -
    *        (error:string|undefined, contents:string) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And contents is file contents.
    * @return {undefined} 
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
    * @param {path} target - Path of the file in filesystem
    * @param {writeEncodingType} [type] - Encoding type. 'base64'|undefined
    * @param {string|file|blob} data - Base64 encoded string or string. 
    *        If type is ommited then data is file or blob object
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {path} target - file path
    * @param {requestCallbackWithACL} callback -
    *        (error:string|undefined, acl:acl) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And acl is target's access control list.
    * @return {undefined} 
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
    * @param {string} path - file path
    * @param {acl} acl - new ACL. eg. {user1:'r',user2:'w',user3:'rw'}
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {fsUrl} fsUrl - webida fs url
    * @returns {webidaFS} - Mounted file system object
    */
    Webida.fs.mount = function (fsUrl) {
        return new FileSystem(fsUrl);
    };

    /**
    * Get FileSystem object indicating the given Webida file system id
    *
    * @memberOf FileSystem
    * @method mount
    * @param {string} fsId - webida fs id
    * @returns {webidaFS} - Mounted file system object
    */
    Webida.fs.mountByFsid = function (fsid) {
        return new Webida.fs.FileSystem('wfs://webida/' + fsid);
    };

    /**
    * Get My FileSystem Object
    *
    * @memberOf FileSystem
    * @method getMyFilesystem
    * @param {requestCallbackWithFilesystem} callback -
    *        (error:string|undefined, filesystem:webidaFS) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And filesystem is file system object.
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
    * @param {appId} appid - Application id
    * @returns {boolean} App id validation check result. true | false
    */
    var APPID_PATTERN = /^(|[a-z0-9-_~.@]{5,})$/;
    Webida.app.isValidAppid = function isValidAppid(appid) {
        return APPID_PATTERN.test(appid);
    };

    /**
    * Get the host of currently used Webida server
    *
    * @memberOf AppService
    * @method getWebidaHost
    * @returns {string} host of current Webida server. eg. 'webida.org'
    */
    Webida.app.getWebidaHost = function getWebidaHost() {
        return Webida.conf.webidaHost;
    };

    /**
    * Check input application type's validation
    *
    * @memberOf AppService
    * @method isValidApptype
    * @param {appType} apptype - App type
    * @returns {boolean} App type validation check result. true | false
    */
    var VALID_APPTYPES = ['html', 'nodejs'];
    Webida.app.isValidApptype = function isValidApptype(apptype) {
        for (var i in VALID_APPTYPES) {
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
    * @param {appId} appid - App id
    * @param {appType} apptype - App type
    * @param {string} name - App name
    * @param {string} desc - App description
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {appId} id - App id
    * @param {appId} newId - New app type
    * @param {appType} type - App type. "html" | "nodejs"
    * @param {string} name - App name
    * @param {string} desc - App description
    * @param {string} owner - App owner
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {requestCallbackWithAppList} callback -
    *        (error:string|undefined, myAppInfoList:appsInfoContent) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And myAppInfoList is my application informaiton list.
    * @return {undefined} 
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
    * @param {requestCallbackWithAppList} callback -
    *        (error:string|undefined, allAppInfoList:appsInfoContent) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And myAppInfoList is all application informaiton list.
    * @return {undefined}
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
    * Get application information using appId.
    *
    * @memberOf AppService
    * @method getAppInfo
    * @param {appId} appId - Application id
    * @param {requestCallbackWithAppInfo} callback -
    *        (error:string|undefined, appInfo:appInfoContent) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And appInfo is application informaiton.
    * @return {undefined}
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
    * @param {appId} appId - Application id
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {appId} appId - Application id
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {appId} appId - Application id
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {appId} appId - Application id
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {appId} appid - Application id
    * @param {boolean} mode - Launch mode. If mode is true then new windows opend using app. 
    *        If false then app is launction in current window
    * @param {string} querystring - Application launch option. This string is added in tartget url.
    * @return {window} - App is launching in current/another browser. return is window object
    */
    Webida.app.launchApp = function launchApp(appid, newWindowFlag, querystring) {
        var addr = appid + '.' + Webida.app.getWebidaHost();

        //Add port information
        if (window.location.port) {
            addr = addr + ':' + window.location.port;
        }

        //Add protocol information
        var url = window.location.protocol + '//' + addr + '/';

        //Add query string
        if (querystring) {
            url = url + querystring;
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
    * @param {string} name - User name
    * @param {string} password - User password
    * @param {requestCallbackWithUserInfo} callback -
    *        (error:string|undefined, userInfo:userInfo) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And userInfo is login user informaiton.
    * @return {undefined}
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
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {string} email - User email
    * @param {string} username - User name
    * @param {string} pwssword - User password
    * @param {string} authphrase - Authorization keyword
    * @param {requestCallbackWithUserInfo} callback -
    *        (error:string|undefined, userInfo:userInfo) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And userInfo is singup user informaiton.
    * @return {undefined}
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
    * @param {string} username - User name
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
    * @param {requestCallbackWithUserInfo} callback -
    *        (error:string|undefined, userInfo:userInfo) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And userInfo is my informaiton.
    * @return {undefined}
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
    * @param {string} name - User name
    * @param {requestCallbackWithUserInfo} callback -
    *        (error:string|undefined, userInfo:userInfo) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And userInfo is user informaiton.
    * @return {undefined}
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
    * @param {requestCallbackWithSecretKey} callback -
    *        (error:string|undefined, key:string) -> undefined
    *        <br>If function finished successfully then err is undefined.
    *        And key is new secret key.
    * @return {undefined}
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
    * @param {string} key - SecretKey
    * @param {requestCallback} callback - 
    *        (error:string|undefined) -> undefined 
    *        <br>If function finished successfully then err is undefined
    * @return {undefined}
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
