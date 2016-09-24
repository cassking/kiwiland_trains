/**
 * Returns the paths with the N max stops.
 */
class MaxHopsEvaluate extends BaseEvaluate {
  constructor(graph, from, to, max) {
    super(graph, from, to);
    this.max = max;
  }

  evaluate() {
    let candidateCondition = (visiteds) => visiteds.length < this.max;

    this.setAllUnvisited();
    let paths = this.iterate(this.from, this.to, [], candidateCondition);

    return { steps: this.steps, result: paths.length };
  }
};
