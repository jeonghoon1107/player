/**
 * Created by hoon on 2017. 10. 5..
 */
import 'video.js/dist/video-js.css'
import 'video.js/dist/video'

import Plugin from '../../../components/Plugin'
import WideScreenButton from '../../../components/WideScreenButton'

class SamplePlayer extends Plugin {

    constructor(player, options) {
        super(player, options);

        let wideScreenButton = new WideScreenButton(player, options);

        player.src({
            src: options.src,
            type: options.type
        });

    }
}

let registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin('SamplePlayer', SamplePlayer);