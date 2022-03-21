import { GwRegisteredSystem } from "../util/GwRegisteredSystem";
import { GwAriaRole } from "./GwAriaRole";
import { GwDomNode, GwDomNodeList } from "../../types/gwTypes";
import { GwAriaPropertiesAndState, GwAriaProperty, GwAriaRelationshipPropertiesAndState } from "./GwAriaPropertiesAndState";
export declare class GwAria extends GwRegisteredSystem {
    getSystemName(): string;
    addRoleAttributeToElement(role: GwAriaRole, domEl: GwDomNode): void;
    addAriaPropertyToElement<T extends GwAriaProperty>(property: T, value: GwAriaPropertiesAndState[T], domEl: GwDomNode): void;
    getAriaAttributeAndValue<T extends GwAriaProperty>(property: T, value: GwAriaPropertiesAndState[T]): {
        attribute: string;
        value: string;
    };
    addAriaPropertyWithReferencesToElement<T extends keyof GwAriaRelationshipPropertiesAndState>(property: T, ownerEl: GwDomNode, elementsWithId: GwDomNodeList): void;
}
export declare const gwAria: GwAria;
