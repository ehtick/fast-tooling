import { html, ref, slotted, ViewTemplate } from "@microsoft/fast-element";
import { ElementDefinitionContext } from "@microsoft/fast-foundation";
import { HTMLRender } from "./html-render";

export const htmlRenderTemplate: (
    context: ElementDefinitionContext
) => ViewTemplate<HTMLRender> = context => {
    return html<HTMLRender>`
        <div
            class="${x => (x.interactiveMode ? "container__interactive" : "container")}"
            @click="${(x, c) => x.containerClickHandler(c.event as MouseEvent)}"
        >
            <div
                class="htmlRender"
                @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
                @dblclick="${(x, c) => x.dblClickHandler(c.event as MouseEvent)}"
                @mouseover="${(x, c) => x.hoverHandler(c.event as MouseEvent)}"
                @mouseout="${(x, c) => x.blurHandler(c.event as MouseEvent)}"
                @keydown="${(x, c) => x.keyDownHandler(c.event as KeyboardEvent)}"
                @keyup="${(x, c) => x.keyUpHandler(c.event as KeyboardEvent)}"
                :innerHTML="${x => (x.markup ? x.markup.outerHTML : "")}"
                tabindex="1"
                ${ref("renderContainerElement")}
            ></div>
            <slot ${slotted("layers")}></slot>
        </div>
    `;
};
