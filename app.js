//selectores
const contenedorCarrito = document.querySelector('.contenedor-carrito');

const carrito = document.querySelector('.carrito');

const listaProductos = document.querySelector('.Productos');


let ProductosCarrito = [];

let stockProductos;

//listeners
listaProductos.addEventListener('click', agregarProducto);

carrito.addEventListener('click', quitarProducto);

document.addEventListener('DOMContentLoaded', () => {

//ajax
	$.ajax({
		url: 'productos.json',
		success: function (data, status, xhr) {
			stockProductos = (data);
			 console.log(status)
			 console.log(xhr)
		},
		error: function (xhr, status, errorThrown) {
			console.log(xhr)
			console.log(status)
			console.log(errorThrown)
		}
	});


//levanto carrito del local storage

ProductosCarrito = JSON.parse(localStorage.getItem('carrito'));

if (ProductosCarrito == null ){
    ProductosCarrito  = []
} 


// dibujo nuevamente carrito con los elementos del local storage

llenarCarrito()
	
});

//

//funciones

//quitar producto
function quitarProducto (e) {
 if(e.target.classList.contains('borrar-producto')) {
    const productoId = e.target.getAttribute('data-id');
    //console.log(productoId);
    //aca se filtran los productos
    ProductosCarrito = ProductosCarrito.filter(producto => producto.id != productoId);
    
vaciarCarrito()
llenarCarrito()    
guardarStorage()

  }
}




function agregarProducto(e) {


    //selecciono el card del producto
    if (e.target.classList.contains('botonComprar')) {
        const seleccionProducto = e.target.parentElement.parentElement

        obtenerDatos(seleccionProducto);
        //console.log(seleccionProducto);
    }
}

function obtenerDatos(producto) {
    //extraigo la informacion del prod
    // console.log(producto.querySelector('img'))
    const productoAgregado = {
        imagen: producto.querySelector('.item-imagen').src,
        nombre: producto.querySelector('.item-title').textContent,
        precio: producto.querySelector('.item-precio').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1,

    }
    /*evitar que los productos se repitan */
    const existe = ProductosCarrito.some(producto => producto.id == productoAgregado.id);
    //Producto existende
    if (existe) {
        const productos = ProductosCarrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        })
        ProductosCarrito = [...productos];
    } else {

        ProductosCarrito.push(productoAgregado);
    }

    //console.log(ProductosCarrito);
    //insertarCarritohtml();
    vaciarCarrito()
    llenarCarrito()
    guardarStorage()
}

// guargar en el storage
function guardarStorage() {
    localStorage.setItem('carrito',JSON.stringify(ProductosCarrito));
//console.log(localStorage.getItem('carrito'))
}


function llenarCarrito() {
   let precioTotal = 0
    ProductosCarrito.forEach(producto => {
        insertarElemento(producto)
       //suma total
        //precioTotal +=parseFloat(producto.precio) * parseFloat(producto.cantidad)

    });

//console.log(precioTotal)
}

function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function insertarElemento(producto) {
    const {
        nombre,
        imagen,
        precio,
        cantidad,
        id
    } = producto;
    const divcard = document.createElement('div');

    divcard.innerHTML = `
         <div class="row">
            <div class="col-4">
              <div class="">
                <h6>${nombre}</h6>
                
              </div>
                </div>
                  <div class="col-2">
                   <div class=" ">
                <img src="${imagen}" width="100" alt="" >  
                
            </div>
            </div>
            <div class="col-2">
            <div class="">
                <h6 class="">${precio}</h6>
            </div>
            </div>
            <div class="col-3">
            <div class="">
                <h6>${cantidad}</h6>
            </div>
          </div>
        
          <div class="col-1">
          <div>
            <a href="#" class="borrar-producto" data-id="${id}"> X </a>
          </div>
        </div>
          </div>

        `

    contenedorCarrito.appendChild(divcard)
}


//jquery

$(function () {
    $('[data-toggle="modal"]').hover(function () {
        var modalId = $(this).data('target');
        $(modalId).modal('show');
    });
});


$('.encabezado').hide(5000)