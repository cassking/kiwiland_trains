/**
 * Returns the paths with the exactly N stops.
 */
class ExactlyHopsEvaluate extends MaxHopsEvaluate {
  evaluate() {
    let candidateCondition = (visiteds) => visiteds.length < this.max;
    let matchCondition = (visiteds) => visiteds.length === this.max;

    this.setAllUnvisited();
    let paths = this.iterate(this.from, this.to, [], candidateCondition, matchCondition);

    return { steps: this.steps, result: paths.length };
  }
};
