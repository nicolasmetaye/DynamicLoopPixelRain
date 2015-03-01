function BlockStateModel(letter, top, left, speed) {
    this.letter = letter;
    this.position = {
        top: top,
        left: left
    };
    this.speed = speed;
}