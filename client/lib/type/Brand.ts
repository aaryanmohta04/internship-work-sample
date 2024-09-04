type Brand = {
    id: number;
    manufacturerId: number;
    alias: string;
    name: string;
    narrative: string;
    discontinued: boolean;
    abbreviation: string;
    quickbookBrandId: string;
    path: string;
    isActive: boolean;
    updatedBy: string;
    updatedDate: Date;
    manufacturer: Manufacturer;
    models: Model[];
    brandClasses: BrandClass[]
}