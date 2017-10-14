/**
 * Created by hoon on 2017. 10. 10..
 */
import "video.js/dist/video-js.css";
import "video.js/dist/video";
import Component from './Component';

class SkipModule extends Component {
    constructor(player, options) {
        super(player, options);
        options.name = 'SkipModule';

        this.el_.setAttribute('class', 'skip-module');

        player.addChild(this);

        player.on('adtimeupdate', (e) => {
            this.countDown();
        });

        player.on('adend', (e) => {
            let skipModule = this;
            if (!_.isUndefined(skipModule.skipButton)) {
                skipModule.skipButton.dispose();
                skipModule.skipButton = undefined;
            }
        });
    }
}

SkipModule.prototype.active = function() {
    this.skipCounter = new SkipCounter(this.player_, this.options_);
    this.addChild(this.skipCounter);
};

SkipModule.prototype.countDown = function() {
    if(!_.isUndefined(this.skipCounter) && this.skipCounter.getCount() < 1) {
        this.skipCounter.dispose();
        this.skipCounter = undefined;
        this.removeChild('skipCounter');
        this.skipButton = new SkipButton(this.player_, this.options_);
        this.addChild(this.skipButton);
        return;
    }
    if(!_.isUndefined(this.skipCounter)) {
        this.skipCounter.countDown();
    }
};

class SkipButton extends Component {
    constructor(player, options) {
        super(player, options);
        options.name = 'SkipButton';

        this.label = document.createElement('span');
        this.label.innerHTML = 'SKIP';

        this.el_.setAttribute('class', 'skip-button');
        this.label.setAttribute('class', 'skip');

        this.el_.appendChild(this.label);

        this.on('click', (e) => {
            player.ads.endLinearAdMode();
        });
    }
}

class SkipCounter extends Component {
    constructor(player, options) {
        super(player, options);
        options.name = 'SkipCounter';

        this.cnt = document.createElement('em');
        this.label = document.createElement('span');

        this.cnt.innerHTML = options.skipOffset;
        this.label.innerHTML = '초 후 SKIP';

        this.el_.setAttribute('class', 'skip-counter');
        this.label.setAttribute('class', 'skip');

        this.el_.appendChild(this.cnt);
        this.el_.appendChild(this.label);
    }
}

SkipCounter.prototype.countDown = function() {
    this.cnt.innerHTML = this.getCount();
};

SkipCounter.prototype.getCount = function() {
    return Math.ceil(this.options_.skipOffset - this.player_.currentTime());
};

export default SkipModule;