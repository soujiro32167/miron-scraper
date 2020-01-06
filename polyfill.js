const range = (from, to) => ({
    from,
    to,
  
    [Symbol.iterator]() {
      this.current = this.from;
      return this;
    },
  
    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },

    xs(){ return Array.from(this) }
  })

Array.prototype.zip = function(other){ return this.map( (e, i) => [e, other[i]]) }
Array.prototype.unzip = function(){ return [this.map(x => x[0]), this.map(x => x[1])] }

module.exports = {range}