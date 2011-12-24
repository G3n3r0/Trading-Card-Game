window.onload = function() {
    
    var canvas = document.getElementById("c");
    window.stage = new Stage(canvas);
    
    function Attack(name, type, effect) {
        this.name = name;
        this.type = type;
        this.effect = effect;
        //this.effectFunc = new Function(this.effect);
    }
    
    var elemEffects = {
        water: {
            fire: 1.5,
            water: 1,
            grass: 0.5
        },
        fire: {
            fire: 1,
            water: 0.5,
            grass: 1.5
        },
        grass: {
            fire: 0.5,
            water: 1.5,
            grass: 1
        }
    };
    
    function Character(imgSrc,elem,clas,name) {
        this.imgSrc = imgSrc;
        this.elem = elem||"neutral";
        this.clas = clas;
        this.name = name||"GlaDOS";
        this.lvl = 1;
        //this.atk = 6;
        //this.def = 4;
        this.img = new Image();
        this.img.t = this;
        this.img.onload = function() {
            this.t.bit = new Bitmap(this);
            this.t.bit.x = 0;
            this.t.bit.y = 0;
            this.t.bit.scaleX = this.t.bit.scaleY = 2;
            window.stage.addChild(this.t.bit);
            window.stage.update();
            //this.t.card();
            //console.log("derp");
        };
        this.img.src = imgSrc;
        this.atks = [new Attack("Derp", "water", ["attack", 2]), new Attack("Herp", "water", ["defend", 2])];
        
        this.card = function() {
            var canv = document.createElement("canvas");
            canv.width = 300;
            canv.height = 240;
            var c = canv.getContext("2d");
            //var img = new Image();
            //img.onload = function(e) {
            console.log(this);
            var scale = canv.height/this.img.height;
            //c.drawImage(this.img, canv.width/2-this.img.width*1.5/2, canv.height/2-this.img.height*1.5/2, this.img.width*1.5, this.img.height*1.5);
            c.drawImage(this.img, canv.width/2-this.img.width*scale/2, canv.height/2-this.img.height*scale/2, this.img.width*scale, this.img.height*scale);
            console.log(c);
            var i = canv.toDataURL("image/png");
            document.getElementById("cardImg").src = i;
            //};
            //img.src = this.imgSrc;
            var txt = document.getElementById("cardBox");
            var upperElem = this.elem.charAt(0).toUpperCase() + this.elem.slice(1);
            var upperClass = this.clas.charAt(0).toUpperCase() + this.clas.slice(1);
            var stg = "<h3>"+this.name+"</h3><br />\n<b>Level:</b> "+extCode.numToText(this.lvl)+"<br />\n<b>Type:</b> "+upperElem+"<br />\n<b>Class:</b> "+upperClass;
            txt.innerHTML = stg;
        };
        this.evalAtkDef = function() {
            var atk = 2*this.lvl;
            var def = 2*this.lvl;
            return [atk, def];
        };
        this.evalHealth = function() {
            return 50+4*this.lvl;
        };
        this.battle = function(enem) {
            this.tempAtk = this.evalAtkDef()[0];
            this.tempDef = this.evalAtkDef()[1];
            console.log(this.evalAtkDef());
            this.health = this.evalHealth();
            
            enem.tempAtk = enem.evalAtkDef()[0];
            enem.tempDef = enem.evalAtkDef()[1];
            enem.health = enem.evalHealth();
            
            document.getElementById("playerSide").src = this.img.src;
            document.getElementById("enemSide").src = enem.img.src;
            document.getElementById("vs").innerHTML = this.name+" vs "+enem.name;
            var t = this;
            for(var i=0;i<this.atks.length;i++) {
                document.getElementById("fightBtn"+(i+1)).innerHTML = this.atks[i].name;
                document.getElementById("fightBtn"+(i+1)).atk = JSON.stringify(this.atks[i]);
                document.getElementById("fightBtn"+(i+1)).onclick = function() {
                    //console.log(t.atks, i, t.atks[i]);
                    //t.evalAtk(t.atks[i], enem);
                    t.evalAtk(JSON.parse(this.atk), enem);
                };
            }
        };
        this.evalAtk = function(atk, other) {
            //console.log(atk);
            console.log(other.health, this.tempDef);
            var type = atk.type;
            var effect = atk.effect;
            console.log(effect);
            //var playerAtkDef = this.evalAtkDef;
            //var enemAtkDef = other.evalAtkDef;
            //console.log(atk, other);
            if(effect[0]=="attack") {
                other.health -= effect[1]*elemEffects[type][other.elem]-0.25*other.tempDef+0.25*this.tempAtk;
            } else if(effect[0]=="defend") {
                this.tempDef += effect[1];
            }
            console.log(other.health, this.tempDef);
        };
    }
    function genChar(head, body, arms, legs, elem, clas, name) {
        //var rsrcLength = 2;
        //alert("Durr");
        var canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 256;
        var c = canvas.getContext("2d");
        c.shadowOffsetX = 4;
        c.shadowOffsetY = 4;
        c.shadowBlur    = 4;
        c.shadowColor   = 'rgba(0, 0, 0, 0.5)';
        //var headCols = ["#F00", "#0F0", "#00F"];
        //var headImgs = ["Graphics/Body/Head/blue_1_128.png", "Graphics/Body/Head/red_1_128.png", "Graphics/Body/Head/green_1_128.png", "Graphics/Body/Head/yellow_1_128.png"];
        var headIds = ["head-blue_1_128", "head-red_1_128", "head-green_1_128", "head-yellow_1_128"];
        //var bodyCols = ["#F00", "#0F0", "#00F"];
        //var bodyImgs = ["Graphics/Body/Torso/suit.png", "Graphics/Body/Torso/dragonBody.png", "Graphics/Body/Torso/creeperBody.jpg"];
        var bodyIds = ["torso-suit", "torso-dragonBody", "torso-creeperBody"];
        var armsCols = ["#F00", "#0F0", "#00F"];
        var legsCols = ["#F00", "#0F0", "#00F", "#F0F"];
        //var h = headCols[head];
        //var h = headImgs[head];
        var h = headIds[head];
        //var b = bodyCols[body];
        var b = bodyIds[body];
        var a = armsCols[arms];
        var l = legsCols[legs];
        
        //c.fillStyle = h;
        //c.fillRect(0.25*canvas.width,0,canvas.width/2,canvas.height/4);
        /*var hImg = new Image();
        hImg.onload = function() {
            c.drawImage(this, 0.25*canvas.width,0,canvas.width/2,canvas.height/4);
            var bImg = new Image();
            bImg.onload = function() {
                c.drawImage(this, 0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);
                return canvas.toDataURL("image/png");
            };
            bImg.src = b;
        };
        hImg.src = h;*/
        var hImg = document.getElementById(h);
        c.drawImage(hImg, 0.25*canvas.width,0,canvas.width/2,canvas.height/4);
        
        //c.fillStyle = b;
        //c.fillRect(0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);
        /*var bImg = new Image();
        bImg.onload = function() {
            c.drawImage(this, 0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);
        };
        bImg.src = b;*/
        /*var bImg = document.getElementById(b);
        c.drawImage(bImg, 0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);*/
        
        c.fillStyle = a;
        c.fillRect(0.125*canvas.width,0.25*canvas.height,canvas.width/8,canvas.height/3);
        
        var bImg = document.getElementById(b);
        c.drawImage(bImg, 0.25*canvas.width,0.25*canvas.height,canvas.width/2,canvas.height/2);
        
        c.fillStyle = a;
        c.fillRect(0.75*canvas.width,0.25*canvas.height,canvas.width/8,canvas.height/3);
        
        c.fillStyle = l;
        c.fillRect(0.25*canvas.width,0.75*canvas.height,canvas.width/5,canvas.height/4);
        c.fillRect(0.5*canvas.width+canvas.width/20,0.75*canvas.height,canvas.width/5,canvas.height/4);
        
        //document.body.appendChild(canvas);
        
        return new Character(canvas.toDataURL("image/png"), elem, clas, name);
    }

    function create_qrcode(text, typeNumber, errorCorrectLevel, table) {

	    var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
	    qr.addData(text);
	    qr.make();

        //	return qr.createTableTag();
	    return qr.createImgTag(200, 200);
    };
    
    function out_qrcode(id, text) {
        document.getElementById(id).innerHTML = create_qrcode(text);
    }
    
    function init() {
        window.scrollTo(0, 1);
        //window.pSrc = "Graphics/kit_from_firefox.png";
        window.pSrc = "Graphics/fox.png";
        //window.char = new Character(pSrc, "fire", "Derp");
        window.char = genChar(0,2,2,3,"water","warrior","Piplup");
        window.char.card();
        window.char.battle(genChar(3,1,2,1,"fire","defender","El Derpo"));
        
        //out_qrcode("qrCont", "Derpes!!!");
        //document.getElementById("qr").setAttribute("class","overlay");
    }
    init();
};