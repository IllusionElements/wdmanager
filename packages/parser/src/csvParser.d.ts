declare class CSVParser {
    fileList: string[];
    constructor(fileList: string[]);
    static singleParser(file: string): CSVParser;
    parse(dest: string): Promise<{}>;
    private convert;
}
export default CSVParser;
