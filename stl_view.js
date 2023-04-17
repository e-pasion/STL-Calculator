var fileList;
function cambioTam (){
    let scalX=tX.value*10/tamX;
    let scalY=tY.value*10/tamY;
    let scalZ=tZ.value*10/tamZ;
    

    stl_viewer.set_scale(0, scalX,scalY,scalZ);
  }



var lines;
var stl_viewer;
var volumen,tamX,tamY,tamZ
var load=document.getElementById("load");
fileSelector= document.getElementById("fileSelector");



fileSelector.addEventListener('change', () => {
    //codigo al subir el stl
    fileSelector.style.display="none";
    load.style.display="block";
     fileList = fileSelector.files[0];
    console.log(fileList);
    stl_viewer=new StlViewer(document.getElementById("contenedor"), { models: [ {id:0, local_file:fileList} ],center_models:true,model_loaded_callback:()=>{
        //codigo cuando carga el stl
        load.style.display="none";
        selectColor.disabled=false;
        selectMaterial.disabled=false;
        rellenoRange.disabled=false;
        sizeRange.disabled=false;
        tX.disabled=false;
        tY.disabled=false;
        tZ.disabled=false;
        xd.disabled=false;
        const geometry = new THREE.BoxGeometry(220, 250, 220);
        const geometrymaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0, transparent: true });
        const box = new THREE.Mesh(geometry, geometrymaterial);
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
         lines = new THREE.LineSegments(edges, lineMaterial);

        tamX=stl_viewer.get_model_info(0).dims.x
        tamY=stl_viewer.get_model_info(0).dims.y
        tamZ=stl_viewer.get_model_info(0).dims.z
        tX.value=(tamX/10).toFixed(1);
        tY.value=(tamY/10).toFixed(1);
        tZ.value=(tamZ/10).toFixed(1);

        stl_viewer.scene.add(box);
        stl_viewer.scene.add(lines);
        lines.position.set(0,(250/2)-tamY/2,0);

        sizeRange.max=hallarMayor();


    }});

    tX.addEventListener('change',cambioTam,false)
    tY.addEventListener('change',cambioTam,false)
    tZ.addEventListener('change',cambioTam,false)


  });



  