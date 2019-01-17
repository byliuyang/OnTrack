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

    handleStartClick = timerID => {
        this.startTimer(timerID);
    };

    handleStopClick = timerID => {
        this.stopTimer(timerID);
    };

    startTimer = timerID => {
        const now = Date.now();

        const newTimers = this.state.timers.map(timer => {
            if(timer.id === timerID) {
                return Object.assign({}, timer, {
                    runningSince: now
                });
            }
            return timer;
        });

        this.setState({timers: newTimers});
    };

    stopTimer = timerID => {
        const now = Date.now();

        const newTimers = this.state.timers.map( timer => {
           if(timer.id === timerID) {
               const elapsed = now - timer.runningSince;
               const totalElapsed = timer.elapsed + elapsed;

               return Object.assign({}, timer, {
                   elapsed: totalElapsed,
                   runningSince: null
               });
           }

           return timer;
        });

        this.setState({timers: newTimers});
    };

    newTimer(timer) {
        return Object.assign({}, timer, {
            id: this.state.timers.length + 1,
            elapsed: 0
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
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
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
                        onStartClick={this.props.onStartClick}
                        onStopClick={this.props.onStopClick}
                        id={timer.id}
                        title={timer.title}
                        project={timer.project}
                        elapsed={timer.elapsed}
                        runningSince={timer.runningSince}>
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
                            onStartClick={this.props.onStartClick}
                            onStopClick={this.props.onStopClick}
                            id={this.props.id}
                            title={this.props.title}
                            project={this.props.project}
                            elapsed={this.props.elapsed}
                            runningSince={this.props.runningSince}>
                        </Timer>
                }
            </div>
        );
    }
}

function padWithZero(num) {
    return num > 10 ? `${num}` : `0${num}`;
}

function milliToReadableStr(milliSeconds) {
    const MILLI_PER_SECOND = 1000;
    const MILLI_PER_MINUTE = MILLI_PER_SECOND * 60;
    const MILLI_PER_HOUR = MILLI_PER_MINUTE * 60;

    const hours = Math.floor(milliSeconds / MILLI_PER_HOUR);
    let remainingMilli = milliSeconds - hours * MILLI_PER_HOUR;

    const minutes = Math.floor( remainingMilli / MILLI_PER_MINUTE);
    remainingMilli = remainingMilli - minutes * MILLI_PER_MINUTE;

    const seconds = Math.floor(remainingMilli / MILLI_PER_SECOND);

    const hoursStr = padWithZero(hours);
    const minutesStr = padWithZero(minutes);
    const secondsStr = padWithZero(seconds);

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function toElapsedMillis(runningSince) {
    return Date.now() - runningSince;
}

function elapsedTimeStr(elapsedMillis, runningSince) {
    if (!runningSince) {
        return milliToReadableStr(elapsedMillis);
    }

    const millis = elapsedMillis + toElapsedMillis(runningSince);
    return milliToReadableStr(millis);
}

class Timer extends React.Component {
    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    };

    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    };

    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => {
            this.forceUpdate();
        }, 50);
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }

    render() {
        const timeStr = elapsedTimeStr(this.props.elapsed, this.props.runningSince);

        return (
            <div className={'timer'}>
                <div className={'title'}>{this.props.title}</div>
                <div className={'project'}>{this.props.project}</div>
                <div className={'time'}>{timeStr}</div>
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
                    <TimerActionButton
                        isTimerRunning={!!this.props.runningSince}
                        onStartClick={this.handleStartClick }
                        onStopClick={this.handleStopClick}>
                    </TimerActionButton>
                </div>
            </div>
        );
    }
}

class TimerActionButton extends React.Component {
    render() {
        if(this.props.isTimerRunning) {
            return (
                <button
                    className={'button red'}
                    onClick={this.props.onStopClick}>
                    Stop
                </button>);
        }

        return (
            <button
                className={'button green'}
                onClick={this.props.onStartClick}>
                Start
            </button>);
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