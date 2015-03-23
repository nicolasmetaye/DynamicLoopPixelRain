function HitsModel(number, score, numberTop, numberLeft, scoreTop, scoreLeft, opacity) {
    this.number = number;
    this.score = score;
    this.numberPosition = {
        top: numberTop,
        left: numberLeft
    };
    this.scorePosition = {
        top: numberTop,
        left: numberLeft
    };
    this.opacity = opacity;
};