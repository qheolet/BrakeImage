var BreakImage = (function () {
    function BreakImage(options) {
        this.gutter = 10;
        this.type = 'line';
        this.element = options.img;
        this.img = $(this.element);
        this.w = this.img.width();
        this.h = this.img.height();
        this.timeX = options.timeX;
        this.position = options.position;
        this.type = options.type; /*line,up,down,sin*/
        this.gutter = options.gutter;
        this.realW = this.w / this.timeX;
        this.factor = options.factor;
        this.wrap();
        this.cloneX();
    }
    BreakImage.prototype.wrap = function () {
        this.img.wrap("<div class='image-wrap'></div>");
    };
    BreakImage.prototype.applyCss = function (i, eq, left, top, clip) {
        $(this.element).eq(i).css({
            position: 'absolute',
            left: left + 'px',
            top: top,
            clip: clip
        });
    };
    BreakImage.prototype.cloneX = function () {
        for (i = 0; i < this.timeX - 1; i++) {
            var cone = this.img.clone(true);
            $(this.element).parent('.image-wrap').append(cone);
        }
        for (var i = 0; i < this.timeX; i++) {
            console.log(this.w / this.timeX);
            var g = 'rect(0px ' + (this.w / this.timeX) * (i + 1) + 'px ' + this.h + 'px ' + (this.w / this.timeX) * i + 'px)';
            var f = 0;
            if (this.type == "line") {
                f = 0;
            }
            if (this.type == 'up') {
                f = -1 * i * this.gutter * this.factor;
            }
            if (this.type == 'down') {
                f = i * this.gutter * this.factor;
            }
            if (this.type == 'sin') {
                f = Math.sin(i) * this.gutter * this.factor;
            }
            this.applyCss(i, 'absolute', i * this.gutter, f, g);
        }
        $(this.element).parent('.image-wrap').css({
            width: this.w + this.gutter * this.timeX - 1 + 'px',
            height: this.h + 'px',
            //overflow:'hidden',
            position: 'relative',
            float: this.position
        });
    };
    return BreakImage;
})();
