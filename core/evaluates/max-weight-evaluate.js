/**
 * Returns the paths with the N max total weight.
 */
class MaxWeightEvaluate extends BaseEvaluate {
  constructor(graph, from, to, max) {
    super(graph, from, to);
    this.max = max;
  }

  evaluate() {
    let candidateCondition = (visiteds, path, current, next) => this.getPathWeight(path) + this.getWeight(current, next) < this.max;
    let matchCondition = (visiteds, path) => this.getPathWeight(path) < this.max

    this.setAllUnvisited();
    let paths = this.iterate(this.from, this.to, [], candidateCondition, matchCondition);

    return { steps: this.steps, result: paths.length };
  }
};
