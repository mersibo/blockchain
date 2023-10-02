// Импортируем модуль crypto для работы с хешированием
const crypto = require('crypto'), SHA256 = message => crypto.createHash("sha256").update(message).digest('hex');

// Определение класса блока (Block)
class Block {
    constructor(timestamp="", data = []) {
        this.timestamp = timestamp;  // Временная метка блока
        this.data = data;  // Данные блока
        this.hash = this.getHash();  // Хеш блока
        this.prevhash = "";  // Хеш предыдущего блока
    }

    // Метод для вычисления хеша блока
    getHash() {
        return SHA256(this.prevhash + this.timestamp + JSON.stringify(this.data));
    }
}

// Определение класса блокчейна (Blockchain)
class Blockchain {
    constructor() {
        // Создаем цепочку блоков с первым блоком, содержащим текущую временную метку
        this.chain = [new Block(Date.now().toString())];
    }

    // Метод для получения последнего блока в цепочке
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Метод для добавления нового блока в цепочку
    addBlock(block) {
        // Устанавливаем хеш предыдущего блока в новом блоке
        block.prevhash = this.getLastBlock().hash;

        // Пересчитываем хеш для нового блока
        block.hash = block.getHash();

        // Замораживаем объект блока и добавляем его в цепочку
        this.chain.push(Object.freeze(block));
    }

    // Метод для проверки целостности цепочки
    isValid(blockchain = this) {
        for(let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            // Проверка, что хеши блоков соответствуют ожидаемым значениям
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevhash) {
                return false;
            }
        }

        // Цепочка считается действительной, если проверка прошла успешно для всех блоков
        return true;
    }   
}

// Экспорт классов Block и Blockchain для использования в других модулях
module.exports = {Block, Blockchain};