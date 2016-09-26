/**
 * Represents a rails network with stops and routes.
 */
class RailsNetwork {
  routes = [];
  stations = [];

  /**
   * @constructor
   * @param {string} routes - The routes as string (Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7).
   */
  constructor(routes) {
    if (!routes) {
      return;
    }

    let normalizedRoutes = routes.trim().substring(7).split(',').map(s => s.trim());

    for(let r of normalizedRoutes) {
      let from = r[0];
      let to = r[1];
      let distance = r.substring(2);
      this.addRoute(from, to, distance);
    }
  }

  /**
   * Add a route.
   *
   * @param {string} from - The start node.
   * @param {string} to - The end node.
   * @param {number} distance - The distance between thems.
   */
  addRoute(from, to, distance) {
    let isNumeric = (str) => (/^\d+$/).test(str);
    let isLetter = (str) => (/^[a-z]$/i).test(str);

    if (!isLetter(from) || !isLetter(to) || !isNumeric(new String(distance))) {
      return;
    }

    this.stations = _.union(this.stations, [from]);
    this.stations = _.union(this.stations, [to]);
    this.routes = _.union(this.routes, [`${from}${to}${distance}`]);
  }

  /**
   * The graph representation of a rails network.
   *
   * @return {object} - The current rails network as a graph.
   */
  toGraph() {
    let getDistance = (from, to) => parseFloat(_.find(this.routes, route => route.startsWith(`${from}${to}`)).substring(2));
    let getNeighbors = (from) => _.filter(this.routes, route => route.startsWith(`${from}`))
                                  .map(route => route.substring(1,2));

    let nodes = this.stations.map(station => {
      return { name: station, neighbors: getNeighbors(station) };
    });

    let edges = nodes.map((node) => {
      return node.neighbors.map((neighbor) => {
        return {
          from: node.name,
          to: neighbor,
          weight: getDistance(node.name, neighbor)
        };
      });
    });

    return { nodes: nodes, edges: _.flatMap(edges) };
  }
};
