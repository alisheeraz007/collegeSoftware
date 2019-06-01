import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="adminPasscodeInputDiv">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}
export default Loader; 