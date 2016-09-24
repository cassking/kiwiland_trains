/**
 * Represents a graph state of one solution.
 */
let Graph = React.createClass({
  componentDidMount: function() {
    let colors = {
      'w':  '#97C2FC',
      'g': 'gray',
      'b': 'black'
    };

    let fontColors = {
      'w':  '#343434',
      'g': 'white',
      'b': 'white'
    }

    let mapNodes = (node) => {
      return {
        id: node.name ,
        label: node.name,
        color: colors[node.state],
        font: {
          color: fontColors[node.state]
        }
      };
    };

    let graph = this.props.steps[0];

    if (!graph) {
      return;
    }

    let nodes = graph.nodes.map(mapNodes);
    let edges = graph.edges.map((edge) => {
      return {
        from: edge.from,
        to: edge.to,
        label: edge.weight
      };
    });

    let data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    };

    let options = {
      height: '400px',

      interaction:{
        zoomView: false
      },

      layout: {
        randomSeed: 3,
      },

      edges: {
        arrows: 'to'
      }
    };

    this.visGraph = new vis.Network(this.refs.graph, data, options);

    let i = 0;
    this.intervalGraph = setInterval(() => {
      let step = this.props.steps[i % this.props.steps.length];
      let nodes = step.nodes.map(mapNodes);

      for (let node of nodes) {
        data.nodes.update(node);
      }

      i++;
    }, 1000);
  },

  componentWillUpdate: function() {
    if (this.visGraph) {
      clearInterval(this.intervalGraph);
      this.visGraph.destroy();
    }
  },

  componentDidUpdate: function() {
    this.componentDidMount();
  },

  render: function() {
    return (
      <div className='graph'ref='graph'></div>
    );
  }
});
