function Covers (opts) {
    this.$el = opts.$el;
    this.$prev = opts.$prev;
    this.$next = opts.$next;

    this.count = this.$el.children().length;
    
    this.updateCSS();
    this.initListeners();
}

Covers.prototype.updateCSS = function () {
    var $el = this.$el;
    var count = this.count;

    $el.css({
        width: (count * 100) + '%',
        marginLeft: (-(Math.ceil(count / 2) - 1) * 100) + '%'
    });
};

Covers.prototype.initListeners = function () {
    var self = this;
    var $prev = this.$prev;
    var $next = this.$next;

    $prev.on('click', function () {
        self.shiftRight();
    });

    $next.on('click', function () {
        self.shiftLeft();
    });
};

Covers.prototype.shiftLeft = function () {
    var $el = this.$el;
    var $children = $el.children();
    $el.append($children.get(0));
};

Covers.prototype.shiftRight = function () {
    var $el = this.$el;
    var $children = $el.children();
    var count = this.count;
    $el.prepend($children.get(count - 1));
};

$(function () {
    return;


    // intro
    (function () {
        var $introCover = $('.intro__cover');
        var $covers = $('.post--photo.cover');

        if (!$covers.length) {
            $('.intro').hide();
            return;
        }

        $covers.each(function () {
            var $post = $(this);
            var $li = $('<li />');

            var $img = $post.find('img');

            $li.addClass('cover');
            $li.css({
                backgroundImage: 'url(' + $img.attr('src') + ')'
            });
            $li.append('<span>' + $img.attr('alt') + '</span>');
            $introCover.append($li);
        });

        new Covers({
            $el: $introCover,
            $prev: $('.nav--prev'),
            $next: $('.nav--next')
        });
    })();

    // movie
    (function () {
        var $movie = $('.movie');
        var video = $('.post--video iframe').get(0);
        if (!video) {
            $movie.hide();
            return;
        }
        $movie.append(video);
    })();

    // how to use
    (function () {
        var $post = $('.post--photo, .post--text').filter('.howtouse');
        if (!$post.length) {
            $('.howtouse').hide();
            return;
        }

        if ($post.is('.post--photo')) {
            $('.howtouse__left').append($post.find('.post__caption'));
            $('.howtouse__right').append($post.find('img'));;
        } else if ($post.is('.post--text')) {
            $('.howtouse__left')
                .attr('class', 'howtouse__center')
                .append($post.html());
            $('.howtouse__right').remove();
        }
    })();

    // download
    (function () {
        var $posts = $('.post--photo, .post--link, .post--text').filter('.download');
        if (!$posts.length) {
            $('.download').hide();
            return;
        }

        var $ul = $('.download__right ul');

        $posts.each(function () {
            var $post = $(this);

            if ($post.is('.post--photo')) {
                $('.download__left').append($post.find('img'));;
                $('.download__right').append($post.find('.post__caption'));;
            } else if ($post.is('.post--text')) {
                $('.download__right').append($post.html());;
            } else if ($post.is('.post--link')) {
                var $postLink = $post.find('a');
                var href = $postLink.attr('href');
                var className = 'download__link';

                if ($post.is('.ios')) {
                    className += '--ios';
                }
                if ($post.is('.android')) {
                    className += '--android';
                }

                $ul.append([
                    '<li>',
                    '<a class="' + className + '" href="' + href + '">',
                    '<span>',
                    $postLink.text(),
                    '</span>',
                    '</a>',
                    '</li>'
                ].join(''));
            }
        });

        if (!$('.post--photo.download').length) {
            $('.download__right').attr('class', 'download__center');
            $('.download__left').remove();
        }
    })();
});
