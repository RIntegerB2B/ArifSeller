export class SuperCategory {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    constructor(
        categoryName: string,
        categoryDescription: string
    ) {
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
    }
}
