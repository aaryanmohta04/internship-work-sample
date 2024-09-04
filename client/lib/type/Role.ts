export interface Role {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    updatedDate: string;
}