/**
 * Created by hoon on 2017. 9. 11..
 */
import './plugins/player/js/myplayer'
import './plugins/advertisement/js/advertisement'

import SampleVideo from './videos/SeeYouAgain_720.mp4'
import AdVideo from './videos/Ad.mp4'

var player = videojs('my-player',
    {
        name: 'MyPlayer',
        controls: true,
        autoplay: true,
        plugins: {

        }
    },
    function() {
        let player = this;
        player.SamplePlayer({
            src: SampleVideo,
            type: "video/mp4",
        });
    });
player.Advertisement({
    "src": AdVideo,
    "type": "video/mp4",
    "debug": true,
    "timeout": 100,
    "skipOffset": 3
});
