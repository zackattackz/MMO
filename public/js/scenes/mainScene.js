class mainScene extends Phaser.Scene {
    constructor(){
        super({key: "mainScene"});
    }

    preload(){

    }

    create() {
        this.socket = io();


    }

    update(dt) {

    }
}
