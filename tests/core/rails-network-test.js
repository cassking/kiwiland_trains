describe('core', () => {
  describe('RailsNetwork', () => {
    describe('#constructor', () => {
      it('sets the initial routes and stations', () => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        expect(network.routes.length).not.toEqual(0);
        expect(network.stations.length).not.toEqual(0);
      });

      describe('with no input', () => {
        it('sets routes and stations as empty', () => {
          let network = new RailsNetwork();
          expect(network.routes.length).toEqual(0);
          expect(network.stations.length).toEqual(0);
        });
      });

      describe('with invalid input', () => {
        it('sets routes and stations only with valid ones', () => {
          let network = new RailsNetwork('Graph: A1B5, BCD, C1D8, DC, DEX, AD5, E2, ___, 111');
          expect(network.routes.length).toEqual(1);
          expect(network.stations.length).toEqual(2);
        });
      });
    });

    describe('#addRoute', () => {
      it('adds the route to network', () => {
        let network = new RailsNetwork();
        network.addRoute('A', 'B', 10);
        expect(network.routes.length).toEqual(1);
        expect(network.stations.length).toEqual(2);
      });

      describe('with invalid input', () => {
        it('does not add the route to network', () => {
          let network = new RailsNetwork();
          network.addRoute('1', '_', '10');
          expect(network.routes.length).toEqual(0);
          expect(network.stations.length).toEqual(0);
        });
      });
    });

    describe('#toGraph', () => {
      it('generates a graph of the network', () => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        let graph = network.toGraph();
        expect(graph.nodes.length).toEqual(5);
        expect(graph.edges.length).toEqual(9);
      });
    });
  });
});
