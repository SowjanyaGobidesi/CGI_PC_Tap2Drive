<%@ params(referenceInput: String, draftDocument: DraftDocument, finalizeAction: String) %>
<%
   var oneHostName = gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider.Configuration.Hostname
   var draftId = draftDocument.ID.toString().replace("-", "");
   var draftEditorId = 'editor' + draftId
%>
<div id="draftEditor" style="overflow:auto;height:1000px;width:1200px">
    <!--SmartComms DraftEditor Script-->
    <%=SmartCommsDraftEditor.renderToString(oneHostName, referenceInput, draftEditorId)%>
    <input type='hidden' id='editorId' value='<%=draftId%>' />
    <script type="text/javascript">
        var autoSaveInterval = 60000; // 1 minute
        var submitInputId = '<%=finalizeAction%>';
        var draftContentId = '<%=referenceInput%>';
        var draftId = '<%=draftId%>';

        document.getElementById('SmartCommsApplication').loadEditor();

        function finalizeDocument() {
            saveDraft(true);
        }

        var autoSave = setInterval(function() {
            saveDraft(false);
          }, autoSaveInterval);

        function saveDraft(finish) {
            try {
               var app = document.getElementById('SmartCommsApplication');
               if (app == null) {
                    // Editor is gone.
                    clearInterval(autoSave);
                    return;
               }
               app.<%=draftEditorId%>.getString(function(success, draftDocument) {
                    if (typeof draftDocument !== 'string') {
                        console.warn('failed to get draft content', draftDocument);
                        return;
                    }
                    var editorId = document.getElementById('editorId').value;
                    if (editorId != draftId) {
                        console.warn('wrong editor', editorId, draftId);
                        return;
                    }
                    if (finish) {
                       clearInterval(autoSave);
                       var retry = setInterval(function(){
                             var v = gw.api.Util.getValue(submitInputId);
                             if (typeof v === 'undefined') {
                                // Previous submit attempt succeeded.
                                clearInterval(retry);
                                return;
                             }
                             // This might fail if draft doc content is still transferred.
                             gw.api.Util.setValue(submitInputId, new Date().getTime());
                           }, 100);
                    }
                    // This must be the last action as it might prevent setInterval
                    // for reasons beound my imagination.
                    gw.api.Util.setValue(draftContentId, draftDocument);
                });
            } catch (err) {
                console.error(err);
            }
        }

    </script>
    <div id="SmartCommsApplication"/>
</div>