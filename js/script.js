let importeCompras = undefined;
let importeVentas = undefined;

function cleanControls () {
   document.getElementById("descriptionText").value = "";
   document.getElementsByName("indicador1")[0].checked = false;
   document.getElementsByName("indicador2")[0].checked = false;
   document.getElementsByName("indicador3")[0].checked = false;
   document.getElementsByName("indicador4")[0].checked = false;
   document.getElementsByName("indicador5")[0].checked = false;
   document.getElementById("submount").value = "";
}


document.addEventListener("DOMContentLoaded", () => {
   importeCompras = 0;
   document.getElementById("compras").innerHTML = "$"+`${importeCompras}`;
   importeVentas = 0;
   document.getElementById("ventas").innerHTML = "$"+`${importeVentas}`;
   cleanControls();
})

let ingresar = document.getElementById("ingresar");
let tabla = document.getElementsByTagName("tbody");
let descripcion = document.getElementById("descriptionText");
let compra = document.getElementsByName("indicador1");
let venta = document.getElementsByName("indicador2");
let basico = document.getElementsByName("indicador3");
let minimo = document.getElementsByName("indicador4");
let exento = document.getElementsByName("indicador5");
let subtotal = document.getElementById("submount");


compra[0].addEventListener("click", () => {
   document.getElementsByName("indicador2")[0].checked = false;
})

venta[0].addEventListener("click", () => {
   document.getElementsByName("indicador1")[0].checked = false;
})

basico[0].addEventListener("click", () => {
   document.getElementsByName("indicador4")[0].checked = false;
   document.getElementsByName("indicador5")[0].checked = false;
})

minimo[0].addEventListener("click",() => {
   document.getElementsByName("indicador3")[0].checked = false;
   document.getElementsByName("indicador5")[0].checked = false;
})

exento[0].addEventListener("click", () => {
   document.getElementsByName("indicador3")[0].checked = false;
   document.getElementsByName("indicador4")[0].checked = false;
})


ingresar.addEventListener("click",() => {

   console.log(descripcion.value);
   console.log(compra[0].checked);
   console.log(venta[0].checked);
   console.log(basico[0].checked);
   console.log(minimo[0].checked);
   console.log(exento[0].checked);
   console.log(subtotal.value);

   if (descripcion.value != "" && 
   ((compra[0].checked && !venta[0].checked) || (!compra[0].checked && venta[0].checked)) &&
   ((basico[0].checked && !minimo[0].checked && !exento[0].checked) ||  
   (!basico[0].checked && minimo[0].checked && !exento[0].checked) ||
   (!basico[0].checked && !minimo[0].checked && exento[0].checked)) &&
   subtotal.value != "") {

      let transaccion = undefined
      let iva = undefined;

      if (compra[0].checked) {transaccion = "Compra";}
      if (venta[0].checked) {transaccion = "Venta";}

      if (basico[0].checked) {iva = 22;}
      if (minimo[0].checked) {iva = 10;}
      if (exento[0].checked) {iva = 0;}

      tabla[0].innerHTML += `
      <tr>
         <td>${descripcion.value}</td>
         <td>${transaccion}</td>
         <td>${subtotal.value}</td>
         <td>${iva}</td>
         <td>${subtotal.value*(iva/100) + parseFloat(subtotal.value)}</td>
      </tr>`

      if (transaccion == "Compra") {
         importeCompras += subtotal.value*(iva/100) + parseFloat(subtotal.value);
         document.getElementById("compras").innerHTML = "$"+`${importeCompras}`;
      }
      else if(transaccion == "Venta"){
         importeVentas += subtotal.value*(iva/100) + parseFloat(subtotal.value);
         document.getElementById("ventas").innerHTML = "$"+`${importeVentas}`;
      }

      cleanControls();
   }
   else {
      alert("Asegurese de llenar todos los campos y marcar al menos una opción de cada tipo")
   }
})