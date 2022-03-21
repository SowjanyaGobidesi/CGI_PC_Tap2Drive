package gw.api.web.desktop.data

uses gw.api.web.desktop.data.otherworkorders.OtherWorkOrdersDTO
uses gw.api.web.desktop.data.renewal.RenewalDTO
uses gw.api.web.desktop.data.submission.SubmissionDTO
uses typekey.Job

@Export
class JobTypeConversionHelper {

  static function from(job : entity.Job) : String {
    if (job typeis Submission) {
      return SubmissionDTO.from(job).writeAsJSONString()
    } else if (job typeis Issuance) {
      return SubmissionDTO.from(job).writeAsJSONString()
    } else if (job typeis Renewal) {
      return RenewalDTO.from(job).writeAsJSONString()
    } else if (Job.TF_OTHERWORKORDERS.TypeKeys.contains(job.Subtype)) {
      return OtherWorkOrdersDTO.from(job).writeAsJSONString()
    }

    throw new RuntimeException("Not supported job type: " + typeof job)
  }

  static function fromCollection(collectionJson : String, jobType : Job) : List<DesktopDataDTO> {
    if (jobType == Job.TC_SUBMISSION) {
      return SubmissionDTO.fromCollection(collectionJson)
    } else if (jobType == Job.TC_RENEWAL) {
      return RenewalDTO.fromCollection(collectionJson)
    } else if (Job.TF_OTHERWORKORDERS.TypeKeys.contains(jobType)) {
      return OtherWorkOrdersDTO.fromCollection(collectionJson)
    }
    throw new RuntimeException("Not supported job type: " + jobType)
  }

  static function fromOtherJob(collectionJson : String) : List<DesktopDataDTO> {
    return OtherWorkOrdersDTO.fromCollection(collectionJson)
  }
}