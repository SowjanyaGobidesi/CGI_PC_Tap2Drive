package gw.note

@Export
class NoteDisplayData {
  var _type: Object as readonly Type
  var _typeName: String as readonly TypeName
  var _typeValue: String as readonly TypeValue
  var _displayString: String as readonly DisplayString

  construct(type: Object, typeName: String, typeValue: String, displayString: String) {
    _type = type
    _typeName = typeName
    _typeValue = typeValue
    _displayString = displayString
  }
}
