/**
 * Returns the total weight between two nodes.
 */
class WeightEvaluate extends BaseEvaluate {
  constructor(graph, ...tos) {
    super(graph);
    this.tos = tos;
  }

  evaluate() {
    let total = 0;
    this.setAllUnvisited();

    let from = this.tos.shift();
    this.setAsVisited(from);

    for (let to of this.tos) {
      this.setAsCandidate(to);

      try {
        total = total + this.getWeight(from, to);
      } catch(e) {
        this.setAllUnvisited();
        return {steps: this.steps, result: null, error: e.message};
      }

      from = to;
      this.setAsVisited(from);
    }

    return {steps: this.steps, result: total};
  }
};
