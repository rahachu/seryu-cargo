export class Pagination<T> {
    readonly data: T[];
    readonly total_row: number;
    readonly current: number;
    readonly page_size: number;

    constructor(params: {data: T[], total_row?: number, current?: number, page_size?: number}) {
        this.data = params.data || [];
        this.total_row = params.total_row || params.data.length;
        this.current = params.current || 1;
        this.page_size = params.page_size || 10;
    }
}
