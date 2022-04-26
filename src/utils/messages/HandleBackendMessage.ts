export default class ArabicMessages {
    word : string ; 
    constructor(word : string) {
        this.word = word;
    }

    getMessage(word : string ) {
        switch (word) {
            case 'Unauthorized':
                return "يرجى التاكد من بياناتك"
                break;
        
            default:
                break;
        }
    }
}