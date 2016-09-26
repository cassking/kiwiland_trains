describe('core', () => {
  describe('evaluates', () => {
    describe('BaseEvaluate', () => {
      let target;
      let graph;

      beforeEach(() => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        graph = network.toGraph();
        target = new BaseEvaluate(graph);
      });

      describe('#constructor', () => {
        it('sets the graph', () => {
          expect(target.graph).toEqual(graph);
        });
      });

      describe('#getPathWeight', () => {
        it('gets the weight of a given path', () => {
          let weight = target.getPathWeight(['A', 'B', 'C', 'D', 'C']);
          expect(weight).toEqual(25);
        });

        describe('with invalid input', () => {
          it('returns 0', () => {
            let weight = target.getPathWeight(['A', 'A']);
            expect(weight).toEqual(0);
          });
        });
      });

      describe('#getWeight', () => {
        it('gets the weight between two nodes', () => {
          let weight = target.getWeight('A', 'B');
          expect(weight).toEqual(5);
        });

        describe('with invalid input', () => {
          it('trhows "NO SUCH ROUTE"', () => {
            expect(() => target.getPathWeight(['A', 'F'])).toThrowError(Error, 'NO SUCH ROUTE');
          });
        });
      });

      describe('#isNeighbor', () => {
        it('returns true when the given nodes are neighbor', () => {
          let isNeighbor = target.isNeighbor('A', 'B');
          expect(isNeighbor).toEqual(true);
        });

        it('returns false when the given nodes are neighbor', () => {
          let isNeighbor = target.isNeighbor('A', 'C');
          expect(isNeighbor).toEqual(false);
        });

        describe('with invalid input', () => {
          it('returns false when the given nodes are invalids', () => {
            let isNeighbor = target.isNeighbor('A', 'H');
            expect(isNeighbor).toEqual(false);
          });
        });
      });

      describe('#getNeighbors', () => {
        it('returns the list of neighbor', () => {
          let neighbors = target.getNeighbors('A');
          expect(neighbors).toEqual(['B', 'D', 'E']);
        });

        describe('with invalid input', () => {
          it('returns a empty list', () => {
            let neighbors = target.getNeighbors('H');
            expect(neighbors).toEqual([]);
          });
        });
      });

      describe('#findNode', () => {
        it('returns the object node for a given node name', () => {
          let node = target.findNode('A');
          expect(node).toEqual({ name: 'A', neighbors: [ 'B', 'D', 'E' ] });
        });

        describe('with invalid input', () => {
          it('returns null', () => {
            let node = target.findNode('H');
            expect(node).toEqual(null);
          });
        });
      });

      describe('#setAsVisited', () => {
        it('returns the object node for a given node name', () => {
          let node = target.setAsVisited('A');
          expect(node).toEqual({ name: 'A', neighbors: [ 'B', 'D', 'E' ], state: 'b' });
        });

        describe('with invalid input', () => {
          it('does not set as visited and returns null', () => {
            let node = target.setAsVisited('H');
            expect(node).toEqual(null);
          });
        });
      });

      describe('#setAsCandidate', () => {
        it('returns the object node for a given node name', () => {
          let node = target.setAsCandidate('A');
          expect(node).toEqual({ name: 'A', neighbors: [ 'B', 'D', 'E' ], state: 'g' });
        });

        describe('with invalid input', () => {
          it('does not set as candidate and returns null', () => {
            let node = target.setAsCandidate('H');
            expect(node).toEqual(null);
          });
        });
      });

      describe('#setAllUnvisited', () => {
        it('returns the object node for a given node name', () => {
          let nodes = target.setAllUnvisited();
          expect(nodes.length).toEqual(5);
        });
      });

      describe('#iterate', () => {
        it('returns a list of paths for a given start node and end node', () => {
          let paths = target.iterate('A', 'C');
          expect(paths).toEqual([
            [ 'A', 'B', 'C'],
            ['A', 'B', 'C', 'D', 'C'],
            ['A', 'B', 'C', 'D', 'C', 'D', 'C'],
            ['A', 'B', 'C', 'D', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'D', 'C', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'B', 'C', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'B', 'C', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'C'],
            ['A', 'D', 'C', 'D', 'C'],
            ['A', 'D', 'C', 'D', 'C', 'D', 'C'],
            ['A', 'D', 'C', 'D', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'D', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'D', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'D', 'C', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'D', 'C', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'C', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'C', 'D', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'D', 'E', 'B', 'C', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'C', 'D', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'C', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'E', 'B', 'C', 'D', 'C'],
            ['A', 'E', 'B', 'C', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
            ['A', 'E', 'B', 'C', 'E', 'B', 'C', 'E', 'B', 'C' ]
          ]);
        });


        describe('with equals nodes', () => {
          it('returns a empty list', () => {
            let paths = target.iterate('C', 'C');
            expect(paths).toEqual([
              ['C', 'D', 'C'],
              ['C', 'D', 'C', 'D', 'C'],
              ['C', 'D', 'C', 'D', 'E', 'B', 'C'],
              ['C', 'D', 'C', 'E', 'B', 'C'],
              ['C', 'D', 'E', 'B', 'C'],
              ['C', 'D', 'E', 'B', 'C', 'D', 'C'],
              ['C', 'D', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
              ['C', 'D', 'E', 'B', 'C', 'E', 'B', 'C'],
              ['C', 'E', 'B', 'C'],
              ['C', 'E', 'B', 'C', 'D', 'C'],
              ['C', 'E', 'B', 'C', 'D', 'E', 'B', 'C'],
              ['C', 'E', 'B', 'C', 'E', 'B', 'C']
            ]);
          });
        });

        describe('with invalid input', () => {
          it('returns a empty list', () => {
            let paths = target.iterate('A', 'G');
            expect(paths).toEqual([]);
          });
        });
      });

      describe('#evaluate', () => {
        it('returns a object with empty steps and null result', () => {
          let output = target.evaluate();
          expect(output.steps.length).toEqual(0);
          expect(output.result).toEqual(null);
        });
      });
    });
  });
});
