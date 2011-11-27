window.onload = function() {
    
    var canvas = document.getElementById("c");
    window.stage = new Stage(canvas);
    
    function Character(imgSrc,elem,name) {
        this.elem = elem||"neutral";
        this.name = name||"GlaDOS";
        this.img = new Image();
        this.img.t = this;
        this.img.onload = function(e) {
            this.t.bit = new Bitmap(this);
            this.t.bit.x = 0;
            this.t.bit.y = 0;
            this.t.bit.scaleX = this.t.bit.scaleY = 2;
            stage.addChild(this.t.bit);
            stage.update();
            console.log("derp");
        };
        this.img.src = imgSrc;
    }
    function init() {
        //window.pSrc = "Graphics/kit_from_firefox.png";
        window.pSrc = "Graphics/fox.png";
        window.char = new Character(pSrc, "fire", "Derp");
    }
    init();
};