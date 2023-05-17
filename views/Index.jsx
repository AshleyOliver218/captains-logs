const React = require('react');
class Index extends React.Component {
    render() {
        const { logs } = this.props;
        return (
            <div title={"Logs"}>
        <nav>
          <a href="/logs/new">Create a New Log</a>
        </nav>
                <h1>Captain's Logs</h1>
                <ul>
                {this.props.logs.map((log,i) => {
                  return <li key={i}>
                      <a href={`/logs/${log.id}`}><h2>{log.title}</h2></a>
                    
                      
                      <a href={`/logs/${log._id}/edit`}>Edit Log</a>
                      <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                          <input type="submit" value="DELETE"/>
                      </form>
                  </li>
              })
              }
                </ul>
                <nav>
                    <a href="/logs/new">Create a New Log</a> <br></br>
                 
                </nav>
            </div>
        );
    }
}
module.exports = Index;