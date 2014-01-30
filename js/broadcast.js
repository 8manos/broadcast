jQuery(document).ready( function($){
    /* Settings */
    var videos_duracion = 30, /* Segundos */
        videos_cantidad = 2; 


    // Lista de clips
    lista_clips = [
                    {
                        src: "/video/720_1.mp4"
                    },
                    {
                        src: "/video/720_2.mp4"
                    }
                ];

    // Armamos el objeto lista de clips dinamicamente para popcorn
    clips = [];
    for( var i in lista_clips ){
        // Agregamos item vacio al objeto clips
        clips.push({});

        // Definimos atributos del nuevo item con base en la lista
        clips[i].src = lista_clips[i].src;
        clips[i].in = 0;
        clips[i].out = videos_duracion;
    }


    // Revisamos que horas son y en cual clip vamos
    function momento(){
        var d             = new Date(),
            n             = d.toUTCString(),
            videos        = videos_duracion * videos_cantidad,
            hoy           = d.getSeconds() + ( 60 * ( d.getMinutes() + ( 60 * d.getUTCHours() ) ) ),
            veces         = parseFloat(hoy/videos).toFixed(4),
            momento       = hoy % videos,
            clip          = Math.floor ( momento / videos_duracion ) + 1,
            segundos_clip = clip * videos_duracion;

            if( momento < videos_duracion ){
                segundos_clip = momento;
            }else{
                segundos_clip = momento - ( videos_duracion * (clip-1) );
            }

        $('#timecode > span').text( n );
        $('#segundos_hoy > span').text( hoy );
        $('#videos > span').text( videos );
        $('#veces > span').text( veces );
        $('#momento > span').text( momento );
        $('#clip > span').text( clip + " de " + videos_cantidad);
        $('#segundos_clip > span').text( segundos_clip );
    }

    setInterval( momento, 1000 ); 


    // Iniciamos la reproducción de la secuencia
    loop = 0;
    function init(){
        // console.log( sequence );
        if( typeof sequence != "undefined" ){
            sequence.remove();
        }
        sequence = Popcorn.sequence(
            "broadcast",
            clips
        );
        sequence.listen( 'canplaythrough', sequence.play() );
        sequence.listen( 'ended', init );
        console.log( "loop "+loop );
        loop = loop+1;
    }

    init();
   
});