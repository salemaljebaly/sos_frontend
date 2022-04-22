

export class Helper{
    static async sleep(ms: number) {
        return await new Promise(r => setTimeout(r, 2000));
    }

    
    
}