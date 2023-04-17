//range
var rellenoRange=document.getElementById("rellenoRange")
//range texto
var rellenoTexto=document.getElementById("nr")
//tamaño xyz
var tX= document.getElementById("x")
var tY= document.getElementById("y")
var tZ= document.getElementById("z")
var precio= document.getElementById("price");

//range tamaño
var sizeRange=document.getElementById("sizeRange");
var sizeTexto=document.getElementById("sr")

rellenoRange.addEventListener('input',()=>{
    rellenoTexto.innerHTML=rellenoRange.value+"%";
    getPrecio();
})

sizeRange.addEventListener('input',()=>{
    sizeTexto.innerHTML=sizeRange.value*100+"%";
    tX.value=(tamX/10* sizeRange.value).toFixed(1)
    tY.value=(tamY/10* sizeRange.value).toFixed(1)
    tZ.value=(tamZ/10* sizeRange.value).toFixed(1)
    lines.position.set(0,(250/2)-tY.value*10/2,0);
    getPrecio();
    cambioTam();
})

//halla el valor mas grande para agrandar el objeto 3d
const hallarMayor= ()=>{
    sX=220/tamX;
    sY=250/tamY;
    sZ=220/tamZ;
    return(Math.min(sX,sY,sZ));
}

const getPeso=()=>{
 //var densidad= materiales[selectMaterial.value].densidad;
 var relleno= rellenoRange.value/100
 var volumen= stl_viewer.get_model_info(0).volume/1000
 var l= Math.pow(volumen, 1 / 3);
 var innerwall=l*l;
 var outerwall=(volumen-innerwall)*relleno;
 var peso=((innerwall+outerwall)*1.24)/1000;
  return peso;
}
function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

const getPrecio=()=>{
    let peso=getPeso();
   
    precio.innerHTML=parseInt(peso*60000)+"$"
}