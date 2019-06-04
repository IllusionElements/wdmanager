import { Model, Document } from "mongoose";
export declare const service: (db: () => Record<string, Model<Document, {}>>) => <T extends new (...args: any[]) => any>(ServiceModel: T) => {
    new (...args: any[]): {
        [x: string]: any;
        db: Record<string, Model<Document, {}>>;
    };
} & T;
