const Beep = require('../beep.js');

new Beep(22050).play(1000, 1, [Beep.utils.amplify(8000)]);
