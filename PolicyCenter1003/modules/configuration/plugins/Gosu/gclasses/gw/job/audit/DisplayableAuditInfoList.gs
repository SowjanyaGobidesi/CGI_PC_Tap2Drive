package gw.job.audit

uses java.util.ArrayList

@Export
class DisplayableAuditInfoList {

  private var _infoList : DisplayableAuditInfo[] as readonly InfoList
  
  construct(infos : AuditInformation[]) {
    buildList(infos)
  }
  
  private function buildList(infos : AuditInformation[]) {
    var tempList = new ArrayList<DisplayableAuditInfo>()
    infos.each(\ info -> tempList.add(new DisplayableAuditInfo(info)))
    _infoList = tempList
          .orderBy(\ d -> d.EndDate)
          .thenBy(\ d -> d.ActualInfo.AuditScheduleType)
          .thenBy(\ d -> d.ActualInfo.BasedOnIfReversal.CreateTime)
          .thenBy(\ d -> d.StatusPriority)
      .toTypedArray()
  }
}
