function showBlocks() {
    document.write('<div class="blocks">');

    for (let i = 0; i < 6; i++) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        document.write(
            '<div class="block" style="background-color: rgb(' +
            red + ', ' + green + ', ' + blue + ');"></div>'
        );
    }

    document.write('</div>');
}

showBlocks();