package gw.lob.pa

enhancement PAUMBICovEnhancement : productmodel.PAUMBICov {
  property get StateMinPackage() : java.util.Map<Jurisdiction, String> {
    return  {
      TC_OR -> "25/50", TC_MT -> "25/50", TC_MO -> "25/50", TC_MN -> "25/50", TC_KS -> "25/50",
      TC_MA -> "20/40",
      TC_UT -> "10/20",
      TC_VA -> "50/100",
      TC_AK -> "50/100",
      TC_CO -> "20/50",
      TC_ME -> "50/100",
      TC_NC -> "30/60",
      TC_VT -> "50/100"
    }
  }
}
