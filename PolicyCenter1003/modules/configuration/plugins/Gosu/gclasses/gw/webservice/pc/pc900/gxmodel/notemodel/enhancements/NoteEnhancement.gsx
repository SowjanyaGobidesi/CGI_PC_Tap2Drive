package gw.webservice.pc.pc900.gxmodel.notemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement NoteEnhancement : gw.webservice.pc.pc900.gxmodel.notemodel.Note {
  public static function create(object : entity.Note) : gw.webservice.pc.pc900.gxmodel.notemodel.Note {
    return new gw.webservice.pc.pc900.gxmodel.notemodel.Note(object)
  }

  public static function create(object : entity.Note, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.notemodel.Note {
    return new gw.webservice.pc.pc900.gxmodel.notemodel.Note(object, options)
  }

}