"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnabled = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function setEnabled(input, enabled) {
    const responses = require('../../data/responses.json');
    const res = responses.find((res) => res.input === input);
    let filePath = path_1.join('data', 'responses.json');
    if (process.platform === 'linux')
        filePath = path_1.join('..', '..', filePath);
    if (res)
        res.enabled = enabled;
    return fs_1.promises.writeFile(filePath, JSON.stringify(responses, null, 2) // Spacing of two
    );
}
exports.setEnabled = setEnabled;
