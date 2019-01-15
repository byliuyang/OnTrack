class App extends React.Component {

    render() {
        return (
            <div className={'app'}>
                <header>OnTrack</header>
                <div className={'content'}>
                    <TimersDashboard>
                    </TimersDashboard>
                </div>
            </div>
        );
    }
}

class TimersDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timers: []
        };
    }

    handleCreateFormSubmit = timer => {
        this.createTimer(timer);
    };

    handleEditFormSubmit = timer => {
      this.updateTimer(timer);
    };

    handleTrashClick = timerID => {
        this.deleteTimer(timerID);
    };

    newTimer(timer) {
        return Object.assign({}, timer, {
            id: this.state.timers.length + 1
        });
    }

    createTimer = timer => {
        const t = this.newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t)
        });
    };

    deleteTimer = (timerID) => {
        const timers = this.state.timers.filter(timer => timer.id !== timerID);
        this.setState({
            timers: timers
        });
    };

    updateTimer = attrs => {
        const timers = this.state.timers.map(timer => {
            if (timer.id === attrs.id) {
                return Object.assign({}, timer, {
                    title: attrs.title,
                    project: attrs.project
                });
            }
            return timer;
        });

        this.setState({timers: timers});
    };

    render() {
        return (
            <div className={'timer-dashboard'}>
                <ToggleableTimerForm
                    onFormSubmit={this.handleCreateFormSubmit}>
                </ToggleableTimerForm>
                <EditableTimerList
                    onFormSubmit={this.handleEditFormSubmit}
                    onTrashClick={this.handleTrashClick}
                    timers={this.state.timers}>
                </EditableTimerList>
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
                        onFormSubmit={this.props.onFormSubmit}
                        onTrashClick={this.props.onTrashClick}
                        id={timer.id}
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
        isOpen: false
    };

    handleFormOpen = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleFormSubmit = timer => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    };

    openForm = () => {
        this.setState({isOpen: true});
    };

    closeForm = () => {
        this.setState({isOpen: false});
    };

    render() {
        return (
            <div className={'toggleable-timer-form'}>
                {
                    this.state.isOpen ?
                        <TimerForm
                            onFormSubmit={this.handleFormSubmit}
                            onFormClose={this.handleFormClose}>
                        </TimerForm>
                        :
                        <div className={'action'}>
                            <i className="fas fa-plus" onClick={this.handleFormOpen}></i>
                        </div>
                }

            </div>);
    }
}

class EditableTimer extends React.Component {
    state = {
     isEditFormOpen: false
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleFormSubmit = timer => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    };

    handleEditClick = () => {
      this.openForm();
    };

    openForm = () => {
      this.setState({
          isEditFormOpen: true
      })
    };

    closeForm = () => {
      this.setState({
          isEditFormOpen: false
      })
    };

    render() {
        return (
            <div className={'editable-timer'}>
                {
                    this.state.isEditFormOpen ?
                        <TimerForm
                            onFormSubmit={this.handleFormSubmit}
                            onFormClose={this.handleFormClose}
                            id={this.props.id}
                            title={this.props.title}
                            project={this.props.project}>
                        </TimerForm>
                        :
                        <Timer
                            onEditClick={this.handleEditClick}
                            onTrashClick={this.props.onTrashClick}
                            id={this.props.id}
                            title={this.props.title}
                            project={this.props.project}>
                        </Timer>
                }
            </div>
        );
    }
}

class Timer extends React.Component {
    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    render() {
        return (
            <div className={'timer'}>
                <div className={'title'}>{this.props.title}</div>
                <div className={'project'}>{this.props.project}</div>
                <div className={'time'}>{'10:20:58'}</div>
                <ul className={'actions'}>
                    <li className={'action'}>
                        <i
                            className={'fas fa-edit'}
                            onClick={this.props.onEditClick}>
                        </i>
                    </li>
                    <li className={'action'}>
                        <i
                            className={'fas fa-trash'}
                            onClick={this.handleTrashClick}>
                        </i>
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
    state = {
        title: this.props.title || '',
        project: this.props.project || ''
    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    };

    handleProjectChange = (e) => {
        this.setState({
            project: e.target.value
        });
    };

    handleFormSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        });
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';

        return (
            <div className={'timer-form'}>
                <div className={'form-control title'}>
                    <div>Title</div>
                    <input
                        type='text'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </div>
                <div className={'form-control project'}>
                    <div>Project</div>
                    <input
                        type='text'
                        value={this.state.project}
                        onChange={this.handleProjectChange}
                    />
                </div>
                <div className={'actions'}>
                    <button
                        className={'blue submit'}
                        onClick={this.handleFormSubmit}
                    >
                        {submitText}
                    </button>
                    <button
                        className={'red cancel'}
                        onClick={this.props.onFormClose}
                    >
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