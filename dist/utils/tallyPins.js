"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tallyPins = void 0;
function tallyPins(pins) {
    const tallies = [];
    pins.forEach((message) => {
        const t = tallies.find((t) => t.user.id === message.author.id);
        if (t === undefined) {
            // create a new tally and add it
            tallies.push({
                user: message.author,
                count: 1,
            });
        }
        else {
            t.count++;
        }
    });
    return tallies;
}
exports.tallyPins = tallyPins;
