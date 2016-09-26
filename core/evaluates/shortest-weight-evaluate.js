/**
 * Returns the shortest path between two nodes.
 *
 * dijkstra
 * http://en.wikipedia.org/wiki/Dijkstra's_algorithm#Pseudocode
 */
class ShortestWeightEvaluate extends BaseEvaluate {
  constructor(graph, from, to, max) {
    super(graph);
    this.from = from;
    this.to = to;
  }

  evaluate() {
    this.setAllUnvisited();
    let from = this.from;
    let to = this.to;

    if (!this.findNode(from)) {
      return {steps: this.steps, result: null, error: 'NO SUCH ROUTE'};
    }

    if (!this.findNode(to)) {
      return {steps: this.steps, result: null, error: 'NO SUCH ROUTE'};
    }

    let weights = {};
    let nodes = _.cloneDeep(this.graph.nodes);
    nodes = nodes.map(n => n.name);

    for (let node of nodes) {
      weights[node] = Number.MAX_VALUE;
    }

    if (from === to) {
      for (let neighbor of this.getNeighbors(from)) {
        weights[neighbor] = this.getWeight(from, neighbor);
      }
    } else {
      weights[from] = 0;
    }

    this.setAsVisited(from);

    while (nodes.length !== 0) {
      let nearest = _.minBy(nodes, (n) => weights[n]);
      nodes = nodes.filter(n => n !== nearest);
      this.setAsVisited(nearest);

      if (weights[nearest] === Number.MAX_VALUE) {
        break;
      }

      for(let neighbor of this.getNeighbors(nearest)) {
        this.setAsCandidate(neighbor);
        let newWeight = weights[nearest] + this.getWeight(nearest, neighbor);

        if (newWeight < weights[neighbor]) {
          weights[neighbor] = newWeight;
        }
      }
    }

    if (weights[to] === Number.MAX_VALUE) {
      return {steps: this.steps, result: null, error: 'NO SUCH ROUTE'};
    }

    return {steps: this.steps, result: weights[to]};
  }
};
