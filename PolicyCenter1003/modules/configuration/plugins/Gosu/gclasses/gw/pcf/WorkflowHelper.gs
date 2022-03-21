package gw.pcf

uses gw.entity.IEntityType

@Export
class WorkflowHelper {

 /**
  * Gets the immediate workflow subtype that is used as mode to display the Modal section in WorkflowUI -
  * WorkflowSearch, WorkflowDetailDV and WorkflowDV.
  * 
  * @return the immediate subtype of Workflow entity that is assignable by the selected workflow type.
  */
  public static function getWorkflowSubtype(workflow : typekey.Workflow) : String {
    if(workflow == null)
      return "default";
    // get the type of the workflow 
    var wfType = gw.lang.reflect.TypeSystem.getByRelativeName(workflow.UnlocalizedName)
    return (entity.Workflow.Type as IEntityType).ImmediateSubtypes.firstWhere(\ t -> gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(t, wfType)).RelativeName
  } 

}
