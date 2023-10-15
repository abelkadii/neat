class World{
    constructor(){
        this.pillars = [[WIDTH+100, 100]]
        this.addPillar()
        this.addPillar()
        this.play = true
    }
    update(){
        if(this.play){
            for(let i=0;i<this.pillars.length;i++){
                this.pillars[i][0]-=CONFIG.GAME_CONFIG.SPEED
            }
            if(this.pillars[0][0]<-CONFIG.GAME_CONFIG.PILLAR_WIDTH){
                this.pillars.shift()
                this.addPillar()
            }
        }
    }
    show(){
        for(let i=0;i<this.pillars.length;i++){
            if(this.pillars[i][0]<WIDTH){
                image(pillarImage, this.pillars[i][0], (HEIGHT-this.pillars[i][1]), CONFIG.GAME_CONFIG.PILLAR_WIDTH, CONFIG.GAME_CONFIG.PILLAR_WIDTH*4.09)
                image(pillarImageUpsideDown, this.pillars[i][0], HEIGHT-this.pillars[i][1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT-CONFIG.GAME_CONFIG.PILLAR_WIDTH*4.09, CONFIG.GAME_CONFIG.PILLAR_WIDTH, CONFIG.GAME_CONFIG.PILLAR_WIDTH*4.09)
            }
        }
    }
    addPillar(){
        this.pillars.push([this.pillars[this.pillars.length-1][0]+CONFIG.GAME_CONFIG.PILLAR_SPACING, randint(50, HEIGHT-50-CONFIG.GAME_CONFIG.PILLAR_HEIGHT)])
    }
    reset(){
        this.pillars = [[WIDTH+100, 100]]
        this.addPillar()
        this.addPillar()
        this.addPillar()
    }
}