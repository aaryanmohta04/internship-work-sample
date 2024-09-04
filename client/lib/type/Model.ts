type Model = {
    id: number;
    alias?: string;
    name: string;
    brand: Brand;
    classes: Class[];
    narrative?: string;
    status: 'active' | 'inactive' | 'purged';
    abbreviation?: string;
    quickbookModelId?: string;
    path?: string;
    isActive: boolean;
    updatedBy?: string;
    updatedDate: Date;
  }