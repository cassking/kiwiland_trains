/**
 * Represents each solution on the section.
 */
let SolutionItem = React.createClass({
  render: function() {
    let item = _.cloneDeep(this.props.item);
    let graph = this.props.network.toGraph();
    let label = item[0];
    let evaluate = item[1];
    let args = item.splice(2);
    let title = `Output #${this.props.idx + 1}: `;

    let output = new window[evaluate](graph, ...args).evaluate();
    let result = title + (output.result || output.error || 0);
    let steps = output.steps;

    return (
      <li className='list-group-item'>
        <form className='form'>
          <div className='form-group'>
            <label for='input'>{label}</label>
            <input id='input'
                   type='text'
                   disabled={true}
                   className='form-control'
                   value={result}/>
          </div>
        </form>
        <Graph steps={steps}/>
      </li>
    );
  }
});
