import React from "react";

interface PageProps {
  children: any;
  id: string;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div id={props.id} className="page">
      {props.children}
    </div>
  )
}