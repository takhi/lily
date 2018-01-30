var Lily = function(numbers) {
    this.numbers = numbers;
}

Lily.prototype.find = function(target) {
    if (target) {
        this.solutions = [];
        this.combinator(this.numbers, target, []);
        return this.solutions;
    }
}

Lily.prototype.add = function(chain) {
    var expression = this._merge(chain);
    if (this.solutions.indexOf(expression) === -1) this.solutions.push(expression);
}

Lily.prototype._merge = function(chain) {
    var i = chain.length - 2, segment;
    var expression = chain[i + 1];
    for (; i >= 0; i--) {
        segment = chain[i].split('=');
        expression = expression.replace(segment[1], '(' + segment[0] + ')');
    }
    return expression;
}

Lily.prototype._shiftCut = function(array, i, j) {
    var k = 0, m = 1, cut = [];
    for (; k < array.length; k++) {
        if (k !== i && k !== j) {
            cut[m++] = array[k];
        }
    }
    return cut;
}

Lily.prototype.combinator = function(numbers, target, chain) {
    var i, j, cut;
    if (numbers.length === 2) {
        if (numbers[0] + numbers[1] === target) {
            this.add(chain.concat(numbers[0] + '+' + numbers[1]));
            return;
        }
        if (numbers[0] - numbers[1] === target) {
            this.add(chain.concat(numbers[0] + '-' + numbers[1]));
            return;
        }
        if (numbers[0] * numbers[1] === target) {
            this.add(chain.concat(numbers[0] + '*' + numbers[1]));
            return;
        }
        if (numbers[1] !== 0) {
            if (numbers[0] / numbers[1] === target) {
                this.add(chain.concat(numbers[0] + '/' + numbers[1]));
                return;
            }
        }
    } else {
        for (i = 0; i < numbers.length; i++) {
            for (j = 0; j < numbers.length; j++) {
                if (i !== j) {
                    cut = this._shiftCut(numbers, i, j);
                    if ((cut[0] = numbers[i] + numbers[j]) === target) {
                        this.add(chain.concat(numbers[i] + '+' + numbers[j]));
                        break;
                    }
                    this.combinator(cut, target, chain.concat(numbers[i] + '+' + numbers[j] + '=' + cut[0]));
                    if ((cut[0] = numbers[i] - numbers[j]) === target) {
                        this.add(chain.concat(numbers[i] + '-' + numbers[j]));
                        break;
                    }
                    this.combinator(cut, target, chain.concat(numbers[i] + '-' + numbers[j] + '=' + cut[0]));
                    if ((cut[0] = numbers[i] * numbers[j]) === target) {
                        this.add(chain.concat(numbers[i] + '*' + numbers[j]));
                        break;
                    }
                    this.combinator(cut, target, chain.concat(numbers[i] + '*' + numbers[j] + '=' + cut[0]));
                    if (numbers[1] !== 0) {
                        if ((cut[0] = numbers[i] / numbers[j]) === target) {
                            this.add(chain.concat(numbers[i] + '/' + numbers[j]));
                            break;
                        }
                        this.combinator(cut, target, chain.concat(numbers[i] + '/' + numbers[j] + '=' + cut[0]));
                    }
                }
            }
        }
    }
}

exports.Lily;