// Made by chkrr00k

const le = 40, wi =20, pad = 20;
const sizes = Array.from({length: le}, (v, k) => (k * wi) + pad);
var mat = Array.from({length: le}, (v, k) => Array.from({length: le}, (v, k) => false));
const colors = ["#FF0000", "#00FF00", "#0000FF", "#000000"];
var current = 3;
var interval = null;

(() => {
	let ca = this.document.getElementById("generalCanvas");
	ca.height = sizes[le - 1] + wi + 1;
	ca.width = sizes[le -1] + wi + 1;
	let ctx = ca.getContext("2d");
	for(r of sizes){
		for(c of sizes){
			ctx.strokeRect(r,c,wi,wi);
		}
	}
	ca.onclick = (e) => {
		let re = ca.getBoundingClientRect();
		let x = e.clientX - re.left;
		let y =	e.clientY - re.top;
		fillRectangle(ctx, x, y);
		
	}
})();

function start(){
	if(!interval){
		interval = window.setInterval(update, 1000);
	}
}

function stop(){
	if(interval){
		window.clearInterval(interval);
		interval = null;
	}
}

function update(){
	scan();
	reDraw();
}


function checkNears(targetX, targetY){
	let result = 0;
	targetX = parseInt(targetX);
	targetY = parseInt(targetY);
	let	stopX = targetX != mat.length - 1 ? targetX + 1 : targetX;
	let stopY = targetY != mat.length - 1 ? targetY + 1 : targetY;
	for(let i = targetX != 0 ? targetX - 1 : targetX; i <= stopX; i++){
		for(let j = targetY != 0 ? targetY - 1 : targetY; j <= stopY; j++){
			if(mat[i][j] && !(targetX == i && targetY == j)){
				result++;
			}
		}
	}
	return result;
}

function copyMat(){
	return Array.from({length: le}, (v, k) => Array.from({length: le}, (vv, kk) => mat[k][kk]))
}

function scan(){
	let current = 0;
	let tmp = copyMat();
	for(r in mat){
		for(c in mat[r]){
			current = checkNears(r, c);
			if(mat[r][c]){
				if(current < 2 || current > 3){
					tmp[r][c] = false;
				}
			}else{
				if(current == 3){
					tmp[r][c] = true;
				}
			}
		}
	}
	mat = tmp;
}

function set(a){
	if(a >= 0 && a <= colors.length){
		current = a;
	}else{
		throw new RangeError();
	}
}

function fillRectangle(ctx, x, y){
	let rectX = adjustCoordinates(sqX = (~~((x - pad) / wi)));
	let rectY = adjustCoordinates(sqY = (~~((y - pad) / wi)));
	if(!mat[sqX][sqY]){
		ctx.fillStyle = colors[current];
	}else{
		ctx.fillStyle = "#FFFFFF";
	}
	ctx.fillRect(rectX, rectY, wi, wi);
	ctx.strokeRect(rectX, rectY, wi, wi);
	mat[sqX][sqY] = !mat[sqX][sqY];
}

function adjustCoordinates(input){
	return input * wi + pad
}

function reDraw(){
	let ctx = this.document.getElementById("generalCanvas").getContext("2d");
	for(r in mat){
		for(c in mat[r]){
			if(mat[r][c]){
				ctx.fillStyle = "#000000";
			}else{
				ctx.fillStyle = "#FFFFFF";
			}
			ctx.fillRect(adjustCoordinates(r), adjustCoordinates(c), wi, wi);
			ctx.strokeRect(adjustCoordinates(r), adjustCoordinates(c), wi, wi);
		}
	}
}

function clearCanvas(){
	let ctx = this.document.getElementById("generalCanvas").getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	for(r in mat){
		for(c in mat[r]){
			if(mat[r][c]){	
				ctx.fillRect(adjustCoordinates(r), adjustCoordinates(c), wi, wi);
				ctx.strokeRect(adjustCoordinates(r), adjustCoordinates(c), wi, wi);
				mat[r][c] = false;
			}
		}
	}
}
