export const SlashCommandSymbol = Symbol("Slash command")
export const ContextMenuSymbol = Symbol("Context menu")
export const AutocompleteSymbol = Symbol("Autocomplete")
export const ButtonSymbol = Symbol("Button")
export const SelectMenuSymbol = Symbol("Select menu")
export const EventSymbol = Symbol("Event")



export function isFunction(x: any) {
    return typeof x === 'function'
        ? x.prototype
            ? Object.getOwnPropertyDescriptor(x, 'prototype').writable
                ? 'function'
                : 'class'
            : x.constructor.name === 'AsyncFunction'
                ? 'async'
                : 'arrow'
        : '';
}