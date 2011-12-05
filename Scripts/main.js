window.onload = function() {
    
    var canvas = document.getElementById("c");
    window.stage = new Stage(canvas);
    
    function Character(imgSrc,elem,name) {
        this.imgSrc = imgSrc;
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
            this.t.card();
            //console.log("derp");
        };
        this.img.src = imgSrc;
        
        this.card = function() {
            var canv = document.createElement("canvas");
            canv.width = 300;
            canv.height = 240;
            var c = canv.getContext("2d");
            //var img = new Image();
            //img.onload = function(e) {
            console.log(this);
            c.drawImage(this.img, canv.width/2-this.img.width*1.5/2, canv.height/2-this.img.height*1.5/2, this.img.width*1.5, this.img.height*1.5);
            console.log(c);
            var i = canv.toDataURL("image/png");
            document.getElementById("cardImg").src = i;
            //};
            //img.src = this.imgSrc;
            var txt = document.getElementById("cardBox");
            var upperElem = this.elem.charAt(0).toUpperCase() + this.elem.slice(1);
            var stg = "<h3>"+this.name+"</h3><br />\n<b>Type:</b> "+upperElem;
            txt.innerHTML = stg;
        };
    }
    function genChar(head,body,arms,legs,elem,name) {
        //alert("Durr");
        var canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 256;
        var c = canvas.getContext("2d");
        //var headCols = ["#F00", "#0F0", "#00F"];
        var headImgs = ["Graphics/blue_1_128.png", "Graphics/red_1_128.png", "Graphics/green_1_128.png", "Graphics/yellow_1_128.png"];
        var bodyCols = ["#F00", "#0F0", "#00F"];
        var armsCols = ["#F00", "#0F0", "#00F"];
        var legsCols = ["#F00", "#0F0", "#00F", "#F0F"];
        //var h = headCols[head];
        var h = headImgs[head];
        var b = bodyCols[body];
        var a = armsCols[arms];
        var l = legsCols[legs];
        
        //c.fillStyle = h;
        //c.fillRect(0.25*canvas.width,0,canvas.width/2,canvas.height/4);
        var hImg = new Image();
        hImg.onload = function() {
            c.drawImage(this, 0.25*canvas.width,0,canvas.width/2,canvas.height/4);
        };
        hImg.src = h;
        
        c.fillStyle = b;
        c.fillRect(0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);
        
        c.fillStyle = a;
        c.fillRect(0.125*canvas.width,0.25*canvas.height,canvas.width/8,canvas.height/3);
        c.fillRect(0.75*canvas.width,0.25*canvas.height,canvas.width/8,canvas.height/3);
        
        c.fillStyle = l;
        c.fillRect(0.25*canvas.width,0.75*canvas.height,canvas.width/5,canvas.height/4);
        c.fillRect(0.5*canvas.width+canvas.width/20,0.75*canvas.height,canvas.width/5,canvas.height/4);
        
        document.body.appendChild(canvas);
    }
    function init() {
        //window.pSrc = "Graphics/kit_from_firefox.png";
        window.pSrc = "Graphics/fox.png";
        window.char = new Character(pSrc, "fire", "Derp");
        genChar(0,1,2,3,"water","Piplup");
    }
    init();
};