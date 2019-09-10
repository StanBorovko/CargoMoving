/*Logic*/

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

class App {
    constructor(platesQuatity) {
        this.slot_a = new Slot('slot_a');
        this.slot_b = new Slot('slot_b');
        this.slot_c = new Slot('slot_c');
        this.platesQuatity = platesQuatity;
    }

    solve(n, source, target, auxiliary) {
        if (n > 0) {
            this.solve(n - 1, source, auxiliary, target);
            let cargo = source.unload();
            target.load(cargo);
            this.solution += `#${cargo.id} ${source.getName()} -> ${target.getName()}` + '\n';
            this.solve(n - 1, auxiliary, target, source);
        }
    }

    run() {
        if (typeof this.platesQuatity !== "number" || isNaN(this.platesQuatity)) {
            return `Wrong plates quantity! It should be number. Not ${this.platesQuatity}.`
        }
        if (this.platesQuatity % 1) {
            return `Wrong plates quantity! It should be integer. Not ${this.platesQuatity}.`
        }
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

/*Render*/

function updatePage(newData) {
    /*update elements with new converted values*/
    const resultList = document.getElementById('result'),
        newDataList = newData.split('\n');
    resultList.innerHTML = '';
    newDataList.forEach(item => { if (item) {
        resultList.innerHTML += `<li class="list-group-item">${item}</li>`;
    }})

}


const inputForm = document.getElementById('input-form');

inputForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = Number(document.getElementById('input-field').value),
        app = new App(input),
        solution = app.run();
    updatePage(solution);
});
