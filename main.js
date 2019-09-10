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

/*const slot_a = new Slot('slot_a'),
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
console.log('slot_c', slot_c.getContent());*/

class App {
    constructor(platesQuatity) {
        this.slot_a = new Slot('slot_a');
        this.slot_b = new Slot('slot_b');
        this.slot_c = new Slot('slot_c');
        this.platesQuatity = platesQuatity;
    }
    solve(n, source, target, auxiliary) {
        if (n > 0) {
            this.solve(n-1, source, auxiliary, target);
            let cargo = source.unload();
            target.load(cargo);
            this.solution += `#${cargo.id} ${source.getName()} -> ${target.getName()}` + '\n';
            // console.log(source.getName(), '->', target.getName(), source.getName(), source.getContent(), target.getName(), target.getContent() );
            this.solve(n - 1, auxiliary, target, source);
        }
    }
    run() {
        if (this.platesQuatity < 3 || this.platesQuatity > 8) {
            return `Wrong plates quantity! It should be in range from 3 to 8. Not ${this.platesQuatity}.`
        }
        for (let i = this.platesQuatity; i > 0; i--) {
            this.slot_a.load({id: i});
        }
        this.solution = '';
        this.solve(this.platesQuatity, this.slot_a, this.slot_c, this.slot_b);
        return this.solution
    }
}

const app1 = new App(1);
const app2 = new App(10);
const app3 = new App(3);
const app4 = new App(8);

console.log(app1.run());
console.log(app2.run());
console.log(app3.run());
console.log(app4.run());