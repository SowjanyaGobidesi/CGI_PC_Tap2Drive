<%@ params(oneHostName : String, referenceInput: String, draftEditorId: String) %>
<script type="text/javascript">
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }

    document.getElementById('SmartCommsApplication').loadEditor = function() {
        renderDraftEditor: function renderDraftEditor() {
            var editor;
            var authParamsValue;
            var thunderheadServerValue = "<%=oneHostName%>";
            var authUrlValue;
            clientServerValue = location.protocol + '//' + location.host;
            // Initialise Thunderhead API
            Thunderhead = window.Thunderhead || {}, Thunderhead.rmi = Thunderhead.rmi || {}, Thunderhead.rmi.Controller = function() {}, Thunderhead.rmi.Controller.prototype = {
                DEFAULT_TIMEOUT: 1e4,
                config: {
                    container: document.body,
                    visible: !1,
                    remoteProxy: "",
                    commandWindowName: "",
                    remoteWindowName: "",
                    method: "post",
                    thunderheadServer: "",
                    clientServer: ""
                },
                initialized: !1,
                commands: null,
                init: function(e) {
                    if (e && "object" == typeof e) {
                        var t;
                        for (t in e) e.hasOwnProperty(t) && (this.config[t] = e[t])
                    }
                    this.commands = e.commands || {}, this._formBased = !this.isMessagingSupported() || !(e.thunderheadServer || e.clientServer), this._formBased ? this._initFormBased() : (this._expectedMessageOrigin = e.thunderheadServer || e.clientServer, this._initMessagingBased())
                },
                setCommands: function(e) {
                    this.commands = e
                },
                setCommand: function(e, t) {
                    this.commands[e] = t
                },
                isMessagingSupported: function() {
                    return !!window.postMessage
                },
                _initFormBased: function() {
                    this.config.method = "post" === this.config.method || "get" === this.config.method ? this.config.method : "post", this.config.commandFormName = this.config.commandWindowName + "__Form", this._rmiDiv = document.createElement("div");
                    var e = '<div id="thunderheadRMI" style="' + (this.config.visible ? "" : "position:absolute;width:1px;height:1px;top:0px;left:-999px") + '">';
                    e += '\t<iframe name="' + this.config.commandWindowName + '" src="" frameborder="1" width="100%" height="100" tabindex="-1"></iframe>', e += '\t<form id="' + this.config.commandFormName + '" action="' + this.config.remoteProxy + '" method="' + this.config.method + '" target="' + this.config.commandWindowName + '">', e += '\t\t<input type="hidden" name="command" />', e += '\t\t<input type="hidden" name="object" />', e += '\t\t<input type="hidden" name="callback" />', e += '\t\t<input type="hidden" name="windowName" value="' + this.config.remoteWindowName + '" />', e += "\t</form>", e += "</div>", this._rmiDiv.innerHTML = e, this.config.container = document.getElementById(this.config.container) || document.body, null !== this.config.container && (this.config.container.appendChild(this._rmiDiv), this._commandForm = document.getElementById(this.config.commandFormName), this.initialized = !0)
                },
                _initMessagingBased: function() {
                    var e = this;
                    e._messageListener = function(t) {
                        if (t = t || window.event, t.origin === e._expectedMessageOrigin) try {
                            var n = e._decodeJSON(t.data);
                            e.receiveCommand(n.command, n.args, n.callback)
                        } catch (e) {}
                    }, window.addEventListener ? window.addEventListener("message", e._messageListener, !1) : window.attachEvent("onmessage", e._messageListener), this.initialized = !0
                },
                isInitialized: function() {
                    return this.initialized
                },
                isMessagingBased: function() {
                    if (!this.initialized) throw new Error("Thunderhead.RMI is not initialized");
                    return !this._formBased
                },
                destroy: function() {
                    this.initialized === !0 && (this._formBased ? this._rmiDiv.parentNode.removeChild(this._rmiDiv) : window.removeEventListener ? window.removeEventListener("message", this._messageListener, !1) : window.detachEvent("onmessage", this._messageListener), this.initialized = !1, this.commands = {})
                },
                receiveCommand: function(e, t, n) {
                    var i = this;
                    if (!i.initialized) return !1;
                    var o = i.commands[e];
                    if ("[object Function]" === Object.prototype.toString.apply(o)) {
                        var a;
                        i._formBased && i._isString(t) ? (a = i._decodeJSON(t), a.__isPrimitive === !0 && (a = this._isString(a.primitive) ? decodeURIComponent(a.primitive) : a.primitive)) : i._formBased || (a = t), o.call(i.commands, a, function(e) {
                            i._isString(n) && "undefined" !== n && i.sendCommand(n, e)
                        })
                    }
                    return !0
                },
                sendCommand: function(e, t, n, i) {
                    var o = this;
                    if (!o.initialized || o._formBased && null === o._commandForm) return !1;
                    var a = n;
                    if (this._isString(a) || (a = this._storeCallbackCommand(e, n, i)), o._formBased) {
                        var r = o._commandForm;
                        r.elements.command.value = e, this._isPrimitive(t) && (t = {
                            __isPrimitive: !0,
                            primitive: this._isString(t) ? encodeURIComponent(t) : t
                        }), r.elements.object.value = o._encodeJSON(t), r.elements.callback.value = this._isString(a) ? a : "undefined", r.submit()
                    } else {
                        var s, d = this.config.remoteWindowName;
                        s = "" === d ? window.parent : window.frames[d];
                        var m = {
                            command: e,
                            args: t,
                            callback: a
                        };
                        s.postMessage(o._encodeJSON(m), "*")
                    }
                    return !0
                },
                _storeCallbackCommand: function(e, t, n) {
                    if (t) {
                        var i, o = this;
                        do i = e + "_" + this._getUniqueStamp(); while ("undefined" != typeof o.commands[i]);
                        return o.commands[i] = function(e) {
                            delete o.commands[i], t.call(n, !0, e)
                        }, setTimeout(function() {
                            "undefined" != typeof o.commands[i] && (delete o.commands[i], t.call(n, !1))
                        }, this.DEFAULT_TIMEOUT), i
                    }
                },
                _getUniqueStamp: function() {
                    return Math.floor(1048576 * Math.random()).toString()
                },
                _isPrimitive: function(e) {
                    return "number" == typeof e && isFinite(e) || "boolean" == typeof e || "string" == typeof e
                },
                _isString: function(e) {
                    return "string" == typeof e
                },
                _decodeJSON: function(e) {
                    if (0 === e.length) return e;
                    if ("/*" === e.substr(0, 2)) e = e.substring(2, e.length - 2);
                    else {
                        if ("while(1);" !== e.substr(0, 9)) throw new SyntaxError("This JSON data is not protected against JavaScript Hijacks.");
                        e = e.substring(9)
                    }
                    return "undefined" !== e ? JSON.parse(e) : void 0
                },
                _encodeJSON: function(e) {
                    return "while(1);" + JSON.stringify(e)
                }
            }, Thunderhead.RMI = Thunderhead.rmi.Controller, Thunderhead = window.Thunderhead || {}, Thunderhead.DraftEditor = function(e) {
                this.initialize(e)
            }, Thunderhead.DocEditor = Thunderhead.DraftEditor, Thunderhead.DraftEditor.prototype = {
                WINDOW_NAME: "thunderheadDraftEditorWindow",
                DRAFTEDITOR_CONTEXT: "/draft-editor",
                DRAFTEDITOR_PAGE_NAME: "draft-editor.jsp",
                DOCEDITOR_CONTEXT: null,
                _listeners: null,
                EVENTS: {
                    unpostedCommentFound: function() {},
                    dirty: function(e) {},
                    commentsDirty: function() {},
                    editingAttempted: function() {},
                    save: function() {},
                    sessionExpired: function() {},
                    signatureChanged: function(e) {},
                    windowError: function(e) {}
                },
                initialize: function(e) {
                    if (e = e || {}, this.DRAFTEDITOR_CONTEXT = this.DOCEDITOR_CONTEXT || this.DRAFTEDITOR_CONTEXT, this._listeners = {}, this._thunderheadServer = e.thunderheadServer, this._thunderheadServerDomain = this._thunderheadServer ? this._thunderheadServer : "", e.isLocal = this._local = !e.clientServer, e.isLocal) Thunderhead.DraftEditorRMI.setCommands(this._getClientCommands(e)), this.initialized = !0;
                    else {
                        if (!e.thunderheadServer) throw new Error('Draft-Editor configuration is missing the "thunderheadServer" parameter. This parameter is required when the "clientServer" parameter is provided.');
                        var t = e.thunderheadServer;
                        if (Thunderhead.DraftEditorRMI.init({
                                container: document.body,
                                remoteWindowName: this.WINDOW_NAME,
                                commandWindowName: "thunderheadRMICommandForm",
                                thunderheadServer: t,
                                commands: this._getClientCommands(e)
                            }), this.initialized = Thunderhead.DraftEditorRMI.isInitialized(), !this.initialized) throw new Error("Could not initialize RMI framework.")
                    }
                    this._createApplicationWindow(e), e.navigateAwayWarning && this.addListener("dirty", function(t) {
                        t ? window.onbeforeunload = function() {
                            return e.navigateAwayWarning
                        } : window.onbeforeunload = null
                    }, this)
                },
                destroy: function() {
                    Thunderhead.DraftEditorRMI.destroy();
                    var e = document.getElementById(this.WINDOW_NAME);
                    e && (e.src = "about:blank", e.parentNode.removeChild(e))
                },
                _getClientCommands: function(e) {
                    var t = this;
                    return {
                        onReady: function() {
                            e.onReady && e.onReady()
                        },
                        loadStartupConfig: function(t, n) {
                            e.loadStartupConfig && n(e.loadStartupConfig())
                        },
                        fireEvent: function(e, n) {
                            var i = t._listeners[e.eventName];
                            if (i) {
                                var o, a;
                                for (o = 0, a = i.length; o < a; o++)
                                    if (i[o](e.params) === !1) return
                            }
                        }
                    }
                },
                _createApplicationWindow: function(e) {
                    this._canUseAPI();
                    var t;
                    if (e.hasOwnProperty("targetElementID")) {
                        if (t = document.getElementById(e.targetElementID), !t) throw new Error('Cannot find element with ID "' + e.targetElementID + '"');
                        delete e.targetElementID
                    } else t = document.body;
                    var n = document.createElement("iframe");
                    n.setAttribute("name", this.WINDOW_NAME), n.setAttribute("id", this.WINDOW_NAME), n.setAttribute("frameborder", 0), n.setAttribute("width", "100%"), n.setAttribute("height", "100%");
                    var i = "";
                    e.debugMode === !0 && (i = "debug=true&"), e.disableForceAuth === !0 && (i += "disableForceAuth=true&"), e.disableViewportLoadMask && (i += "disableViewportLoadMask=true&"), i += e.isLocal ? "isLocal=true" : "clientServer=" + encodeURIComponent(e.clientServer);
                    var o = e.loadStartupConfig ? e.loadStartupConfig() : null;
                    o && o.webServiceRoot && 0 === o.webServiceRoot.indexOf("/thunderhead-doceditor-rest") && (i += "&legacy=true&webServiceRoot=" + encodeURIComponent(o.webServiceRoot), o.authCredentials && (i += "&authCredentials=" + encodeURIComponent(o.authCredentials)));
                    var a = this._thunderheadServerDomain + this.DRAFTEDITOR_CONTEXT + "/" + this.DRAFTEDITOR_PAGE_NAME + "?" + i + (Thunderhead.isTopFrameSameDomain ? "&internal=true" : "");
                    e.authUrl && e.authParams ? n.setAttribute("src", e.authUrl + "?state=" + encodeURIComponent(a) + "&" + e.authParams) : n.setAttribute("src", a), t.appendChild(n)
                },
                isInitialized: function() {
                    return this.initialized === !0
                },
                setTimeout: function(e) {
                    e > 100 && (Thunderhead.DraftEditorRMI.DEFAULT_TIMEOUT = e)
                },
                addListener: function(e, t, n) {
                    this._listeners[e] || (this._listeners[e] = []), n = n || this, this._listeners[e].push(function() {
                        return t.apply(n, arguments)
                    })
                },
                _getSerializedReviewCaseFromURL: function(e, t) {
                    var n = this,
                        i = n.getXMLHttpRequest();
                    i.open("GET", e, !0), i.onreadystatechange = function() {
                        4 === i.readyState && 200 === i.status ? n._processSerializedReviewCaseResponse(i.responseXML, t) : 4 === i.readyState && 404 === i.status && t()
                    }, i.send()
                },
                _processSerializedReviewCaseResponse: function(e, t) {
                    if (e && "review-case" === e.documentElement.tagName) {
                        var n = e.outerXML || e.xml;
                        n ? t(n) : window.XMLSerializer && t((new XMLSerializer).serializeToString(e))
                    } else t()
                },
                loadURL: function(e, t, n, i) {
                    var o = this;
                    this._local ? this._sendCommand("loadURL", {
                        url: e,
                        openInPreview: t
                    }, n, i) : this._getSerializedReviewCaseFromURL(e, function(e) {
                        e ? o.loadString(e, t, n, i) : n && n.call(i || window, !0, !1)
                    })
                },
                loadURLInProjectScope: function(e, t, n, i, o) {
                    var a = this;
                    this._local ? this._sendCommand("loadURL", {
                        url: e,
                        openInPreview: t,
                        projectId: n
                    }, i, o) : this._getSerializedReviewCaseFromURL(e, function(e) {
                        e ? a.loadStringInProjectScope(e, t, n, i, o) : i && i.call(o || window, !0, !1)
                    })
                },
                loadString: function(e, t, n, i) {
                    this._sendCommand("loadString", {
                        reviewCase: e,
                        openInPreview: t
                    }, n, i)
                },
                loadStringInProjectScope: function(e, t, n, i, o) {
                    this._sendCommand("loadString", {
                        reviewCase: e,
                        openInPreview: t,
                        projectId: n
                    }, i, o)
                },
                saveURL: function(e, t, n) {
                    var i = this;
                    this._local ? this._sendCommand("saveURL", e, t, n) : this.getString(function(o, a) {
                        o && i._sendRequest("POST", e, a, function(e, i) {
                            t.call(n || window, !0, 200 === e, i)
                        })
                    })
                },
                saveURLWithoutValidation: function(e, t, n) {
                    var i = this;
                    this._local ? this._sendCommand("saveURLWithoutValidation", e, t, n) : this.getStringWithoutValidation(function(o, a) {
                        o && i._sendRequest("POST", e, a, function(e, i) {
                            t.call(n || window, !0, 200 === e, i)
                        })
                    })
                },
                compareDraftTML: function(e, t, n, i, o) {
                    this._sendCommand("compareDraftTML", {
                        sourceTML: e,
                        destinationTML: t,
                        options: n
                    }, i, o)
                },
                compareDraftURLs: function(e, t, n, i, o) {
                    var a = this;
                    this._local ? this._sendCommand("compareDraftURLs", {
                        sourceURL: e,
                        destinationURL: t,
                        options: n
                    }, i, o) : this._getSerializedReviewCaseFromURL(e, function(e) {
                        e ? a._getSerializedReviewCaseFromURL(t, function(t) {
                            t ? a._sendCommand("compareDraftTML", {
                                sourceTML: e,
                                destinationTML: t,
                                options: n
                            }, i, o) : i && i.call(o || window, !0, !1)
                        }) : i && i.call(o || window, !0, !1)
                    })
                },
                keepAllDifferences: function(e, t) {
                    this._sendCommand("keepAllDifferences", {}, e, t)
                },
                getXMLHttpRequest: function() {
                    return window.XMLHttpRequest ? new XMLHttpRequest : this._getMicrosoftXMLDOM()
                },
                _sendRequest: function(e, t, n, i) {
                    var o = this.getXMLHttpRequest();
                    o.onreadystatechange = function() {
                        4 === o.readyState && 200 === o.status && i(o.status, o.responseXML)
                    }, o.open(e, t, !0), o.setRequestHeader("Content-Type", "application/xml; charset=utf-8"), o.send(n)
                },
                _getMicrosoftXMLDOM: function() {
                    var e, t, n = ["Microsoft.XMLDOM", "Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.3.0"];
                    for (t = 0; t < n.length; t++) try {
                        e = new ActiveXObject(n[t]), e.async = !0, e.preserveWhiteSpace = !0;
                        break
                    } catch (e) {}
                    return e
                },
                getString: function(e, t) {
                    this._sendCommand("getString", {
                        forceSave: !1
                    }, e, t)
                },
                getStringWithoutValidation: function(e, t) {
                    this._sendCommand("getString", {
                        forceSave: !0
                    }, e, t)
                },
                clearDirtyState: function(e, t) {
                    this._sendCommand("clearDirtyState", {}, e, t)
                },
                setReadOnly: function(e, t) {
                    this._sendCommand("setReadOnly", {}, e, t)
                },
                setEditMode: function(e, t, n) {
                    var i;
                    e && "[object String]" === Object.prototype.toString.apply(e) ? i = {
                        mode: e
                    } : e && (i = {
                        mode: e.mode,
                        config: e
                    }), this._sendCommand("setEditMode", i, t, n)
                },
                setAllowPublicComments: function(e, t, n) {
                    this._sendCommand("setAllowPublicComments", e, t, n)
                },
                setCustomReadOnly: function(e, t, n) {
                    this._sendCommand("setCustomReadOnly", e, t, n)
                },
                openHelp: function(e, t) {
                    this._sendCommand("openHelp", {}, e, t)
                },
                getRemainingSignaturesCount: function(e, t) {
                    this._sendCommand("getRemainingSignaturesCount", {}, e, t)
                },
                isShowTrackChanges: function(e, t) {
                    this._sendCommand("isShowTrackChanges", {}, e, t)
                },
                setShowTrackChanges: function(e, t, n) {
                    this._sendCommand("setShowTrackChanges", e, t, n)
                },
                refreshTasks: function(e, t) {
                    this._sendCommand("refreshTasks", {}, e, t)
                },
                refreshReviewComments: function(e, t) {
                    this._sendCommand("refreshReviewComments", {}, e, t)
                },
                activate: function(e, t, n) {
                    this._sendCommand("activate", {
                        resetCaret: e
                    }, t, n)
                },
                deactivate: function(e, t) {
                    this._sendCommand("deactivate", {}, e, t)
                },
                deactivateAndPreventBlur: function(e, t) {
                    this._sendCommand("deactivateAndPreventBlur", {}, e, t)
                },
                getAuditXML: function(e, t, n) {
                    this._sendCommand("getAuditXML", e, t, n)
                },
                setSessionId: function(e, t, n) {
                    this._sendCommand("setSessionId", e, t, n)
                },
                setViewState: function(e, t, n, i) {
                    this._sendCommand("setViewState", {
                        view: e,
                        visible: t
                    }, n, i)
                },
                openSidePanelTab: function(e, t, n) {
                    console.log("DraftEditor#openSidePanelTab is no longer supported")
                },
                setSidePanelTabs: function(e, t, n) {
                    console.log("DraftEditor#setSidePanelTabs is no longer supported")
                },
                setChoiceListVisibility: function(e, t, n) {
                    console.log("DraftEditor#setChoiceListVisibility is no longer supported")
                },
                reserveColour: function(e, t, n, i) {
                    this._sendCommand("reserveColour", {
                        tag: e,
                        colour: t
                    }, n, i)
                },
                showPreviousTrackChangesInSoC: function(e, t) {
                    this._sendCommand("setPreviousTrackChangesVisibilityInSoC", {
                        visible: !0,
                        lastPreviousSessionId: null
                    }, e, t)
                },
                hidePreviousTrackChangesInSoC: function(e, t, n) {
                    this._sendCommand("setPreviousTrackChangesVisibilityInSoC", {
                        visible: !1,
                        lastPreviousSessionId: e
                    }, t, n)
                },
                setCollaborationDocumentVersionId: function(e, t, n) {
                    this._sendCommand("setCollaborationDocumentVersionId", e, t, n)
                },
                navigateToContent: function(e, t, n, i) {
                    this._sendCommand("navigateToContent", {
                        modelPosition: e,
                        reviewChannelId: t
                    }, n, i)
                },
                navigateToComment: function(e, t, n, i) {
                    this._sendCommand("navigateToComment", {
                        commentId: e,
                        reviewChannelId: t
                    }, n, i)
                },
                startAnalyticsCollection: function(e, t) {
                    this._sendCommand("startAnalyticsCollection", {}, e, t)
                },
                stopAnalyticsCollection: function(e, t) {
                    this._sendCommand("stopAnalyticsCollection", {}, e, t)
                },
                getAnalytics: function(e, t) {
                    this._sendCommand("getAnalytics", {}, e, t)
                },
                setWebServiceRoot: function(e, t, n) {
                    this._sendCommand("setWebServiceRoot", e, t, n)
                },
                setServiceExceptionHandler: function(e, t, n) {
                    Thunderhead.DraftEditorRMI.setCommand("serviceExceptionHandler", function(t, n) {
                        n(e(t))
                    }), this._sendCommand("setServiceExceptionHandler", "serviceExceptionHandler", t, n)
                },
                setDefaultFolder: function(e, t, n) {
                    this._sendCommand("setDefaultFolder", e, t, n)
                },
                _sendCommand: function(e, t, n, i) {
                    if (i = i || this, this._local) {
                        var o = window.frames[this.WINDOW_NAME].Thunderhead.DraftEditorRMI.commands;
                        o[e].call(o, t, function(e) {
                            n && n.call(i, !0, e)
                        })
                    } else Thunderhead.DraftEditorRMI.sendCommand(e, t, n, i)
                },
                _canUseAPI: function() {
                    if (!this.isInitialized()) throw new Error("API not initialized.")
                }
            }, Thunderhead.DraftEditorRMI = new Thunderhead.RMI({});
            var LoadStartUpConfig_v1 = {},
                LoadStartUpConfig_v2 = {};

            Thunderhead.DraftEditor.prototype.DRAFTEDITOR_CONTEXT = '/one/draft-editor';
            editor = new Thunderhead.DraftEditor({

                // The protocol (http/https), Thunderhead Server host, & port if not 80/443
                thunderheadServer: thunderheadServerValue,
                // The protocol (http/https), Client Server host, & port if not 80/443 - used to validate origin of API messages
                clientServer: clientServerValue,
                // See HTML below, this div will contain the Thunderhead Application iFrame
                targetElementID: 'SmartCommsApplication',
                // URL to be opened before opening Draft Editor - for authentication purposes
                authUrl: authUrlValue,
                authParams: authParamsValue,
                //disable force auth whilst using the bundled version
                disableForceAuth: true,
                // A function to be executed once the Draft-Editor is loaded, for example:  Can be used to execute API calls on start-up
                onReady: function() {
                    if (loadFromURL) {
                        editor.loadURL(
                            document.getElementById('draftlocationURI').value.trim(),
                            false
                        );
                    } else {
                         var editorContent = gw.api.Util.getValue('<%=referenceInput%>')
                         editor.loadString(editorContent, false);
                    }

                },
                // Will be called to retrieve configuration for the Draft-Editor
                loadStartupConfig: function() {
                    return {
                        version: '2',
                        // Forces the preview format (default is job default)
                        // Options: DEFAULT, POSTSCRIPT, PDF, PCL, XML, AFP, TIFF
                        //forcePreviewFormat: 'PDF',
                        // Override to force the Show Choices button to be either toggled on (true) or toggled off (false)
                        // The default (ie, removing this setting) checks if the document has optional paragraphs, and will toggle the Show Choices button accordingly.
                        //forceToggleShowChoices: true,
                        // Side panel configuration
                        sidePanel: {
                            // The location of the side panel left or right (defaults to right)
                            //location: 'right',
                            // List of tabs that should be shown, for default do not specify this option
                            //tabs: ['Data Values', 'Documents'],
                            // The tab that should be open on starting the application, if not specified will use default ('Documents')
                            //open: 'Documents',
                            // The width of the side panel (defaults to 500)
                            //width: 500,
                            // The minimum expandable width of the side panel (defaults to 200) - beware: setting this larger than the width defaults this to the width setting
                            //minWidth: 200,
                            // The maximum expandable width of the side panel (defaults to 700) - beware: setting this smaller than the width defaults this to the width setting
                            //maxWidth: 700
                        },
                        // Disabling the "Save" button because the document is saved on the "Create Document" button
                        features: {
                            disabled: ['Save']
                        }
                        // Explicit tool configuration, can specify "enabled" or a "disabled" list.
                        // For default toolbar configuration do not specify this option.
                        //tools: {
                        //enabled: 'Undo', 'Redo', 'Bold', 'Italic', 'Spelling And Grammar Check']
                        //}
                        // Places the cursor at the first edit point in the document (Optional, defaults to true).
                        //focusOnFirstEditPoint: true,
                        // Load the Draft in a read-only state
                        //readOnly: true
                    };
                }
            });
            document.getElementById('SmartCommsApplication').<%=draftEditorId%> = editor
            return true;
        };
        resizeApplicationDIV: function resizeApplicationDIV() {
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var contentHeight = viewportHeight - draftEditorWindowEl.offsetTop;
            draftEditorWindowEl.style.height = contentHeight + 'px';
        };
        loadReviewcaseURI: function loadReviewcaseURI() {
            loadFromURL = true;
            loadDraftEditor();
        };
        loadReviewcaseStr: function loadReviewcaseStr() {
            loadFromURL = false;
            loadDraftEditor();
        };
        loadDraftEditor: function loadDraftEditor() {
            draftEditorWindowEl = document.getElementById('SmartCommsApplication');
            if (renderDraftEditor()) {
                resizeApplicationDIV();
                window.onresize = resizeApplicationDIV;
            }
        };

        loadReviewcaseStr();
    }
</script>