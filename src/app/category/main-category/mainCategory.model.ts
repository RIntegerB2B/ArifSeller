export class MainCategory {
    _id: string;
    mainCategoryName: string;
    mainCategoryDescription: string;
    mainCategoryVerify: boolean;
    editing: boolean;
    constructor(
        mainCategoryName: string,
        mainCategoryDescription: string
    ) {
        this.mainCategoryName = mainCategoryName;
        this.mainCategoryDescription = mainCategoryDescription;
    }
}
