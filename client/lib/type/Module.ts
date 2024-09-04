type Module = {
    id: number;
    name: string;
    parentId: number;
    children?: Module[];
    newchildren: Module[];
}