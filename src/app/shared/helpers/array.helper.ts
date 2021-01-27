export class ArrayHelper {
    public static arrayMoveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
        const itemToMove = items[fromIndex];
        items.splice(fromIndex, 1);
        items.splice(toIndex, 0, itemToMove);
        return items;
    }
}
