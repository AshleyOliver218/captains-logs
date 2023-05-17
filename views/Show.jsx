const React = require('react')
class Show extends React.Component {
   render () {
    const log = this.props.log
    return (
        <div>
        <h1> Log </h1>
          <h2>{log.title}</h2> 
          <p>{log.entry}</p> 
          {log.shipIsBroken? 'The ship needs maintenence' : 'The ship is in optimal condition'}<br></br>
          <a href='/logs'>All Logs</a>
        </div>
        
     );
    }
 }
 module.exports = Show;