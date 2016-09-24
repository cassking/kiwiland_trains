/**
 * Represent the soluction section. Has a list of solutions.
 */
let Solution = React.createClass({
  defaultValue: 'Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7',

  getInitialState: function() {
    return {
      items: [
        ['Total distance A-B-C', 'WeightEvaluate', 'A', 'B', 'C'],
        ['Total distance A-D', 'WeightEvaluate', 'A', 'D'],
        ['Total distance A-D-C', 'WeightEvaluate', 'A', 'D', 'C'],
        ['Total distance A-E-B-C-D', 'WeightEvaluate', 'A', 'E', 'B', 'C', 'D'],
        ['Total distance A-E-D', 'WeightEvaluate', 'A', 'E', 'D'],
        ['Count trips C-C (maximum 3 stops)', 'MaxHopsEvaluate', 'C', 'C', 3],
        ['Count trips A-C (exactly 4 stops)', 'ExactlyHopsEvaluate', 'A', 'C', 4],
        ['Shortest trip length A-C', 'ShortestWeightEvaluate', 'A', 'C'],
        ['Shortest trip length B-B', 'ShortestWeightEvaluate', 'B', 'B'],
        ['Count trips C-C (less than 30 distance)', 'MaxWeightEvaluate', 'C', 'C', 30],
      ],

      network: new RailsNetwork(this.defaultValue)
    };
  },

  onNetworkChange: function() {
    this.setState({
      network: new RailsNetwork(this.refs.input.value)
    });
  },

  onReadFile: function(content) {
    this.setState({
      network: new RailsNetwork(content)
    });

    this.refs.input.value = content;
  },

  render: function() {
    return (
      <div>
        <form className='form'>
          <div className='form-group'>
            <input onKeyUp={this.onNetworkChange}
                   type='text'
                   className='form-control'
                   id='input'
                   ref='input'
                   defaultValue={this.defaultValue}/>
          </div>
          <div className='form-group'>
            <FileInput onReadFile={this.onReadFile}/>
          </div>
        </form>
        <div className='clearfix'></div>
        <ul className='list-group'>
          {this.state.items.map((item, i) => {
            return <SolutionItem network={this.state.network}
                                 item={item}
                                 key={i}
                                 idx={i}/>;
          })}
        </ul>
      </div>
    );
  }
});
