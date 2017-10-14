/**
 * Created by hoon on 2017. 10. 10..
 */
import 'video.js/dist/video-js.css'
import 'videojs-contrib-ads/src/videojs.ads.css'
import '../css/advertisement.css'
import 'video.js/dist/video'
import 'videojs-contrib-ads/src/videojs.ads'

import Plugin from '../../../components/Plugin'
import SkipModule from '../../../components/SkipModule'

class Advertisement extends Plugin {
    constructor(player, options) {
        super(player, options);

        let skipModule = new SkipModule(player, options);

        player.ads({
            debug: options.debug,
            timeout: options.timeout
        });

        player.on('ready', (e) => {
            if (player.currentSrc()) {
                player.trigger('adsready');
            }
        });

        player.on('readyforpreroll', (e) => {
            player.ads.startLinearAdMode();
            player.src({
                src: options.src,
                type: options.type
            });
            skipModule.active();
        });

        player.on('adended', (e) => {
            player.ads.endLinearAdMode();
        });
    }
}

let registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('Advertisement', Advertisement);
