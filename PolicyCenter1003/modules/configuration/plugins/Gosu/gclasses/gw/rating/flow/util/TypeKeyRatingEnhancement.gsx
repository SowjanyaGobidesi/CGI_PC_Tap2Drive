package gw.rating.flow.util

uses java.util.Collection

enhancement TypeKeyRatingEnhancement: gw.entity.TypeKey {
  reified function isOneOf<K extends gw.entity.TypeKey>(c : Collection<K>) : boolean {
    return (K == typeof this) ? c.contains(this) : false
  }

  reified function isNotOneOf<K extends gw.entity.TypeKey>(c : Collection<K>) : boolean {
    return not isOneOf(c)
  }

  reified function isOneOf<K extends gw.entity.TypeKey>(value : K) : boolean {
    return (K == typeof this) ? this == value : false
  }

  reified function isNotOneOf<K extends gw.entity.TypeKey>(value : K) : boolean {
    return not isOneOf(value)
  }
}
