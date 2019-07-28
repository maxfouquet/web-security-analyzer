import { sync } from 'glob'
import { union } from 'lodash'

export default class Config {
    public static port: number = 5000
    public static models: string = './src/models/**/*.js'
    public static useMongo: boolean = false
    public static mongodb =
    process.env.NODE_ENV === 'docker'
        ? 'mongodb://mongo:27017/web-security-analyzer'
        : 'mongodb://localhost:27017/web-security-analyzer'
    public static globFiles(location: string): string[] {
        return union([], sync(location));
    }
}
