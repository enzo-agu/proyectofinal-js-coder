//Incorporación de jquery
$("#tituloPrincipal").prepend('<h1>Nueva Union</h1>');
$("#tituloPrincipal").fadeIn();
$("#tituloPrincipal").fadeOut(3000, function () {

    $("#tituloPrincipal").fadeIn(2000);

});
$("#tituloPrincipal")
    .slideDown(2000);

$("#subtituloPrincipal").animate({
    left: '250px',
    opacity: 'auto',
    height: '150px',
    width: '150px'
}, //1er parámetro propiedades
    1000,            //2do parámetro duración 
    function () {        //3er parámetro callback
        console.log('Animacion de bienvenida');
    });

$("#mydiv1").append("<h4>Registrate!</h4>");
