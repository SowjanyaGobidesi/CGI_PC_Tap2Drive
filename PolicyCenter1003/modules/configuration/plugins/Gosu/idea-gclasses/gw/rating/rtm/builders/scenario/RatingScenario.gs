package gw.rating.rtm.builders.scenario

uses gw.rating.rtm.builders.RateBookBuilder

uses java.math.BigDecimal
uses java.util.ArrayList
uses java.util.Date
uses java.util.List

@Export
class RatingScenario {

  public static final var PA_TEST_RATE_BOOK_CODE : String = "PA_TEST_RATEBOOK"
  public static final var PA_TEST_RATE_BOOK : String = "PA RateBook For Tests"
  public static final var GX_TEST_RATE_BOOK_CODE : String = "GX_TEST_RATEBOOK"
  public static final var GENERIC_TEST_RATE_BOOK : String = "Generic RateBook For Tests"
  public static final var PA_ENGINE_RATE_BOOK : String = "PA RateBook"
  public static final var DEFAULT_FACTOR_VALUE : BigDecimal = BigDecimal.ONE
  public static final var PA_POLICY_LINE : String = "PersonalAutoLine"

  protected var effectiveDate : Date
  protected var books : List<RateBookBuilder> as BookBuilders = new ArrayList<RateBookBuilder>()

  construct() {
    effectiveDate = Date.Today
  }
  
  construct(defaultRateBookEffectiveDate : Date) {
    effectiveDate = defaultRateBookEffectiveDate
  }
  
  function addActiveBook(code : String) : RateBookBuilder {
    return addBook().active().withBookCode(code).withPolicyLine(PA_POLICY_LINE)
  }

  function addActiveGenericBook(code : String) : RateBookBuilder {
    return addGenericBook().active()
  }
  
  function addActiveBook() : RateBookBuilder {
    return addBook().active()
  }

  function addApprovedBook(code : String) : RateBookBuilder {
    return addBook().approved().withBookCode(code)
  }
  
  function addApprovedBook() : RateBookBuilder {
    return addBook().approved()
  }

  function addStageBook(code : String) : RateBookBuilder {
    return addBook().stage().withBookCode(code)
  }
  
  function addStageBook() : RateBookBuilder {
    return addBook().stage()
  }

  function addDraftBook(code : String) : RateBookBuilder {
    return addBook().withBookCode(code)
  }
  
  function addDraftBook() : RateBookBuilder {
    return addBook()
  }
  
  function addBook() : RateBookBuilder {
    var rateBook =  new RateBookBuilder()
      .effectiveOn(effectiveDate)
      .withLastStatusChangeDate(effectiveDate)
      .withBookCode(PA_TEST_RATE_BOOK_CODE)
      .withBookName(PA_TEST_RATE_BOOK)
      .withStatus(RateBookStatus.TC_DRAFT)
      .withBookEdition("1")
    books.add(rateBook)
    return rateBook
  }

  function addGenericBook() : RateBookBuilder {
    var rateBook =  new RateBookBuilder()
      .effectiveOn(effectiveDate)
      .withLastStatusChangeDate(effectiveDate)
      .withBookCode(GX_TEST_RATE_BOOK_CODE)
      .withBookName(GENERIC_TEST_RATE_BOOK)
      .withStatus(RateBookStatus.TC_DRAFT)
      .withBookEdition("1")
      .withPolicyLine(null)
    books.add(rateBook)
    return rateBook
  }

  function addEditionFromLastAdded(edition : String) : RateBookBuilder {
    var bookToVersion = BookBuilders.last()
    var editionBook = bookToVersion.edition(edition)
    books.add(editionBook)
    return editionBook
  }  

  function createAndCommitBooks() : List<RateBook> {
    var rateBooks = new ArrayList<RateBook>()
    books.each(\ rb -> {
      rateBooks.add(rb.createBook())  
    } )
    return rateBooks
  }  
}
