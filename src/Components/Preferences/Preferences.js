import React from 'react';
import './preferences.css'
import Overlay from '../../Views/Overlay/Overlay';

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.panel = React.createRef();
    this.state = { isDragging: false, yPosition: null, bottom: 0 };
  }
  handlePreferences = () => {
    const { preferences, toggle } = this.props
    toggle(preferences)
  }

  handleMode = () => {
    const { mode, toggleMode } = this.props;
    toggleMode(mode);
  }

  handleFontSizeChange = event => {
    this.props.fontSizeChange(event.target.value)
  }

  onTouchStart = event => {
    console.log("Touch Started");
    let offsetBottom = this.panel.current.offsetBottom;
    this.setState({
      yPosition: offsetBottom,
      isDragging: true
    })
    event.stopPropagation();
    event.preventDefault()
  }

  onTouchMove = event => {
    if (!this.state.isDragging) return;
    this.setState({
      bottom: event.pageY - this.state.yPosition
    });
    event.stopPropagation();
    event.preventDefault();
  }

  onTouchEnd = event => {
    this.setState({
      isDragging: false
    });
    if (this.state.bottom > -150) {
      this.setState({
        bottom: 0
      });
    }
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { preferences, mode, fontSize } = this.props;
    const bottom = (preferences === "open") ? this.state.bottom : "-300px";
    const overlayVisibility = (preferences === "open") ? "visible" : "hidden";
    return (
      <React.Fragment>
        <div ref="panel" className={mode + " preferences"} style={{ bottom: bottom }}>
          <DrawerButton action={this.handlePreferences} onDragAction={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} />
          <section className="p-section">
            <label htmlFor="font-size-input" className="preview-text" style={{ fontSize: fontSize + 'pt' }}>Preview Reading Text</label>
            <input name="font-size-input" className="font-size-input" type="range" min="10" max="20" value={fontSize} onChange={this.handleFontSizeChange} />
          </section>
          <ModeButton toggle={this.handleMode} mode={mode} />
          <BookmarkButton isBookmarked={true} toggle={this.handleMode} mode={mode} />
        </div>
        <Overlay visibility={overlayVisibility} dismiss={this.handlePreferences} />
      </React.Fragment>
    );
  }
}

class DrawerButton extends React.PureComponent {
  render() {
    let drawerButtonStyle = {
      backgroundColor: "#6c63ff",
      borderRadius: "4px",
      display: "block",
      height: "6px",
      margin: "1rem auto 2.8rem auto",
      width: "2.6rem"
    };
    return <div onClick={this.props.action} onTouchStart={this.props.dragAction} style={drawerButtonStyle}></div>;
  }
}


class ModeButton extends React.PureComponent {

  render() {
    const buttonStyle = {
      borderRadius: "4px",
      backgroundColor: "#6c63ff",
      border: "none",
      boxShadow: "0 0 4px #6c63ff",
      width: "36px",
      height: "36px",
      margin: "26px 8px",
      borderRadius: "50%",
      padding: "8px",
      outline: "none"
    };
    const { mode } = this.props

    return (
      <button style={buttonStyle} onClick={this.props.toggle}>
        <svg height="20px" xmlns="http://www.w3.org/2000/svg" fill={mode === "day" ? "#fff" : "#2a2a2a"} viewBox="0 0 20 20">
          <path d="M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM9 1a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0V1zm6.65 1.94a1 1 0 1 1 1.41 1.41l-1.4 1.4a1 1 0 1 1-1.41-1.41l1.4-1.4zM18.99 9a1 1 0 1 1 0 2h-1.98a1 1 0 1 1 0-2h1.98zm-1.93 6.65a1 1 0 1 1-1.41 1.41l-1.4-1.4a1 1 0 1 1 1.41-1.41l1.4 1.4zM11 18.99a1 1 0 1 1-2 0v-1.98a1 1 0 1 1 2 0v1.98zm-6.65-1.93a1 1 0 1 1-1.41-1.41l1.4-1.4a1 1 0 1 1 1.41 1.41l-1.4 1.4zM1.01 11a1 1 0 1 1 0-2h1.98a1 1 0 1 1 0 2H1.01zm1.93-6.65a1 1 0 1 1 1.41-1.41l1.4 1.4a1 1 0 1 1-1.41 1.41l-1.4-1.4z" />
        </svg>
      </button>
    )
  }
}

class BookmarkButton extends React.PureComponent {
  render() {
    const { mode, isBookmarked } = this.props;
    
    const bgColor = isBookmarked? "#6c63ff" : "transparent",
          fillDay = isBookmarked? "#fff" : "#6c63ff", 
          fillNight = isBookmarked ? "#2a2a2a" : "#6c63ff";

    const buttonStyle = {
      borderRadius: "4px",
      backgroundColor: bgColor,
      border: "2px solid #6c63ff", 
      boxShadow: "0 0 4px #6c63ff",
      width: "36px",
      height: "36px",
      margin: "26px 8px",
      borderRadius: "50%",
      outline: "none"
    };
    return (
      <button style={buttonStyle} onClick={this.props.toggle}>
        <svg height="20px" xmlns="http://www.w3.org/2000/svg" fill={mode === "day" ? fillDay : fillNight} viewBox="0 0 20 20">
          <path d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z" />
        </svg>
      </button>
    )
  }
}
