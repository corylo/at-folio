import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface HomePageMenuOptionProps {
  description?: string;
  icon: string | JSX.Element;
  label: string;
  to?: string;
  handleOnClick?: () => void;
}

export const HomePageMenuOption: React.FC<HomePageMenuOptionProps> = (props: HomePageMenuOptionProps) => {   
  const getIcon = (): JSX.Element => {
    if(typeof props.icon === "string") {
      return (
        <i className={classNames("home-page-menu-option-icon", props.icon)} />
      )
    }

    return props.icon;
  } 

  const getDescription = (): JSX.Element => {
    if(props.description) {
      return (
        <h1 className="home-page-menu-option-description rubik-font">{props.description}</h1>
      )
    }
  }

  if(props.to) {
    return (
      <Link to={props.to} className="home-page-menu-option" onClick={props.handleOnClick}>
        {getIcon()}
        <div className="home-page-menu-option-content">
          <h1 className="home-page-menu-option-label rubik-font">{props.label}</h1>
          {getDescription()}
        </div>
      </Link>
    );
  }

  return (
    <button 
      type="button" 
      className="home-page-menu-option rubik-font" 
      onClick={props.handleOnClick}
    >
      {getIcon()}
      <div className="home-page-menu-option-content">
        <h1 className="home-page-menu-option-label rubik-font">{props.label}</h1>
        {getDescription()}
      </div>
    </button>
  )
}