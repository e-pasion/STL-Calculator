var selectMaterial= document.getElementById("sm");
var selectColor=document.getElementById("sc");
var xd=document.getElementById("xd");
var materiales={} ;
const verMateriales= async()=>{
    var url= await fetch("http://localhost:9020/api/material/color")
    console.log(url);
    var content= await url.json();
    console.log(content)

    
    //crear una lista de materiales y que cada uno tenga un array con sus colores
    content.forEach(element => {
        material=element.materialEntity.nombre;
        color=element.colorEntity.nombre;
        colorCodigo=element.colorEntity.codigo;
        materialEstado=element.materialEntity.estado;
        colorEstado=element.colorEntity.estado;
        if(materialEstado&&colorEstado){
            let cc={
                "nombre":color,
                "codigo":colorCodigo,
                "densidad":element.materialEntity.densidad
            }
            if(materiales[material]){
                materiales[material].push(cc);
            }
            else {
                materiales[material] = [cc];
              }
        }
    });

    //guardar materiales en el select
    Object.keys(materiales).forEach(material=>{
        const option = document.createElement('option');
        option.value = material;
        option.text = material;
        selectMaterial.appendChild(option);
    })

    //guardar colores en el select dependiendo del material
    selectMaterial.addEventListener('change',()=>{
        selectColor.innerHTML="<option selected disabled>Seleccione un color:</option>";
        materiales[selectMaterial.value].forEach(color=>{
            const option = document.createElement('option');
            option.value = color.codigo;
            option.text = color.nombre;
            selectColor.appendChild(option);
            getPrecio();

        })
    })

    selectColor.addEventListener('change',()=>{
        stl_viewer.set_color(0, selectColor.value);

    })

    xd.addEventListener('click',()=>{
        console.log(selectColor.options[selectColor.selectedIndex].text)
        encontrado=content.find(material=>material.colorEntity.nombre===selectColor.options[selectColor.selectedIndex].text&&material.materialEntity.nombre===selectMaterial.value)
        alert(encontrado.materialColorId)

        enviar={
        "peso": getPrecio(),
        "estado": "Carrito",
        "tamX":tX.value,
        "tamY": tY.value,
        "tamZ": tZ.value,
        "materialColorEntity": {
            "materialColorId": encontrado.materialColorId
        }
        }

        console.log(enviar)
      
        let imgb=dataURLtoFile(stl_viewer.renderer.domElement.toDataURL("image/png"),"xd.png")

        const formData = new FormData();
        formData.append('archivo', fileList);
        formData.append('img',imgb );
        formData.append('json', JSON.stringify(enviar));
        
        fetch('http://localhost:9020/api/producto', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });

    



        
    })


    console.log(materiales)

}

verMateriales()