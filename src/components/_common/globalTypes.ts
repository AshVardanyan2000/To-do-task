type PartialWithField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IItem = {
    title: string;
    description: string;
    date?: Date;
    id: number;
    status: string
}

export type IFormInput = PartialWithField<IItem, 'id' | 'description'>


export type IDefaultValue = PartialWithField<IItem, 'id' | 'title' | 'description' | 'date'>



