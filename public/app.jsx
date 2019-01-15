class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timers: [
                {
                    title: 'My Timer 1',
                    project: 'Practice 1'
                },
                {
                    title: 'My Timer 2',
                    project: 'Practice 2'
                }
            ]
        };
    }

    render() {
        return (
            <div className={'app'}>
                <header>OnTrack</header>
                <div className={'content'}>
                    <TimersDashboard
                        timers={this.state.timers}>
                    </TimersDashboard>
                </div>
            </div>
        );
    }
}

class TimersDashboard extends React.Component {
    render() {
        return (
            <div className={'timer-dashboard'}>
                <EditableTimerList
                    timers={this.props.timers}>
                </EditableTimerList>

                <ToggleableTimerForm>
                </ToggleableTimerForm>
            </div>);
    }
}

class EditableTimerList extends React.Component {

    _renderTimers = () => {
        return this.props
            .timers
            .map(timer =>
                <li>
                    <EditableTimer
                        title={timer.title}
                        project={timer.project}>
                    </EditableTimer>
                </li>);
    };

    render() {
        return (
            <ul className={'editable-timer-list'}>
                {this._renderTimers()}
            </ul>);
    }
}

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: true
    };

    render() {
        return (
            <div className={'toggleable-timer-form'}>
                {
                    this.state.isOpen ?
                        <TimerForm></TimerForm>
                        :
                        <div className={'action'}>
                            <i className="fas fa-plus"></i>
                        </div>
                }

            </div>);
    }
}

class EditableTimer extends React.Component {
    state = {
     isEditFormOpen: false
    };

    render() {
        return (
            <div className={'editable-timer'}>
                {
                    this.state.isEditFormOpen ?
                        <TimerForm
                            title={this.props.title}
                            project={this.props.project}>
                        </TimerForm>
                        :
                        <Timer
                            title={this.props.title}
                            project={this.props.project}>
                        </Timer>
                }
            </div>
        );
    }
}

class Timer extends React.Component {
    render() {
        return (
            <div className={'timer'}>
                <div className={'title'}>{this.props.title}</div>
                <div className={'project'}>{this.props.project}</div>
                <div className={'time'}>{'10:20:58'}</div>
                <ul className={'actions'}>
                    <li className={'action'}>
                        <i className={'fas fa-edit'}></i>
                    </li>
                    <li className={'action'}>
                        <i className={'fas fa-trash'}></i>
                    </li>
                </ul>
                <div className={'button-container'}>
                    <button className={'button green'}>Start</button>
                </div>
            </div>
        );
    }
}

class TimerForm extends React.Component {
    render() {
        const submitText = this.props.title ? 'Update' : 'Create';

        return (
            <div className={'timer-form'}>
                <div className={'form-control title'}>
                    <div>Title</div>
                    <input type='text' defaultValue={this.props.title}/>
                </div>
                <div className={'form-control project'}>
                    <div>Project</div>
                    <input type='text' defaultValue={this.props.project}/>
                </div>
                <div className={'actions'}>
                    <button className={'blue submit'}>
                        {submitText}
                    </button>
                    <button className={'red cancel'}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
);