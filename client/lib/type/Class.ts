type Class = {
    id: number;
    name: string;
    code: string;
    status: string;
    isActive: boolean;
    isOnline: boolean;
    isCreditCardAllowed: boolean;
    updatedBy: string;
    updatedDate: Date;
    classAttributes?: ClassAttribute[];
};