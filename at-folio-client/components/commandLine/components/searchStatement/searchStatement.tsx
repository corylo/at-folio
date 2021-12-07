import React from "react";

interface SearchStatementProps {
  children?: any;
  icon?: string;
  text: string;
}

export const SearchStatement: React.FC<SearchStatementProps> = (props: SearchStatementProps) => {  
  const getIcon = (): JSX.Element => {
    if(props.icon) {
      return (
        <i className={props.icon} />
      )
    }
  }

  return (
    <div id="command-line-search-statement">
      {props.children}
      {getIcon()}
      <h1 className="rubik-font">{props.text}</h1>
    </div>
  )
}