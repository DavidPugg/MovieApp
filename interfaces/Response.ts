export interface ApiResponse<T> {
    results: Array<T>;
    total_pages: Number;
    total_results: Number;
}
