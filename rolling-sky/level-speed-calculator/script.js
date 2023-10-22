var isimportedbg = 0;
var isimportedtn = 0;
var crowncount = 0;
var starcount = 1;
product = document.querySelector("canvas.product");
const inputtext6 = document.querySelector('input.textbox6');
const inputtext7 = document.querySelector('input.textbox7');

async function onOpen(){
	product.width = 1280;
	product.height = product.width * 9 / 16;
	await delay(50);
	onchange();
}

const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");

function reportWindowSize() {
	product.width = 1280;
	product.height = product.width * 9 / 16;
	onchange();
}

window.onresize = reportWindowSize;

const fileInputbg = document.querySelector(".input_bg");
previewbg = document.querySelector(".previewbg img");
choosebgBtn = document.querySelector(".button_bg");
const fileInputtn = document.querySelector(".input_tn");
previewtn = document.querySelector(".previewtn img");
choosetnBtn = document.querySelector(".button_tn");

labelbgexplain = document.getElementById('lablebgex');
labeltnexplain = document.getElementById('labletnex');
tnimgcode = document.getElementById('tnimgcode');

const loadImagebg = () => {
	let filebg = fileInputbg.files[0];
	if(!filebg) return;
	console.log(filebg);
	previewbg.src = URL.createObjectURL(filebg);
	labelbgexplain.innerHTML = '<font size="3" style="color:#888">Import done!</font>';
	isimportedbg = 1;
	
}

previewbg.onload = function() {
    if(this.naturalWidth / this.naturalHeight !=1) {
        previewbg.src = 'img.jpg'
        labelbgexplain.innerHTML = '<font size="3" style="color:red">Ratio not avalible, use photo with ratio 1:1</font>';
		isimportedbg = 0;
	}
	console.log(isimportedbg);
	onchange();
}

const loadImagetn = () => {
	let filetn = fileInputtn.files[0];
	if(!filetn) return;
	console.log(filetn);
	labeltnexplain.innerHTML = '<font size="3" style="color:#888">Import done!</font>';
	tnimgcode.innerHTML = '<img src="' + URL.createObjectURL(filetn) + '" width="255" height="400" alt="previewtn">';
	previewtn.src = URL.createObjectURL(filetn);
	isimportedtn = 1;
}

previewtn.onload = function() {
	onchange();
}

fileInputbg.addEventListener("change", loadImagebg);
fileInputtn.addEventListener("change", loadImagetn);

choosebgBtn.addEventListener("click",() => fileInputbg.click());
choosetnBtn.addEventListener("click",() => fileInputtn.click());

const inputH = document.querySelector('input.sliderR');
const inputS = document.querySelector('input.sliderG');
const inputB = document.querySelector('input.sliderB');
const inputtext = document.querySelector('input.textbox');
const H11 = document.querySelector('input.H11');
const H12 = document.querySelector('input.H12');
const H13 = document.querySelector('input.H13');

function onInput() {
	inputB.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+inputH.value+','+inputS.value+'%,'+(100-inputS.value/2)+'%) 100%)';
	inputS.style = 'background: linear-gradient(90deg, hsl(0,0%,'+inputB.value+'%) 0%, hsl('+inputH.value+',100%,'+inputB.value/2+'%) 100%)';
	H11.value = inputH.value;
	H12.value = inputS.value;
	H13.value = inputB.value;
	var h1 = inputH.value/360;
	var s1 = inputS.value/100;
	var b1 = inputB.value/100;
	var l1 = (2 - s1) * b1 / 2;

    if (l1 != 0) {
        if (l1 == 1) {
            s1 = 0;
        } else if (l1 < 0.5) {
            s1 = s1 * b1 / (l1 * 2);
        } else {
            s1 = s1 * b1 / (2 - l1 * 2);
        }
    }
	inputtext.style = 'color:hsl('+h1*360+','+s1*100+'%,'+l1*100+'%)';
	onchange();
}

function ontype() {
	if(H11.value>360){
		H11.value = 360;
	}
	if(H11.value<0){
		H11.value = 0;
	}
	if(H12.value>100){
		H12.value = 100;
	}
	if(H12.value<0){
		H12.value = 0;
	}
	if(H13.value>100){
		H13.value = 100;
	}
	if(H13.value<0){
		H13.value = 0;
	}
	inputB.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+H11.value+','+H12.value+'%,'+(100-H12.value/2)+'%) 100%)';
	inputS.style = 'background: linear-gradient(90deg, hsl(0,0%,'+H13.value+'%) 0%, hsl('+H11.value+',100%,'+H13.value/2+'%) 100%)';
	inputH.value = H11.value;
	inputS.value = H12.value;
	inputB.value = H13.value;
	var h1 = H11.value/360;
	var s1 = H12.value/100;
	var b1 = H13.value/100;
	var l1 = (2 - s1) * b1 / 2;

    if (l1 != 0) {
        if (l1 == 1) {
            s1 = 0;
        } else if (l1 < 0.5) {
            s1 = s1 * b1 / (l1 * 2);
        } else {
            s1 = s1 * b1 / (2 - l1 * 2);
        }
    }
	inputtext.style = 'color:hsl('+h1*360+','+s1*100+'%,'+l1*100+'%)';
	onchange();
}

const inputH2 = document.querySelector('input.sliderR2');
const inputS2 = document.querySelector('input.sliderG2');
const inputB2 = document.querySelector('input.sliderB2');
const inputtext2 = document.querySelector('input.textbox2');
const inputtext3 = document.querySelector('input.textbox3');

function onInput2() {
	inputB2.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+inputH2.value+','+inputS2.value+'%,'+(100-inputS2.value/2)+'%) 100%)';
	inputS2.style = 'background: linear-gradient(90deg, hsl(0,0%,'+inputB2.value+'%) 0%, hsl('+inputH2.value+',100%,'+inputB2.value/2+'%) 100%)';
	H21.value = inputH2.value;
	H22.value = inputS2.value;
	H23.value = inputB2.value;
	var h2 = inputH2.value/360;
	var s2 = inputS2.value/100;
	var b2 = inputB2.value/100;
	var l2 = (2 - s2) * b2 / 2;

    if (l2 != 0) {
        if (l2 == 1) {
            s2 = 0;
        } else if (l2 < 0.5) {
            s2 = s2 * b2 / (l2 * 2);
        } else {
            s2 = s2 * b2 / (2 - l2 * 2);
        }
    }
	inputtext2.style = 'color:hsl('+h2*360+','+s2*100+'%,'+l2*100+'%)';
	inputtext3.style = 'color:hsl('+h2*360+','+s2*100+'%,'+l2*100+'%)';
	onchange();
}

function ontype2() {
	if(H21.value>360){
		H21.value = 360;
	}
	if(H21.value<0){
		H21.value = 0;
	}
	if(H22.value>100){
		H22.value = 100;
	}
	if(H22.value<0){
		H12.value = 0;
	}
	if(H23.value>100){
		H23.value = 100;
	}
	if(H23.value<0){
		H23.value = 0;
	}
	inputB2.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+H21.value+','+H22.value+'%,'+(100-H22.value/2)+'%) 100%)';
	inputS2.style = 'background: linear-gradient(90deg, hsl(0,0%,'+H23.value+'%) 0%, hsl('+H21.value+',100%,'+H23.value/2+'%) 100%)';
	var h2 = H21.value/360;
	var s2 = H22.value/100;
	var b2 = H23.value/100;
	var l2 = (2 - s2) * b2 / 2;

    if (l2 != 0) {
        if (l2 == 1) {
            s2 = 0;
        } else if (l2 < 0.5) {
            s2 = s2 * b2 / (l2 * 2);
        } else {
            s2 = s2 * b2 / (2 - l2 * 2);
        }
    }
	inputtext2.style = 'color:hsl('+h2*360+','+s2*100+'%,'+l2*100+'%)';
	inputtext3.style = 'color:hsl('+h2*360+','+s2*100+'%,'+l2*100+'%)';
	inputH2.value = H21.value;
	inputS2.value = H22.value;
	inputB2.value = H23.value;
	onchange();
}

crownimg1 = document.querySelector(".crown1 img");
button1stcrown = document.querySelector("button.crown1");
crownimg2 = document.querySelector(".crown2 img");
button2stcrown = document.querySelector("button.crown2");
crownimg3 = document.querySelector(".crown3 img");
button3stcrown = document.querySelector("button.crown3");
iscrowncheckbox = document.getElementById("cbx-46");


async function onclickcrown(i) {

    if(!iscrowncheckbox.checked){
	    if(i==4){
		    crowncount = 0;
			iscrowncheckbox.disabled = true;
		    document.getElementById("selectcrown").style.animationDirection = "reverse";
		    document.getElementById("selectcrown").style.animationName = "none";
	        requestAnimationFrame(() => {
		    document.getElementById("selectcrown").style.animationName = "crownui";
			});
		    document.getElementById("selectcrown").style.opacity = 0;
			iscrowncheckbox.disabled = false;
			
	    }
	}
	if(iscrowncheckbox.checked){
	    if(i==3){
	    	crownimg1.src = 'CrownOk.png';
		    crownimg2.src = 'CrownOk.png';
	    	crownimg3.src = 'CrownOk.png';
			crowncount = 3;
	    }
	    if(i==2){
		    crownimg1.src = 'CrownOk.png';
	    	crownimg2.src = 'CrownOk.png';
	    	crownimg3.src = 'CrownUn.png';
			crowncount = 2;
	    }
	    if(i==1){
			if(crowncount == 1){
				crownimg1.src = 'CrownUn.png';
	    	    crownimg2.src = 'CrownUn.png';
	    	    crownimg3.src = 'CrownUn.png';
			    crowncount = 0;
			}
			else{
	    	    crownimg1.src = 'CrownOk.png';
	    	    crownimg2.src = 'CrownUn.png';
	    	    crownimg3.src = 'CrownUn.png';
				crowncount = 1;
			}
	    }
		if(i==4){
	    crownimg1.src = 'CrownOk.png';
	    crownimg2.src = 'CrownOk.png';
	    crownimg3.src = 'CrownOk.png';
		crowncount = 3;
		iscrowncheckbox.disabled = true;
		document.getElementById("selectcrown").style.animationDirection = "normal";
		document.getElementById("selectcrown").style.animationName = "none";
	    requestAnimationFrame(() => {
		document.getElementById("selectcrown").style.animationName = "crownui";
		document.getElementById("selectcrown").style.opacity = 1;
		iscrowncheckbox.disabled = false;
	});
	    }
	}
	await delay(10);
	onchange();
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
	

button1stcrown.addEventListener("click",() => onclickcrown(1));
button2stcrown.addEventListener("click",() => onclickcrown(2));
button3stcrown.addEventListener("click",() => onclickcrown(3));
iscrowncheckbox.addEventListener("click",() => onclickcrown(4));

const inputH3 = document.querySelector('input.sliderR3');
const inputS3 = document.querySelector('input.sliderG3');
const inputB3 = document.querySelector('input.sliderB3');
const inputtext5 = document.querySelector('input.textbox5');

function onInput3() {
	inputB3.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+inputH3.value+','+inputS3.value+'%,'+(100-inputS3.value/2)+'%) 100%)';
	inputS3.style = 'background: linear-gradient(90deg, hsl(0,0%,'+inputB3.value+'%) 0%, hsl('+inputH3.value+',100%,'+inputB3.value/2+'%) 100%)';
	H31.value = inputH3.value;
	H32.value = inputS3.value;
	H33.value = inputB3.value;
	var h3 = inputH3.value/360;
	var s3 = inputS3.value/100;
	var b3 = inputB3.value/100;
	var l3 = (2 - s3) * b3 / 2;

    if (l3 != 0) {
        if (l3 == 1) {
            s3 = 0;
        } else if (l3 < 0.5) {
            s3 = s3 * b3 / (l3 * 2);
        } else {
            s3 = s3 * b3 / (2 - l3 * 2);
        }
    }
	inputtext5.style = 'color:hsl('+h3*360+','+s3*100+'%,'+l3*100+'%)';
	onchange();
}

function ontype3() {
	if(H31.value>360){
		H31.value = 360;
	}
	if(H31.value<0){
		H31.value = 0;
	}
	if(H32.value>100){
		H32.value = 100;
	}
	if(H32.value<0){
		H32.value = 0;
	}
	if(H33.value>100){
		H33.value = 100;
	}
	if(H33.value<0){
		H33.value = 0;
	}
	inputB3.style = 'background: linear-gradient(90deg, rgba(0,0,0,1) 0%, hsl('+H31.value+','+H32.value+'%,'+(100-H32.value/2)+'%) 100%)';
	inputS3.style = 'background: linear-gradient(90deg, hsl(0,0%,'+H33.value+'%) 0%, hsl('+H31.value+',100%,'+H33.value/2+'%) 100%)';
	inputtext5.style.style = 'color:hsl('+H31.value+','+H32.value+'%,'+((100-H32.value/2)*(H33.value/100))+'%)';
	inputH3.value = H31.value;
	inputS3.value = H32.value;
	inputB3.value = H33.value;
	onchange();
}

var ctx = product.getContext("2d");
var imgtrue = document.getElementById("bgimg");
var tum = document.getElementById("tnimg");
var debugxpos = document.getElementById("xpos");
var debugypos = document.getElementById("ypos");
var imgcrown1 = new Image;
imgcrown1.src = "CrownOk.png";
var imgcrown2 = new Image;
imgcrown2.src = "CrownOk.png";
var imgcrown3 = new Image;
imgcrown3.src = "CrownOk.png";
var img = new Image;
img.src = imgtrue.src;
var imgtn = new Image;
imgtn.src = previewtn.src;
var diaR = new Image;
diaR.src = "Diamond_R.png";
var diaG = new Image;
diaG.src = "Diamond_G.png";
var diaB = new Image;
diaB.src = "Diamond_B.png";
var diaT = new Image;
diaT.src = "Diamond_T.png";
var dia = new Image;
dia.src = "Diamond.png";

UIchoosecheckbox = document.getElementById("UIchoosecheckbox");
lableUItype = document.getElementById("UIchoose");

function onchange(){
	
	product.getContext("2d").reset();
	
	if(UIchoosecheckbox.checked){
		levellist();
		return;
	}
	
	ctx.filter = "blur(15px)";
	
	if(isimportedbg == 0){
		img.src = "Massif.png";
		ctx.drawImage(img,
	    img.naturalWidth*0.1, 0,
		img.naturalWidth*0.8, img.naturalWidth*9*0.8/16,
		0, 0,
		product.width, product.height);
	}
	if(isimportedbg == 1){
		img.src = imgtrue.src;
		ctx.drawImage(img,
	    img.naturalWidth*0.1, 0,
		img.naturalWidth*0.8, img.naturalWidth*9*0.8/16,
		0, 0,
		product.width, product.height);
	}
	
	
	ctx.drawImage(img,
	    img.naturalWidth*0.1, 0,
		img.naturalWidth*0.8, img.naturalWidth*9*0.8/16,
		0, 0,
		product.width, product.height);
	ctx.drawImage(img,
	    img.naturalWidth*0.1, 0,
		img.naturalWidth*0.8, img.naturalWidth*9*0.8/16,
		0, 0,
		product.width, product.height);
	
	ctx.filter = "none";
	
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = "black";
    ctx.fillRect(0, 0, product.width, product.height);
	ctx.globalAlpha = 1;
	
	ctx.drawImage(img,
	    img.naturalWidth*0.338, img.naturalHeight*0.65,
		img.naturalWidth*0.324, img.naturalHeight*0.145,
		product.width*0.46, product.height*0.55,
		product.width*0.424, product.height*0.352);
	
	ctx.drawImage(img,
	    img.naturalWidth*0.338, img.naturalHeight*0.043,
		img.naturalWidth*0.324, img.naturalHeight*0.145,
		product.width*0.46, product.height*0.12,
		product.width*0.424, product.height*0.352);
		
	ctx.globalAlpha = 0.23;
	ctx.fillStyle = "black";
    ctx.fillRect(0, 0, product.width, product.height);
	ctx.globalAlpha = 1;
	
	if(isimportedtn == 0){
		imgtn.src = "world1.png";
		ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.13, product.height*0.12,
		product.height*51/80 *0.78, product.height *0.78);
	}
	if(isimportedtn == 1){
		imgtn.src = tum.src;
		ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.13, product.height*0.12,
		product.height*51/80 *0.78, product.height *0.78);
	}

	ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.13, product.height*0.12,
		product.height*51/80 *0.78, product.height *0.78);
	
	var productlvlname = inputtext.value;
	
	if (productlvlname == ""){
	    productlvlname = 'Massif';
	}
	
	ctx.textAlign = 'center';
	var fontsizepx = product.height*1.30*(1/productlvlname.length)
	if(productlvlname.length<10){
		fontsizepx = product.height*1.3*(1/12);
	}
	ctx.font = fontsizepx+"px Sen-Bold";
	var h1 = H11.value/360;
	var s1 = H12.value/100;
	var b1 = H13.value/100;
	var l1 = (2 - s1) * b1 / 2;

    if (l1 != 0) {
        if (l1 == 1) {
            s1 = 0;
        } else if (l1 < 0.5) {
            s1 = s1 * b1 / (l1 * 2);
        } else {
            s1 = s1 * b1 / (2 - l1 * 2);
        }
    }
	ctx.fillStyle = "hsl("+h1*360+','+s1*100+'%,'+l1*100+"%)";
	var textxpos = product.width*0.46 + product.width*0.424/2;
	var textypos = (product.height*0.12 + product.height*0.305/2)+fontsizepx/2;
	
	if(iscrowncheckbox.checked){
		if(crowncount==3){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownOk.png";
	        imgcrown3.src = "CrownOk.png";
		}
		else if(crowncount==2){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownOk.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else if(crowncount==1){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else if(crowncount==0){
	        imgcrown1.src = "CrownUn.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else{
			imgcrown1.src = "CrownUn.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		ctx.drawImage(imgcrown1,
	        0, 0,
		    imgcrown1.naturalWidth, imgcrown1.naturalHeight,
		    product.width*0.562, product.height*0.30,
		    product.width*0.068, product.width*0.068);
		ctx.drawImage(imgcrown2,
	        0, 0,
		    imgcrown2.naturalWidth, imgcrown2.naturalHeight,
		    textxpos - (product.width*0.07/2), product.height*0.30,
		    product.width*0.068, product.width*0.068);
		ctx.drawImage(imgcrown3,
	        0, 0,
		    imgcrown3.naturalWidth, imgcrown3.naturalHeight,
		    textxpos - (product.width*0.07/2) - product.width*0.562 + textxpos - (product.width*0.07/2), product.height*0.30,
		    product.width*0.068, product.width*0.068);
		textypos = (product.height*0.12 + product.height*0.18/2)+fontsizepx/2;
	}
    ctx.fillText(productlvlname, textxpos, textypos);
	ctx.fillStyle = "black";
	
	var productpercent = inputtext5.value+"%";
	
	var h3 = inputH3.value/360;
	var s3 = inputS3.value/100;
	var b3 = inputB3.value/100;
	var l3 = (2 - s3) * b3 / 2;

    if (l3 != 0) {
        if (l3 == 1) {
            s3 = 0;
        } else if (l3 < 0.5) {
            s3 = s3 * b3 / (l3 * 2);
        } else {
            s3 = s3 * b3 / (2 - l3 * 2);
        }
    }
	if (productpercent == "%"){
	    productpercent = '100%';
	}
	var fontsizepx2 = product.height*0.155;
	ctx.font = fontsizepx2+"px Sen-Bold";
	ctx.globalAlpha = 0.3;
	ctx.fillText(productpercent, textxpos+product.width*0.003, product.height*0.708);
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'hsl('+h3*360+','+s3*100+'%,'+l3*100+'%)';
	ctx.fillText(productpercent, textxpos, product.height*0.70);
	
	var h2 = H21.value/360;
	var s2 = H22.value/100;
	var b2 = H23.value/100;
	var l2 = (2 - s2) * b2 / 2;

    if (l2 != 0) {
        if (l2 == 1) {
            s2 = 0;
        } else if (l2 < 0.5) {
            s2 = s2 * b2 / (l2 * 2);
        } else {
            s2 = s2 * b2 / (2 - l2 * 2);
        }
    }
	


	var r, g, b;

    if(s2 == 0){
        r = g = b = l2; // achromatic
    }
	else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
        var p = 2 * l2 - q;
        r = hue2rgb(p, q, h2 + 1/3);
        g = hue2rgb(p, q, h2);
        b = hue2rgb(p, q, h2 - 1/3);
    }
	var DiaCount = inputtext2.value;
	var MaxCount = inputtext3.value;
	var diaxpos = product.width*0.54;
	var diaypos = product.height*0.76;
	var diacountxpos = product.width*0.695;
	var diacountypos = product.height*0.86;
	var maxcountxpos = product.width*0.695;
	var maxcountypos = product.height*0.86;
	
	if(DiaCount == ""){
		DiaCount = "20";
	}
	if(MaxCount == ""){
		MaxCount = "20";
	}
	
	ctx.textAlign = 'right';
	var fontsizepx3 = product.height*0.125;
	ctx.font = fontsizepx3+"px Sen-Bold";
	ctx.fillStyle = 'hsl('+h2*360+','+s2*100+'%,'+l2*100+'%)';
	ctx.fillText(DiaCount, diacountxpos, diacountypos);
	ctx.textAlign = 'left';
	var fontsizepx4 = product.height*0.08;
	ctx.font = fontsizepx4+"px Sen-Bold";
	ctx.fillText("/"+MaxCount, maxcountxpos, maxcountypos);
	
	
	if(DiaCount<10){
		diaxpos = product.width*0.58;
	}
	
	ctx.imageSmoothingEnabled = false;
	
	ctx.drawImage(diaT,
	    0, 0,
		diaT.naturalWidth, diaT.naturalHeight,
		diaxpos, diaypos,
		product.width*0.06, product.width*0.06);
		
	ctx.globalCompositeOperation = 'screen';	
	
	ctx.globalAlpha = r;
	ctx.drawImage(diaR,
	    0, 0,
		diaR.naturalWidth, diaR.naturalHeight,
		diaxpos, diaypos,
		product.width*0.06, product.width*0.06);
		
	ctx.globalAlpha = g;
	ctx.drawImage(diaG,
	    0, 0,
		diaG.naturalWidth, diaG.naturalHeight,
		diaxpos, diaypos,
		product.width*0.06, product.width*0.06);
		
	ctx.globalAlpha = b;
	ctx.drawImage(diaB,
	    0, 0,
		diaB.naturalWidth, diaB.naturalHeight,
		diaxpos, diaypos,
		product.width*0.06, product.width*0.06);
}
var levellistbg = new Image;
levellistbg.src = "levellistbg.png";

for (let i = 0; i < 6; i++){
var star = [];
star[i] = new Image;
star[i].src = "star.png";
console.log(star[i]);
}



function levellist(){
	
var dx = debugxpos.value/1000;
var dy = debugypos.value/1000;
	
	ctx.globalAlpha = 1;
	ctx.fillStyle = "black";
    ctx.fillRect(0, 0, product.width, product.height);
	ctx.globalAlpha = 1;
	
	ctx.drawImage(levellistbg,
	    0, 0,
		levellistbg.naturalWidth, levellistbg.naturalHeight,
		product.width*0.19275, product.height*0.0625,
		product.width*0.6117, product.height*0.873611);
		
	if(isimportedtn == 0){
		imgtn.src = "world1.png";
		ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.19275, product.height*0.0625,
		product.height*513/800 *0.873611, product.height *0.873611);
	}
	if(isimportedtn == 1){
		imgtn.src = tum.src;
		ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.19275, product.height*0.0625,
		product.height*513/800 *0.873611, product.height *0.873611);
	}

	ctx.drawImage(imgtn,
	    0, 0,
		imgtn.naturalWidth, imgtn.naturalHeight,
		product.width*0.19275, product.height*0.0625,
		product.height*513/800 *0.873611, product.height *0.873611);
		
		var productlvlname = inputtext.value;
	
	if (productlvlname == ""){
	    productlvlname = 'Bingchilling';
	}
	
	ctx.textAlign = 'center';
	var fontsizepx = product.height*0.9*(1/productlvlname.length)
	if(productlvlname.length<10){
		fontsizepx = product.height*0.9*(1/12);
	}
	ctx.font = fontsizepx+"px Sen-Bold";
	ctx.fillStyle = "white";
	ctx.fillText(productlvlname, product.width*0.655, product.height*0.18);
	
	
	
	for (let j = 0; j < starcount; j++){
    
	var star = [];
    star[j] = new Image;
    star[j].src = "star.png";
	
	var xpos = j*product.width*0.033 + product.width*0.035;
	
	ctx.drawImage(star[j],
	    0, 0,
		star[j].naturalWidth, star[j].naturalHeight,
		product.width*0.527 + xpos, product.height*0.328,
		product.width*0.031, product.width *0.031);
    }
	
	var productlvlno1 = inputtext6.value;
	var productlvlno2 = inputtext7.value;
	
	if(productlvlno1 == ""){productlvlno1="10";}
	if(productlvlno2 == ""){productlvlno2="10";}
	
	var productlvlno = productlvlno1+"/"+productlvlno2;
	ctx.textAlign = 'right';
	fontsizepx = product.height*0.06;
	ctx.font = fontsizepx+"px Sen-Bold";
	ctx.fillStyle = "rgb(103,199,229)";
	ctx.fillText(productlvlno, product.width*0.796, product.height*0.913);
	
	if(iscrowncheckbox.checked){
		if(crowncount==3){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownOk.png";
	        imgcrown3.src = "CrownOk.png";
		}
		else if(crowncount==2){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownOk.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else if(crowncount==1){
	        imgcrown1.src = "CrownOk.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else if(crowncount==0){
	        imgcrown1.src = "CrownUn.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		else{
			imgcrown1.src = "CrownUn.png";
	        imgcrown2.src = "CrownUn.png";
	        imgcrown3.src = "CrownUn.png";
		}
		ctx.drawImage(imgcrown1,
	        0, 0,
		    imgcrown1.naturalWidth, imgcrown1.naturalHeight,
		    product.width*0.55, product.height*0.433,
		    product.width*0.061, product.width*0.061);
		ctx.drawImage(imgcrown2,
	        0, 0,
		    imgcrown2.naturalWidth, imgcrown2.naturalHeight,
		    product.width*0.62, product.height*0.433,
		    product.width*0.061, product.width*0.061);
		ctx.drawImage(imgcrown3,
	        0, 0,
		    imgcrown3.naturalWidth, imgcrown3.naturalHeight,
		    product.width*0.69, product.height*0.433,
		    product.width*0.061, product.width*0.061);
			
		}
			
	var diaxpos = product.width*0.564;
	var diaypos = product.height*0.521;
	if(iscrowncheckbox.checked){
		diaypos = product.height*0.557;
	}
	var dianoxpos = product.width*0.621;
	var dianoypos = product.height*0.592;
	if(iscrowncheckbox.checked){
		dianoypos = product.height*0.629;
	}
	var perxpos = product.width*0.658;
	var perypos = product.height*0.714;
	if(iscrowncheckbox.checked){
		perypos = product.height*0.751;
	}
		
	ctx.drawImage(dia,
	    0, 0,
		dia.naturalWidth, dia.naturalHeight,
		diaxpos, diaypos,
		product.width*0.05, product.width*0.05);
		
	var productdiano = inputtext2.value;
	var productmaxno = inputtext3.value;
	
	if(productdiano == ""){productdiano="20";}
	if(productmaxno == ""){productmaxno="20";}
	
	var productdiamond = productdiano+"/"+productmaxno;
	ctx.textAlign = 'left';
	fontsizepx = product.height*0.076;
	ctx.font = fontsizepx+"px Sen-Bold";
	ctx.fillStyle = "rgb(181,231,248)";
	if(productdiano == productmaxno){ctx.fillStyle = "rgb(49,52,104)";}
	ctx.fillText(productdiamond, dianoxpos, dianoypos);
	
	var productpercent = inputtext5.value+"%";
	
	if(productpercent == "%"){productpercent="100%";}
	
	ctx.textAlign = 'center';
	fontsizepx = product.height*0.115;
	ctx.font = fontsizepx+"px Sen-Bold";
	ctx.fillStyle = "rgb(184,224,249)";
	if(productpercent == "100%"){ctx.fillStyle = "rgb(127,65,215)";}
	ctx.fillText(productpercent, perxpos, perypos);
}

function getpos(){
	console.log(debugxpos.value/1000+" "+debugypos.value/1000);
	
}

function onTypeInfo(){
	if(inputtext2.value>99){
		inputtext2.value = "99";
	}
	if(inputtext2.value<0){
		inputtext2.value = "0";
	}
	if(inputtext2.value != ""){
	    inputtext2.value = Math.round(inputtext2.value);
	}
	if(inputtext3.value>99){
		inputtext3.value = "99";
	}
	if(inputtext3.value<0){
		inputtext3.value = "0";
	}
	if(inputtext3.value != ""){
	    inputtext3.value = Math.round(inputtext3.value);
	}
	if(inputtext5.value>100){
		inputtext5.value = "100";
	}
	if(inputtext5.value<0){
		inputtext5.value = "0";
	}
	if(inputtext5.value != ""){
	    inputtext5.value = Math.round(inputtext5.value);
	}
		if(inputtext6.value>99){
		inputtext6.value = "99";
	}
	if(inputtext6.value<0){
		inputtext6.value = "0";
	}
	if(inputtext6.value != ""){
	    inputtext6.value = Math.round(inputtext6.value);
	}
	if(inputtext7.value>99){
		inputtext7.value = "99";
	}
	if(inputtext7.value<0){
		inputtext7.value = "0";
	}
	if(inputtext7.value != ""){
	    inputtext7.value = Math.round(inputtext7.value);
	}
	onchange();
}



async function onclickchooseUI(){
    if(UIchoosecheckbox.checked){
		lableUItype.innerHTML = '<span class="enablecrown">UI: Level list</span>';
	}
	else{
		lableUItype.innerHTML = '<span class="enablecrown">UI: Normal</span>';
	}
	UIchoosecheckbox.disabled = true;
	document.getElementById("showcase").style.animationName = "none";
	requestAnimationFrame(() => {
		document.getElementById("showcase").style.animationName = "changeui";
	});
	await delay(500);
	disablebutton();
	onchange();
	
}
async function disablebutton(){
	await delay(500);
	UIchoosecheckbox.disabled = false;
	return;
}

UIchoosecheckbox.addEventListener("click",() => onclickchooseUI());

var starbtns = [
starbtn1 = document.getElementById("star1"),
starbtn2 = document.getElementById("star2"),
starbtn3 = document.getElementById("star3"),
starbtn4 = document.getElementById("star4"),
starbtn5 = document.getElementById("star5"),
starbtn6 = document.getElementById("star6")]

async function onsetdif(e){
		for(let x=0;x<6;x++){
		    starbtns[x].style.filter = "brightness(150%) saturate(0)";
		    starbtns[x].addEventListener("mouseover", function() {
                starbtns[x].style.filter = "brightness(120%) saturate(0)";
            });
		    starbtns[x].addEventListener("mouseout", function() {
                starbtns[x].style.filter = "brightness(150%) saturate(0)";
            });
		}
		for(let y=0;y<e;y++){
				    starbtns[y].style.filter = "brightness(150%)";
		    starbtns[y].addEventListener("mouseover", function() {
                starbtns[y].style.filter = "brightness(120%)";
            });
		    starbtns[y].addEventListener("mouseout", function() {
                starbtns[y].style.filter = "brightness(150%)";
            });
		}
		starcount = e;
		onchange();
}


const img = document.getElementById("thumbnail");

img.addEventListener("contextmenu", (event) => {
  // Add the download option to the context menu.
  event.preventDefault();
  const menu = document.createContextMenu();
  const downloadItem = document.createElement("menuitem");
  downloadItem.textContent = "Tải xuống";
  downloadItem.addEventListener("click", () => {
    // Download the image.
    const url = img.src;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Save the image to a file.
        const file = new File([blob], "thumbnail.jpg");
        file.save();
      });
  });
  menu.appendChild(downloadItem);
  event.target.appendChild(menu);
});



	

