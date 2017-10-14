/**
 * Created by hoon on 2017. 10. 8..
 */
import "video.js/dist/video-js.css";
import "video.js/dist/video";

import Button from './Button'

class WideScreenButton extends Button {
    constructor(player, options) {
        super(player, options);
        options.name = 'wideScreenButton';
        this.label = document.createElement('span');
        this.label.innerHTML = '넓게';

        this.controlText('넓은 화면');
        this.el_.appendChild(this.label);

        this.isWide = false;
        this.originWidth = player.width();
        this.originHeight = player.height();

        player.controlBar.el_.insertBefore(this.el_, player.controlBar.getChild('fullscreenToggle').el_);
        player.controlBar.addChild(this);

        player.on('fullscreenchange', (e) => {
           if(player.isFullscreen()) {
               this.hide();
           } else {
               this.show();
           }
        });
    }
}

WideScreenButton.prototype.handleClick = function() {
    if(this.isWide) {
        this.player_.width(this.originWidth);
        this.player_.height(this.originHeight);
        this.label.innerHTML = '넓게';
    } else {
        this.player_.width(this.originWidth*1.5);
        this.player_.height(this.originHeight);
        this.label.innerHTML = '좁게';
    }
    this.isWide = !this.isWide;
};

WideScreenButton.prototype.buildCSSClass = function () {
    return Button.prototype.buildCSSClass.call(this);
};

export default WideScreenButton;