// Импортируем классы Block и Blockchain из файла blockchain.js
const {Block, Blockchain} = require("./blockchain.js");

// Создаем новый объект класса Blockchain
const test = new Blockchain();

// Добавляем блоки с транзакциями в цепочку
test.addBlock(new Block(Date.now().toString(), {from: "Гоша", to: "Сергей", amount: 560238}));
test.addBlock(new Block(Date.now().toString(), {from: "Валя", to: "Гоша", amount: 237648}));
test.addBlock(new Block(Date.now().toString(), {from: "Макс", to: "Матвей", amount: 1200}));
test.addBlock(new Block(Date.now().toString(), {from: "Лена", to: "Лиля", amount: 349202373}));
test.addBlock(new Block(Date.now().toString(), {from: "Никита", to: "Демьян", amount: 8096721}));
test.addBlock(new Block(Date.now().toString(), {from: "Мухаммад", to: "Вадим", amount: 90426627}));


// Выводим цепочку блоков в консоль
console.log(test.chain);