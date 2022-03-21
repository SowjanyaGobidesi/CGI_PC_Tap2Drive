package gw.beantransfer

uses gw.api.beantransfer.BeanTransferContent
uses gw.api.importing.XmlExporter

/**
 * This class is responsible for exporting BeanTransfer content (beans) to an XML.
 */
@Export
class BeanTransferXmlExporter {

  var _xmlExporter: XmlExporter
  var _beanTransferContent : BeanTransferContent
  var _beanExportHandlers : List<BeanExportHandler> = {}

  construct(xmlExporter : XmlExporter, beanExportHandlers : List<BeanExportHandler>,
      beanTransferContent : BeanTransferContent) {
    _xmlExporter = xmlExporter
    _beanExportHandlers.addAll(beanExportHandlers)
    _beanTransferContent = beanTransferContent
  }

  function exportAllBeans() {
    exportBeans(_beanTransferContent.EffDatedContainers)
    exportBeans(_beanTransferContent.EffDatedBranches)
    exportBeans(_beanTransferContent.EffDateds)
    exportBeans(_beanTransferContent.NonEffDatedRelatedBeans)
  }

  protected function exportBeans(beans : List<KeyableBean>) {
    beans.each(\bean -> {
      // Process all the non-referenced entity beans.
      var processedBean = processBean(bean)
      if (processedBean != null) {
        _xmlExporter.createElement(processedBean)
      }
    })
  }

  protected function processBean(bean : KeyableBean) : KeyableBean {
    var processedBean = bean
    for (beanHandler in _beanExportHandlers) {
      processedBean = beanHandler.handleBeanExport(processedBean)
      // As soon as one of the BeanTransferHandler#handleBeanExport(KeyableBean) calls returns null,
      // don't export that bean.
      if (processedBean == null) {
        break
      }
    }
    return processedBean
  }
}