const fs = require("fs");

exports.error = (content) => {
    var first = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    var upgrade = first.split(":");

    upgrade[0] = parseInt(upgrade[0]) + 2;
    var time = upgrade.join(":");

    content.split('\n').forEach(s => {
        console.log(`[${time}] ${'[ ERROR ]'} ${s}`);
    });
}

exports.info = (content) => {
    var first = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    var upgrade = first.split(":");

    upgrade[0] = parseInt(upgrade[0]) + 2;
    var time = upgrade.join(":");

    content.split('\n').forEach(s => {
        console.log(`[${time}] ${'[ INFO ]'} ${s}`);
    });
}