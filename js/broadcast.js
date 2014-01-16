jQuery(document).ready( function($){
    // Revisamos que horas son
    function momento(){
        var d = new Date();
        var n = d.toUTCString();
        $('#timecode > span').text( n );
    }

    setInterval( momento, 1000 ); 

    // Lista de clips
    videos = [
                {
                    src: "/video/720_1.mp4",
                    in: 0,
                    out: 30
                },
                {
                    src: "/video/720_2.mp4",
                    in: 0,
                    out: 30
                }
            ];

    // Iniciar
    loop = 0;
    function init(){
        // console.log( sequence );
        if( typeof sequence != "undefined" ){
            sequence.remove();
        }
        sequence = Popcorn.sequence(
            "broadcast",
            videos
        );
        sequence.listen( 'canplaythrough', sequence.play() );
        sequence.listen( 'ended', init );
        console.log( loop );
        loop = loop+1;
    }

    init();
   
});