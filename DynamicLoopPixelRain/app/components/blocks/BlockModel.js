function BlockModel(letter, top, left, opacity, hasShadow, heightContainer, color) {
    this.letter = letter;
    this.position = {
        top: top,
        left: left
    };
    this.opacity = opacity;
    this.hasShadow = hasShadow;
    this.heightContainer = heightContainer;
    this.color = color;
}