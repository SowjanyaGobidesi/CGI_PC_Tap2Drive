import { GwTypedMap, GwValueAndCursorPos } from "../../types/gwTypes";
/**
 * Static class used to replace characters stored in mapDefaultSpecialChars to their corresponding values.
 * This is primary used to replace word-processing special characters like ¾ with 3/4
 * The preference replaceWordProcessingCharacters when set to true causes gwEvents.onGlobalInputEvent to run: GwCharReplacer.replace on all input
 *
 * Mappings can be modified via GwCharReplacer.setCharacterMapping and GwCharReplacer.removeCharacterMapping
 * @link TestGwCharReplacer.spec.ts
 */
export declare abstract class GwCharReplacer {
    static needsReplacement(str: string): boolean;
    static replace(textWithCursor: GwValueAndCursorPos): GwValueAndCursorPos;
    static setCharacterMapping(singleChar: string, nLengthString: string): void;
    static removeCharacterMapping(singleChar: string): void;
    static getCharacterMappings(): GwTypedMap<string>;
    static resetCustomCharacterMappings(): void;
}
