package gw.rating.worksheet.export

uses com.google.common.base.Preconditions
uses com.google.common.collect.ImmutableMap
uses com.google.common.collect.ImmutableSet
uses entity.PolicyLine

@Export
public final class WorksheetExporter {
  public static final var FORMAT_HTML: String = "html"
  public static final var FORMAT_CSV: String  = "csv"

  public static final var FORMAT_TO_MIME_TYPE: Map<String, String> = ImmutableMap.copyOf({
      FORMAT_HTML -> "text/html; charset=UTF-8",
      FORMAT_CSV  -> "text/csv; charset=UTF-8"
  })

  public static final var KNOWN_FORMATS: Set<String> = ImmutableSet<String>.copyOf(FORMAT_TO_MIME_TYPE.Keys)

  static final var EXPORTERS : Map<String, block(PolicyLine, boolean) : String> = ImmutableMap.copyOf<String, block(PolicyLine, boolean) : String>({
      FORMAT_HTML->\policyLine : PolicyLine, showConditionals : boolean ->
          new WorksheetTreeExporterBase(policyLine, showConditionals, FORMAT_HTML, new WorksheetTreeHTMLExporter()).export(),
      FORMAT_CSV->\policyLine : PolicyLine, showConditionals : boolean ->
          new WorksheetTreeExporterBase(policyLine, showConditionals, FORMAT_CSV, new WorksheetTreeCSVExporter()).export()
  })

  static final var FORMAT_TO_FILE_EXTENSION: Map<String, String> = ImmutableMap.copyOf<String, String>({
      FORMAT_HTML -> ".html",
      FORMAT_CSV  -> ".csv"
  })

  private construct() {
  }

  /**
   * Exports worksheet(s) aasociated with a quote to specified format. The lists of known formats is {@link #KNOWN_FORMATS}.
   *
   * @param policyLine the policy line
   * @param showConditionals whether conditionals are displayed or not
   * @param format export format
   *
   * @return path to temporary file containing the exported worksheet(s)
   */
  public static function export(policyLine: PolicyLine, showConditionals: boolean, format: String): String {
    Preconditions.checkNotNull(policyLine, "Policy line may not be null.")
    Preconditions.checkNotNull(format, "Export format may not be null.")
    Preconditions.checkArgument(KNOWN_FORMATS.contains(format), "Unknown format '${format}'. Must be one of ${KNOWN_FORMATS.join(", ")}")

    return EXPORTERS.get(format)(policyLine, showConditionals)
  }

  /**
   * Generates standard filename for downloading the exported worksheet(s). The format is:<br>
   * <code>policyLine.Branch.Submission.JobNumber</code>.{html|xml|csv} if <code>showConditionals</code> is
   * <code>false</code>, and <code>policyLine.Branch.Submission.JobNumber (with conditionals)</code>.{html|xml|csv} if
   * <code>showConditionals</code>> is <code>true</code>
   *
   * @param policyLine the policy line
   * @param showConditionals whether conditionals are displayed or not
   *
   * @return name of the download file
   */
  public static function getFilenameForDownload(policyLine: PolicyLine, showConditionals: boolean, format: String): String {
    Preconditions.checkNotNull(policyLine, "Policy line may not be null.")
    Preconditions.checkNotNull(format, "Export format may not be null.")
    Preconditions.checkArgument(KNOWN_FORMATS.contains(format), "Unknown format '${format}'. Must be one of ${KNOWN_FORMATS.join(", ")}")

    var filenameBuilder = new StringBuilder("${policyLine.Branch.Submission.JobNumber} Ratings Worksheet")
    if (showConditionals) {
      filenameBuilder.append(" (with conditionals)")
    }
    filenameBuilder.append('.').append(WorksheetExporter.FORMAT_TO_FILE_EXTENSION.get(format))
    return filenameBuilder.toString()
  }
}