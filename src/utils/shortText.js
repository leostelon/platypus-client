export function shortText(text) {
    return `${text.substring(0, 4)}...${text.slice(-4)}`;
}