
const Database = require('better-sqlite3');
const db = new Database('lanches.db');

db.exec(`
    create table if not exists lanches (
        id integer primary key autoincrement,
        nome text not null,
        preco real
    )
`);

const inserir = db.prepare(
    'insert into lanches (nome, preco) values (?, ?)'
);

inserir.run('Hamburguer', 25);
inserir.run('Pizza', 40);
inserir.run('Coxinha', 8);
inserir.run('Pastel', 12);

console.log('todos os lanches:');
console.log(db.prepare('select * from lanches').all());

console.log('lanches com preço acima de 10:');
console.log(
    db.prepare('select * from lanches where preco > ?').all(10)
);

db.prepare('update lanches set preco = ? where id = ?').run(30, 1);
db.prepare('delete from lanches where id = ?').run(2);

console.log('lista final:');
console.log(db.prepare('select * from lanches').all());

db.close();
