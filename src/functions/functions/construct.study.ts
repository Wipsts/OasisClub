import {firestore,getImageOfTheData} from '../function'

export class constructStudy{
    dataQuiz: any
    dataQuickStudy: any
    processing: any
    
    constructor(){
        this.dataQuiz = [{}]
        this.dataQuickStudy = [{}]
        this.processing = [[{}], [{matter: 'portuguese', data: [{}]}]]
    }

    async getDataQuiz(){
        this.dataQuiz  = await getImageOfTheData(await new firestore().get({bd: 'quiz'}) ,'quiz', true);
    }

    async getDataQuickStudy(){
        this.dataQuickStudy = await getImageOfTheData(await new firestore().get({bd: 'quickStudy'}) ,'quickStudy', true);
    }

    processingData(){
        const dataQuiz = this.dataQuiz
        const dataQuickStudy = this.dataQuickStudy

        const returned = [processingQuiz(dataQuiz), processingQuickStudy(dataQuickStudy)]
        this.processing = returned

        function processingQuiz(data:any){
            return data
        }

        function processingQuickStudy(data:any){
            // filtrar por tag e retornar como [{matter: tag, data: [--data--, --data--]}, {matter: tag, data: [--data--, --data--]}]
            const {tags, allTags} = constructByTags(data)
            const quickStudy:Array<object> = []

            for (let i = 0; i < data.length; i++) {
                const contentQuickStudy = data[i] as any;
                const indiceTag = contentQuickStudy.data.tag
                
                const tagSelect = tags[indiceTag]
                tagSelect.push(contentQuickStudy)
            }

            Object.keys(tags).forEach((val) => {
                const value = tags[val]
                quickStudy.push({
                    matter: val,
                    data: value
                })
            })

            return quickStudy

            function constructByTags(data:any){
                const tags:any = {}
                const allTags:Array<string> = []

                for (let i = 0; i < data.length; i++) {
                    const tag = data[i].data.tag;
                    if(!tagsAlreadPut(tags, tag)){
                        tags[tag] = []
                        allTags.push("")
                    }
                }

                function tagsAlreadPut(tags:object, tag:string){
                    let returned = false
                    Object.keys(tags).forEach((val, index) => {
                        if(val === tag){
                            returned = true
                        }
                    })

                    return returned
                }

                return {tags, allTags}
            }
        }
    }

    async returnData(){
        return {quiz: this.processing[0], quickStudy: this.processing[1]}
    }
}

export class constructQuiz{
    async getDataQuiz(uid:string){
        return await getImageOfTheData(await new firestore().getWhere({bd: 'quiz', where: ['documentID', uid]}) ,'quiz', false);
    }
}

export class constructQuickStudy{
    async getDataQuickStudy(uid:string){
        return await getImageOfTheData(await new firestore().getWhere({bd: 'quickStudy', where: ['documentID', uid]}) ,'quickStudy', false);
    }
}