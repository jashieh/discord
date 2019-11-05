import React from 'react';
import { withRouter } from 'react-router-dom';

class ServerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { server_name: "" };
        this.error = null;

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hitEnter = this.hitEnter.bind(this);
        this.enterEvent = this.enterEvent.bind(this);
    }

    componentDidMount() {
        this.eventListen();
    }

    update(e) {
        this.setState({ server_name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createServer(this.state).then(
            (payload) => {this.props.toggleModal();
                this.props.history.push(`/home/${payload.server.id}`)
            },
            () => {this.error = "- This field is required"; 
                document.querySelector('.server-form-name')
                    .classList.add('server-form-submit-fail');
                    this.forceUpdate();
            }
        );
    }

    hitEnter() {
        this.props.createServer(this.state).then(
            (payload) => {this.props.toggleModal();
                this.props.history.push(`/home/${payload.server.id}`);
                $(document).off("keydown", this.enterEvent);
            },
            () => {this.error = "- This field is required"; 
                document.querySelector('.server-form-name')
                    .classList.add('server-form-submit-fail');
                this.forceUpdate();
            }
        );
    }

    enterEvent(e) {
        if(e.key === 'Enter') {
            this.hitEnter();
        }
    }
    
    eventListen() {
        let that = this;
        $(document).on("keydown", that.enterEvent)
    }

    render() {
        return(
            <div className="server-form-container">
                <form className="server-form">
                    <div className="server-form-header">
                        CREATE YOUR SERVER
                    </div>
                    <div className="server-form-body">
                        By creating a server, you will have access to free voice and 
                        text chat to user amongst your friends.
                    </div>
                    <div className="server-form-main">
                        <div className="server-form-left">
                            <div className="server-name-container">
                                <div className="server-name-error-container">
                                    <label className="server-form-name">SERVER NAME</label>
                                    <div className="server-form-errors">
                                        { this.error }
                                    </div>
                                </div>
                                <div className="server-form-input-wrapper">
                                    <input onChange={this.update} type="text" 
                                        className="server-form-input"
                                        placeholder="Enter a server name"/>
                                </div>
                            </div>
                            <div className="server-region-container">
                                <label className="server-form-region">SERVER REGION</label>
                                <div className="server-region-input-container">
                                    server region here
                                </div>
                            </div>
                        </div>
                        <div className="server-form-right">
                            img here
                        </div>
                    </div>
                    <div className="server-form-footer">
                        <div className="back-button-container" onClick={this.props.toggleForm}>
                            <div className="back-arrow">←</div>
                            <button onClick={this.props.toggleForm}
                            className="server-form-back">Back</button>
                        </div>
                        <input onClick={this.handleSubmit} type="submit" value="Create"
                            className="submit-server-button"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(ServerForm);