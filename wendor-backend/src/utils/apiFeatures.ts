export class ApiFeatures<T> {
    private query: any;
    private queryStr: Record<string, any>;

    constructor(query: any, queryStr: Record<string, any>) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(): this {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(): this {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);
        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage: number): this {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
