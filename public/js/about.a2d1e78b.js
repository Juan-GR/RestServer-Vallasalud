(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{a434:function(t,e,n){"use strict";var o=n("23e7"),a=n("da84"),s=n("23cb"),i=n("5926"),r=n("07fa"),c=n("7b0b"),u=n("65f0"),l=n("8418"),d=n("1dde"),m=d("splice"),p=a.TypeError,f=Math.max,v=Math.min,h=9007199254740991,b="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!m},{splice:function(t,e){var n,o,a,d,m,g,_=c(this),w=r(_),x=s(t,w),y=arguments.length;if(0===y?n=o=0:1===y?(n=0,o=w-x):(n=y-2,o=v(f(i(e),0),w-x)),w+n-o>h)throw p(b);for(a=u(_,o),d=0;d<o;d++)m=x+d,m in _&&l(a,d,_[m]);if(a.length=o,n<o){for(d=x;d<w-o;d++)m=d+o,g=d+n,m in _?_[g]=_[m]:delete _[g];for(d=w;d>w-o+n;d--)delete _[d-1]}else if(n>o)for(d=w-o;d>x;d--)m=d+o-1,g=d+n-1,m in _?_[g]=_[m]:delete _[g];for(d=0;d<n;d++)_[d+x]=arguments[d+2];return _.length=w-o+n,a}})},a55b:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h1",[t._v("Login")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.email,expression:"usuario.email"}],staticClass:"form-control my-2",attrs:{type:"email",placeholder:"Email"},domProps:{value:t.usuario.email},on:{input:function(e){e.target.composing||t.$set(t.usuario,"email",e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.password,expression:"usuario.password"}],staticClass:"form-control my-2",attrs:{type:"password",placeholder:"Contraseña"},domProps:{value:t.usuario.password},on:{input:function(e){e.target.composing||t.$set(t.usuario,"password",e.target.value)}}}),n("b-button",{staticClass:"btn-block",attrs:{type:"submit"}},[t._v("Acceder")])],1),""!==t.mensaje?n("div",[n("p",[t._v(t._s(t.mensaje))])]):t._e()])},a=[],s=n("5530"),i=n("2f62"),r={name:"Login",data:function(){return{usuario:{email:"",password:""},mensaje:""}},methods:Object(s["a"])(Object(s["a"])({},Object(i["b"])(["guardarUsuario"])),{},{login:function(){var t=this;this.axios.post("/auth/login",this.usuario).then((function(e){console.log(e.data);var n=e.data.token;t.guardarUsuario(n)})).catch((function(e){t.mensaje=e.response.data.errors||e.response.data.msg}))}})},c=r,u=n("2877"),l=Object(u["a"])(c,o,a,!1,null,"6b067a38",null);e["default"]=l.exports},c740:function(t,e,n){"use strict";var o=n("23e7"),a=n("b727").findIndex,s=n("44d2"),i="findIndex",r=!0;i in[]&&Array(1)[i]((function(){r=!1})),o({target:"Array",proto:!0,forced:r},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),s(i)},c93e:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h1",[t._v("NOTAS")]),n("b-alert",{attrs:{show:t.dismissCountDown,fade:"",variant:t.mensaje.color},on:{dismissed:function(e){t.dismissCountDown=0},"dismiss-count-down":t.countDownChanged}},[t._v(" "+t._s(t.mensaje.texto)+" ")]),t.editar?t._e():n("form",{on:{submit:function(e){return e.preventDefault(),t.agregarNota.apply(null,arguments)}}},[n("h3",[t._v("Agregar una nota")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.nota.nombre,expression:"nota.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Nombre"},domProps:{value:t.nota.nombre},on:{input:function(e){e.target.composing||t.$set(t.nota,"nombre",e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.nota.descripcion,expression:"nota.descripcion"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Descripcion"},domProps:{value:t.nota.descripcion},on:{input:function(e){e.target.composing||t.$set(t.nota,"descripcion",e.target.value)}}}),n("b-button",{staticClass:"btn-success my-2 w-100",attrs:{type:"submit"}},[t._v("Agregar nota")])],1),t.editar?n("form",{on:{submit:function(e){return e.preventDefault(),t.editarNota(t.notaEditar)}}},[n("h3",[t._v("Editar una nota")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.notaEditar.nombre,expression:"notaEditar.nombre"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Nombre"},domProps:{value:t.notaEditar.nombre},on:{input:function(e){e.target.composing||t.$set(t.notaEditar,"nombre",e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.notaEditar.descripcion,expression:"notaEditar.descripcion"}],staticClass:"form-control my-2",attrs:{type:"text",placeholder:"Descripcion"},domProps:{value:t.notaEditar.descripcion},on:{input:function(e){e.target.composing||t.$set(t.notaEditar,"descripcion",e.target.value)}}}),n("b-button",{staticClass:"btn-warning my-2 w-100",attrs:{type:"submit"}},[t._v("Editar nota")]),n("b-button",{staticClass:"btn my-2 w-100",attrs:{type:"submit"},on:{click:function(e){t.editar=!1}}},[t._v("Cancelar nota")])],1):t._e(),n("table",{staticClass:"table"},[t._m(0),n("tbody",t._l(t.notas,(function(e,o){return n("tr",{key:o},[n("th",{attrs:{scope:"row"}},[t._v(t._s(e._id))]),n("td",[t._v(t._s(e.nombre))]),n("td",[t._v(t._s(e.descripcion))]),n("td",[n("b-button",{staticClass:"btn-sm btn-danger",on:{click:function(n){return t.eliminarNota(e._id)}}},[t._v("Eliminar")])],1),n("td",[n("b-button",{staticClass:"btn-sm btn-warning",on:{click:function(n){return t.activarEdicion(e._id)}}},[t._v("Editar")])],1)])})),0)])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("#")]),n("th",{attrs:{scope:"col"}},[t._v("Nombre")]),n("th",{attrs:{scope:"col"}},[t._v("Descripcion")]),n("th",{attrs:{scope:"col"}},[t._v("Acciones")])])])}],s=n("5530"),i=(n("c740"),n("a434"),n("2f62")),r={data:function(){return{notas:[],dismissSecs:5,dismissCountDown:0,mensaje:{color:"",texto:""},nota:{nombre:"",descripcion:""},editar:!1,notaEditar:{}}},computed:Object(s["a"])({},Object(i["d"])(["token"])),created:function(){this.listarNotas()},methods:{listarNotas:function(){var t=this,e={headers:{userToken:this.token}};this.axios.get("/notas",e).then((function(e){t.notas=e.data})).catch((function(t){console.log(t.response)}))},countDownChanged:function(t){this.dismissCountDown=t},showAlert:function(){this.dismissCountDown=this.dismissSecs},agregarNota:function(){var t=this,e={headers:{userToken:this.token}};this.axios.post("/notas/nueva-nota",this.nota,e).then((function(e){t.notas.push(e.data),t.mensaje.color="success",t.mensaje.texto="Nota agregada",t.showAlert()})).catch((function(e){console.log(e.response),t.mensaje.color="danger",t.mensaje.texto=e.response.data.msg,t.showAlert()})),this.nota.nombre="",this.nota.descripcion=""},eliminarNota:function(t){var e=this;this.axios.delete("/notas/".concat(t)).then((function(t){var n=e.notas.findIndex((function(e){return e._id===t.data._id}));e.notas.splice(n,1),e.mensaje.color="success",e.mensaje.texto="Nota Eliminada",e.showAlert()})).catch((function(t){console.log(t)}))},activarEdicion:function(t){var e=this;this.editar=!0,this.axios.get("/notas/".concat(t)).then((function(t){e.notaEditar=t.data,console.log(e.notaEditar)})).catch((function(t){console.log(t)}))},editarNota:function(t){var e=this;console.log("ITEM:",t),this.axios.put("/notas/".concat(t._id),t).then((function(t){var n=e.notas.findIndex((function(e){return e._id===t.data._id}));console.log(n),e.notas[n].nombre=t.data.nombre,e.notas[n].descripcion=t.data.descripcion,e.mensaje.color="success",e.mensaje.texto="Nota Modificada",e.showAlert(),e.editar=!1})).catch((function(t){console.log(t)}))}}},c=r,u=n("2877"),l=Object(u["a"])(c,o,a,!1,null,null,null);e["default"]=l.exports},f820:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("p",[t._v("About page")])])}],s=n("2877"),i={},r=Object(s["a"])(i,o,a,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=about.a2d1e78b.js.map