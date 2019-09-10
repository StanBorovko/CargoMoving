class Slot {
    constructor(name) {
        this.name = name;
        this.content = [];
    }

    getName() {
        return this.name;
    }

    getContent() {
        return this.content;
    }

    load(cargo) {
        this.content.push(cargo)
    }

    unload() {
        return this.content.pop();
    }
}

const slot_a = new Slot('slot_a'),
    slot_b = new Slot('slot_b'),
    slot_c = new Slot('slot_c');

for (let i = 3; i > 0; i--) {
    slot_a.load({id: i});
}
console.log(slot_a.getName(), slot_a.getContent());
console.log(slot_b.getName(), slot_b.getContent());
console.log(slot_c.getName(), slot_c.getContent());

function solver(n, source, target, auxiliary) {
    if (n > 0) {
        solver(n-1, source, auxiliary, target);
        let cargo = source.unload();
        target.load(cargo);
        console.log(source.name, '->', target.name, source.getName(), source.getContent(), target.getName(), target.getContent() );
        solver(n - 1, auxiliary, target, source);
    }
}

solver(3, slot_a, slot_c, slot_b);

console.log('slot_a', slot_a.getContent());
console.log('slot_b', slot_b.getContent());
console.log('slot_c', slot_c.getContent());

