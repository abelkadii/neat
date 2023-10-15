class Bird{
    constructor(x, y){
        this.x=x
        this.y=y
        this.w=70*1.4
        this.h=70
        this.vy=0
        this.dead=false
        this.score=0
        this.pillarCount = 0
        this.passed=false
    }
    flap(){
        this.vy=-CONFIG.GAME_CONFIG.MAX_SPEED
    }
    update(){
        if(!this.dead){
            this.vy+=CONFIG.GAME_CONFIG.G/FPS
            this.vy=this.vy>CONFIG.GAME_CONFIG.MAX_SPEED?CONFIG.GAME_CONFIG.MAX_SPEED:this.vy<-CONFIG.GAME_CONFIG.MAX_SPEED?-CONFIG.GAME_CONFIG.MAX_SPEED:this.vy
            this.y+=this.vy
            this.check_collision()
        }else{
            this.y+=10
            if(this.y>HEIGHT-this.w/2)this.y=HEIGHT-this.w/2
            world.stop()
        }
        this.score++
    }
    look(){
        let pillar
        if(world.pillars[0][0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH>this.x-this.w/2){
            this.passed=false
            pillar = world.pillars[0]
        }else{
            pillar = world.pillars[1]
        }

        let dsp = (pillar[0]-this.x)/WIDTH
        let dep = (pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH-this.x)/WIDTH
        let dtp = (this.y-(HEIGHT-pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT) - this.w/2)/HEIGHT
        let dbp = (this.y-(HEIGHT-pillar[1]) + this.w/2)/HEIGHT
        let vy = this.vy/CONFIG.GAME_CONFIG.MAX_SPEED

        // 1: distance_to_begening_of_pillar
        // 2: distance_to_end_of_pillar
        // 3: distance_to_top_of_pillar
        // 4: distance_to_bottom_of_pillar
        // 5: vy



        return [dsp, dep, dtp, dbp, vy]
    }
    decide(output){
        // if(chance(_tanh(output[0]))){
        if(_tanh(output[0])>.5){
            this.flap()
        }
    }
    show(){
        // ellipse(this.x, this.y, this.w, this.w)
        // stroke('red')
        // line(this.x, this.y, this.pillar[0], HEIGHT-this.pillar[1])
        // line(this.x, this.y, this.pillar[0], HEIGHT-this.pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT)
        
        push();
        translate(this.x-this.w/2, this.y-this.h/2)
        rotate(this.vy*1)
        image(bridImage, 0, 0, this.w, this.h)
		pop();
    }
    check_collision(){
        let pillar = this.gestCurrentPillar()
        if(this.x+this.w/2>pillar[0] && this.x-this.w/2<pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH){
            if(this.y-this.h*1.5/2<HEIGHT-pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT || this.y+this.h*1.5/2>HEIGHT-pillar[1]){
                this.dead=true
            }
        }
        else if(this.x>pillar[0] && this.x<pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH){
            if(this.y-this.h*1.5/2<HEIGHT-pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT||this.y+this.h*1.5/2>HEIGHT-pillar[1]){
                this.dead=true
            }
        }else if(this.x<pillar[0]){
            if(distance_points(this.x, this.y, pillar[0], HEIGHT-pillar[1])<this.w/2 || distance_points(this.x, this.y, pillar[0], HEIGHT-pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT)<this.w/2){
                this.dead=true
            }
        }else if(this.x>pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH){
            if(distance_points(this.x, this.y, pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH, HEIGHT-pillar[1])<=this.w/2 || distance_points(this.x, this.y, pillar[0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH, HEIGHT-pillar[1]-CONFIG.GAME_CONFIG.PILLAR_HEIGHT)<this.w/2){
                this.dead=true
            }
        }
    }
    gestCurrentPillar(){
        if(world.pillars[0][0]+CONFIG.GAME_CONFIG.PILLAR_WIDTH>this.x-this.w/2){
            this.passed=false
            return world.pillars[0]
        }
        if(!this.passed){
            this.pillarCount++
            this.passed=true
        }
        return world.pillars[1]
    }
    fitness(){
        return this.pillarCount==0?0:this.pillarCount**this.pillarCount + max(0, 500*this.score-900)/100
    }

}
