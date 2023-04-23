import exampleAdsBd from "../../lib/server/example/ads.json"

export class changeAdsSelect{
    changePosition(ads:any, position:number){
        if(ads){
            const countAds = (ads.length) - 1;
            position = position + 1 <= countAds ? position + 1 : 0
            return position
        }else{
            return 0
        }
    }
}

export class constructAds{
    async getAds(){
        return new Promise((resolve, reject) => {
            if(exampleAdsBd){
                resolve(exampleAdsBd)
            }else
                reject([])
        })
    }
    async construct(count:number){
        const dataAds = await this.getAds()
        var adsSelect: string[] = []

        if(dataAdsIsMayThatCount(dataAds, count)){
            for(let i = 0; i < count; i++){
                let ad = selectAds(dataAds);                
                if (!adsSelect.includes(ad)) {
                    adsSelect.push(ad.data)
                } else {
                  i--;  
                }
            }
        }else{
            return dataAds
        }
        
        return adsSelect

        function dataAdsIsMayThatCount(ads:any, count:number){
            return ads.length >= count
        }
        function selectAds(ads:any){
            return ads[Math.floor((Math.random() * (ads.length-0)) + 0)]
        }
    }

}