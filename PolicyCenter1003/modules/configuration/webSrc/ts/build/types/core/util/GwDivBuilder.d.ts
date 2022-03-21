import { GwDomNode, GwDomNodeList, GwMap } from "../../types/gwTypes";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwDivBuilder {
    private _classes;
    private _attr;
    private _styles;
    private _children;
    private _label;
    static create(): GwDivBuilder;
    static withClassArr(classes: string[]): GwDivBuilder;
    static withClasses(...classes: string[]): GwDivBuilder;
    static withId(id: string): GwDivBuilder;
    static withChildren(...children: GwDomNode[]): GwDivBuilder;
    static withChildArr(children: GwDomNode[]): GwDivBuilder;
    static withLabel(text: string): GwDivBuilder;
    static withAttrMap(attr: GwMap): GwDivBuilder;
    static withAttr(...attrKeyThenValue: string[]): GwDivBuilder;
    withId(id: string): this;
    withClasses(...classes: string[]): this;
    withClassArr(classes: string[]): this;
    withAttrMap(attr: GwMap): this;
    withAttr(...attrKeyThenValue: string[]): this;
    withStyleMap(styles: GwMap): this;
    withStyles(...stylesKeyThenValue: string[]): this;
    withChildArr(children: GwDomNodeList): this;
    withChildren(...children: GwDomNode[]): this;
    withLabel(text: string): this;
    build(): HTMLDivElement;
}
