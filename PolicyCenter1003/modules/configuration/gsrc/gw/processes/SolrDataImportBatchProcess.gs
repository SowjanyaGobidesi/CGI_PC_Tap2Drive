package gw.processes;

uses java.lang.Integer
uses java.io.File

uses gw.api.config.PCConfigResourceKeys
uses gw.api.locale.DisplayKey
uses gw.api.system.DatabaseDependenciesGateway
uses gw.api.system.PLDependenciesGateway
uses gw.util.concurrent.LockingLazyVar
uses gw.solr.GWSolrBatchLoader

@Export
public class SolrDataImportBatchProcess extends BatchProcessBase {

  private static final var docType = "policy"

  public static final var messageDestID:LockingLazyVar<Integer> = new LockingLazyVar<Integer>() {
    override public function init() : Integer {
      var destId:Integer = null;
      for (var destinationConfig in PLDependenciesGateway.getMessagingConfiguration().getDestinations()) {
        if (DisplayKey.get("Java.MessageDestination.SolrMessageTransport.Policy.Name").equalsIgnoreCase(destinationConfig.getName())) {
          destId = destinationConfig.getDestID();
          break;
        }
      }
      return destId;
    };
  };

  construct() {
    super(BatchProcessType.TC_SOLRDATAIMPORT);
  }

  override function doWork() {
    var fileName = "${docType}${File.separator}${ConfigFile}"
    GWSolrBatchLoader.performSolrFullImport(PCConfigResourceKeys.SOLR_DOC_CONFIG_DIR.Dir.getFile(fileName).AbsolutePath, messageDestID.get())
  }

  private property get ConfigFile(): String {
    var dbType = DatabaseDependenciesGateway.getDatabaseConfiguration().getDBType().toString().toLowerCase()
    return "batchload-config-${dbType}.xml"
  }

  override property get Exclusive() : boolean {
    return true
  }

  override function requestTermination() : boolean {
    return false
  }
}
