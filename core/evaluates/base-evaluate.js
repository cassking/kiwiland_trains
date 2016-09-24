/**
 * Represents a graph evaulate with result and list of steps (each step is a graph snapshot).
 */
class BaseEvaluate {
  /**
   * @constructor
   * @param {object} graph - A graph object.
   * @param {string} from - The start node.
   * @param {string} to - The end node
   */
  constructor(graph, from, to) {
    this.graph = graph;
    this.from = from;
    this.to = to;
    this.steps = [];
  }

  /**
   * Given a path it returns the total weight between thems.
   *
   * @param {array[string]} path - A array of node.
   * @return {number} - The weight
   */
  getPathWeight(path) {
    let total = 0;
    let from = path[0];

    for (let i = 1; i < path.length; i++) {
      let to = path[i];
      total = total + this.getWeight(from, to);
      from = to;
    };

    return total;
  }

  /**
   * Given the start node and the end it returns the total weight between thems.
   *
   * @param {string} from - The start node.
   * @param {string} to - The end node.
   * @return {number} - The weight
   * @exception {Error} - When the given edge does not exists.
   */
  getWeight(from, to) {
    let edge = _.find(this.graph.edges, {from, to});

    if (from === to) {
      return 0;
    }

    if (!edge) {
      throw new Error('NO SUCH ROUTE');
    }

    return edge.weight;
  }

  /**
   * Given the start node and the end it returns true when they are connected.
   *
   * @param {string} from - The start node.
   * @param {string} to - The end node.
   * @return {bool} - True when they are connected.
   */
  isNeighbor(from, to) {
    return _.find(this.graph.edges, {from, to});
  }

  /**
   * Given the node it returns a list of connected nodes.
   *
   * @param {string} from - The node.
   * @return {array[string]} - The list of connected nodes.
   */
  getNeighbors(from) {
    return _.filter(this.graph.edges, {from}).map(n => n.to);
  }

  /**
   * Given the node name it returns a node object.
   *
   * @param {string} name - The node.
   * @return {object} - The node object.
   */
  findNode(name) {
    return _.find(this.graph.nodes, { name });
  }

  /**
   * Given the node name it sets the node as visited.
   *
   * @param {string} name - The node.
   */
  setAsVisited(name) {
    let node = this.findNode(name);

    if (node) {
      node.state = 'b';
    }

    for(let node of this.graph.nodes) {
      if (node.state === 'g') {
        node.state = 'w';
      }
    }

    this.steps.push(_.cloneDeep(this.graph));
  }

  /**
   * Given the node name it sets the node as candidate.
   *
   * @param {string} name - The node.
   * @return {object} - A graph snapshot.
   */
  setAsCandidate(name) {
    let node = this.findNode(name);

    if (node) {
      node.state = 'g';
    }

    this.steps.push(_.cloneDeep(this.graph));
  }

  /**
   * Set all nodes as unvisited.
   *
   * @param {string} name - The node.
   */
  setAllUnvisited() {
    for(let node of this.graph.nodes) {
      node.state = 'w';
    }

    this.steps.push(_.cloneDeep(this.graph));
  }

  /**
   * Traverse the graph and returns a array of paths.
   *
   * @param {string} from - The start node.
   * @param {string} to - The end node.
   * @param {array[string]} visiteds - The list of visited node.
   * @param {function} candidateCondition - When returns true set the node as candidate.
   * @param {function} matchCondition - When returns true accepets the current path.
   * @return {array[string]} - The list of paths.
   */
  iterate(from, to, visiteds, candidateCondition, matchCondition) {
    let match = matchCondition || function() { return true; };
    let candidate = candidateCondition || function() { return true; };

    let current = from;
    let path = visiteds.concat([current]);
    this.setAsVisited(current);

    let paths = [];
    if (current === this.to && visiteds.length > 1 && match(visiteds, path)) {
      paths.push(path);
    }

    for (let neighbor of this.getNeighbors(current)) {
      if (candidate(visiteds, path, current, neighbor)) {
        this.setAsCandidate(neighbor);
        let newPaths = this.iterate(neighbor, to, path, candidateCondition, matchCondition);
        paths = paths.concat(newPaths);
      }
    }

    return paths;
  }

  /**
   * Retruns the result with a list of step.
   *
   * @return {object} - The result and a list of step (graph snapshots).
   */
  evaluate() {
    return  {steps: this.steps, result: null};
  }
};
