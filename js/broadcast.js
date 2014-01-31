jQuery(document).ready( function($){
    /* Settings */
    var videos_duracion = 30; /* Segundos */


    // Lista de clips
    lista_clips = new Array(
                    "/video/720_1",
                    "/video/720_2"
                  );

    videos_cantidad = lista_clips.length; 

    // Soporte para multiples formatos de video
    var ext = 'mp4', i, vid;
    formats = {
        'mp4': 'mp4',
        'webm': 'webm',
        'ogg': 'ogv'
    };

    var vid = document.createElement('video');
    for (i in formats) {
        if ( vid.canPlayType( 'video/'+formats[i] ) != "" ) {
            ext = formats[i];
            break;
        }
    }
    for (x = 0; x < videos_cantidad; x++ ) {
        lista_clips[x] += "."+ ext;
    }

    // Revisamos que horas son y en cual clip vamos
    var clip = '',
        segundos_clip = '';

    function momentos(){
        d             = new Date(),
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
    }

    momentos();
    setInterval( momentos, 1000 ); 

    // Vamos a reordenar la lista de clips segun la hora para simular sincronía.
    if( clip > 1 ){
        clips_pasados = lista_clips.slice(0, clip-1);
        lista_clips.splice( 0, clip-1 );
        lista_clips = lista_clips.concat( clips_pasados );
    }

    // Armamos el objeto lista de clips dinamicamente para popcorn
    clips = [];
    for( var i in lista_clips ){
        // Agregamos item vacio al objeto clips
        clips.push({});

        // Definimos atributos del nuevo item con base en la lista
        clips[i].src = lista_clips[i];
        if( segundos_clip > 0 && i == 0 ){
            clips[i].in = segundos_clip;
        }else{
            clips[i].in = 0;
        }
        clips[i].out = videos_duracion;
    }

    // Iniciamos la reproducción de la secuencia
    loop = 0;
    function init(){
        if( typeof sequence != "undefined" ){
            sequence.remove();
            clips[0].in = 0;
        }

        sequence = Popcorn.sequence(
            "broadcast",
            clips
        );
        sequence.listen( 'canplaythrough', sequence.play() );
        $('video').width( "100%" ).height( "100%" );
        sequence.listen( 'ended', init );
        console.log( "loop "+loop );
        loop++;
    }

    init();
});