import { GwClassIdTagOrNode, GwDomNode } from "../types/gwTypes";
import { GwRegisteredSystem } from "./util/GwRegisteredSystem";
/**
 * Guidewire's TypeScript APIs are an early-stage feature and are subject to change in a future release.
 */
export declare class GwAnimation extends GwRegisteredSystem {
    getSystemName(): string;
    /**
     * Stores the event handler functions for animationend by animation name.
     * We do this so that we don't have to worry about adding and removing event listeners per element,
     * but we also add the listeners dynamically so that creating new animations don't require updating
     * a fixed list of names here.
     * @type {{}}
     */
    private readonly animationEndEventListeners;
    private getAnimClass(name);
    /**
     * Adds the classname for the animation to the element.
     * If we haven't already registered a global listener for the animation name, then it builds the method
     * and adds an event listener to document.body
     * @param el
     * @param className
     * @param animName
     */
    private processElForAnimation(el, className, animName);
    /**
     * Adds the animation class for a a css keyframed animation, and sets up an event listener, if not already setup,
     * to fire killAnimation on the element when the animation completes.
     *
     * This allows a given element to have n number of unique animations loaded on it, but obviously only one
     * of a given animation. Meaning, adding the same animation twice does not stack them. Instead, it will kill
     * the current animation, then fire a settimeout to queue the animation again from the start.
     */
    addAnimation(classIdTagOrNode: GwClassIdTagOrNode, animName: string): void;
    /**
     * Called automatically by the animationend listener created via animation.addAnimation, but can be manually called in the event
     * of an animation being infinite.
     * @param animName
     * @param el
     */
    killAnimation(animName: string, el: GwDomNode | null): void;
}
export declare const gwAnimation: GwAnimation;
