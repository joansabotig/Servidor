var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var bodyparcer = require('body-parser');
app.use(bodyparcer.json());
app.use(bodyparcer.urlencoded({extended:true}));
app.use(upload.array());

var Sequelize = require('sequelize');
var sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/postgres");

app.listen(3000,function() 
{ 
    console.log('servidor funcionando!');
})

//evitar errores de XML policy

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
       next();
 });

 //Crear las entidades/clases

 var Rubro = sequelize.define("rubro", {
   nombre: {
       type: Sequelize.STRING
   },
   descripcion: {
       type: Sequelize.STRING
   }
})




 var Articulo = sequelize.define("articulo", {
    codigo: {
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    precio_compra: {
        type: Sequelize.DECIMAL
    },
    precio_venta: {
        type: Sequelize.DECIMAL
    },
    stock: {
        type: Sequelize.INTEGER
    },
    porc_iva: {
        type: Sequelize.DECIMAL
    },
    rubro:{
        type: Sequelize.Instance
        
    }
})




app.get("/articulo/:id", function(req,res){
    console.log(req.params.id)
    console.log("la puta madre")
    Articulo.findById(req.params.id).then((art)=>{
        console.log("hay que mandar un solo articulo")
        console.log(art.get({plain:true}))
        res.send(art)
    })
})



app.get("/articulo",function(req,res){
    console.log("a mandar los articulos")
    Articulo.findAll().then(art=>{
        res.send(art)
    })
})

// Rubro.create({
//     nombre: "harinas",
//     descripcion:"polvo blanco"
// }).then(rub=>{
//     console.log("rubro creado")
//     console.log(art.get({plain:true}))
// })

// Articulo.create({
//     codigo:3,
//     nombre:"pan",
//     descripcion:"nada",
//     precio_compra:20,
//     precio_venta:30,
//     stock:5,
//     porc_iva:21,
    
// }).then((art)=>{
//     Rubro.findById(1).then(rub=>{
//         art.rubro = rub;
//         art.setRubro(rub);
//     })
    
// })

























/*
var ArticuloAgregado = sequelize.define("articuloagregado",{
    cantidad:{
        type: Sequelize.STRING       
    }
})
ArticuloAgregado.belongsTo(Articulo)

var Cliente = sequelize.define("cliente", {
    nombre: {
        type: sequelize.STRING
    },
    cuenta: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    telefono: {
        type: sequelize.STRING
    },
    direccion: {
        type: sequelize.STRING
    },
    localidad: {
        type: sequelize.STRING
    }
})

var Proveedor = sequelize.define("proveedor", {
    numero_sucursal:{
        type: sequelize.INTEGER
    },
    nombre: {
        type: sequelize.STRING
    },
    cuenta: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    telefono: {
        type: sequelize.STRING
    },
    direccion: {
        type: sequelize.STRING
    },
    localidad: {
        type: sequelize.STRING
    }
})

var Factura = Sequelize.define("factura",{
    numero_sucursal: {
        type: sequelize.INTEGER
    },
    numero_factura: {
        type: sequelize.INTEGER
    },
    total: {
        type: sequelize.DECIMAL
    },
    iva: {
        type: sequelize.DECIMAL
    },
    subtotal: {
        type: sequelize.DECIMAL
    },
    fecha: {
        type: Sequelize.DATE
    },
    tipo:{
        type: Sequelize.STRING
    }
})
var FacturaCompra = Sequelize.define("factura_compra",{
    fecha_factura: {
        type: Sequelize.DATE
    },
    numero_sucursal: {
        type: sequelize.INTEGER
    },
    numero_factura: {
        type: sequelize.INTEGER
    },
    total: {
        type: sequelize.DECIMAL
    },
    iva: {
        type: sequelize.DECIMAL
    },
    subtotal: {
        type: sequelize.DECIMAL
    },
    fecha: {
        type: Sequelize.DATE
    },
    tipo:{
        type: Sequelize.STRING
    }
})
*/



sequelize.sync().then(()=>console.log('todas las tablas creadas'));










//crear usuario
// Articulo.create(
//     {codigo: "123",
//      nombre:"Pan",
//       descripcion: "el producto pan",
//        rubro: {nombre:"pancitos", descripcion:"rubro panes"},
//         precioCompra:"10",
//          precioVenta:"25",
//           stock: "5",
//            porc_iva:"21"})
// .then((articulo)=>{
// console.log("Articulo creado");
// Console.log(articulo.get({Plain:true}))
// })
// app.post("/articulo",function(req,res)
// {
//     Articulo.create({ 
//         codigo:req.body.codigo,
//         nombre:req.body.nombre,
//         descripcion:req.body.descripcion,
//         rubro:req.body.rubro,
//         precioCompra:req.body.precioCompra,
//         precioVenta:req.body.precioVenta,
//         stock:req.body.stock,
//         porc_iva:req.body.porc_iva
//     }).then((articulo) => {
//     console.log("articulo creado");
//     console.log(articulo.get({plain:true})) // get({plain:true})para que no devuelva toooodos los datos 
// })
// res.send(null)
// })
