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

    function createsequence(){
        var sequence = Popcorn.sequence(
            "broadcast",
            videos
        );  
    }

    // Iniciar
    function playsequence(){
        sequence.play();
    }
    sequence.listen( 'canplaythrough', playsequence );
    sequence.listen( 'ended', playsequence );
});