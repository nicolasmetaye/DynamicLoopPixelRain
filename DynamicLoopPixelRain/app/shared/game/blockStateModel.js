function BlockStateModel(blockId, letter, top, left, speed, color) {
    this.blockId = blockId;
    this.letter = letter;
    this.position = {
        top: top,
        left: left
    };
    this.speed = speed;
    this.color = color;
}